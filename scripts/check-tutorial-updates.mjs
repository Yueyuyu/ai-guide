import { readFile, realpath, stat } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessonById } from '../src/data/index.js';
import { tutorialWatchlist } from '../maintenance/tutorial-watchlist.js';
import { fetchSource } from '../maintenance/update-source.js';
import { publicFetcher } from '../maintenance/update-transport.js';
import { inspectUpdates, resolveUpdate, validateWatchlist } from '../maintenance/update-impact.js';
import { atomicWrite, readState, withStateLock } from '../maintenance/update-store.js';
import { renderUpdateReport } from '../maintenance/update-report.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const json = value => JSON.stringify(value, null, 2) + '\n';
function options(args, mode) {
  const allowed = mode === 'check' ? ['state-dir', 'only'] : ['state-dir', 'source', 'expected', 'decision', 'note', 'steps', 'evidence'];
  const values = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index].replace(/^--/u, '');
    if (!args[index].startsWith('--') || !allowed.includes(key) || Object.hasOwn(values, key) || !args[index + 1] || args[index + 1].startsWith('--')) throw new Error('无效或重复参数：' + args[index]);
    values[key] = args[index + 1];
  }
  return values;
}
function inside(parent, child) { return child.startsWith(parent + sep); }
async function evidenceFiles(value = '') {
  const files = value ? value.split(',') : [];
  const canonicalRoot = await realpath(root);
  for (const file of files) {
    const path = resolve(root, file);
    if (isAbsolute(file) || !inside(root, path) || !inside(canonicalRoot, await realpath(path)) || !(await stat(path)).isFile()) throw new Error('证据必须为项目内现有文件的相对路径');
  }
  return files;
}
async function check(sources, state) {
  const observations = new Map(); let cursor = 0;
  const fetcher = publicFetcher();
  // 只请求显式登记的公开来源，最多三个并发，不操作浏览器或系统代理。
  await Promise.all(Array.from({ length: Math.min(3, sources.length) }, async () => {
    while (cursor < sources.length) {
      const source = sources[cursor++];
      try { observations.set(source.id, { value: await fetchSource(source, { fetcher }) }); }
      catch (error) { observations.set(source.id, { error }); }
    }
  }));
  return inspectUpdates(sources, state, { fetchSource: async source => {
    const observation = observations.get(source.id);
    if (observation.error) throw observation.error;
    return observation.value;
  } });
}
async function save(directory, state, report) {
  // 状态最后保存；中途失败下次会重新提示，不会悄悄承认未处理变化。
  await atomicWrite(directory, 'latest.json', json(report));
  await atomicWrite(directory, 'latest.md', renderUpdateReport(report, lessonById));
  await atomicWrite(directory, 'state.json', json(state));
}
async function main() {
  const [mode = 'check', ...args] = process.argv.slice(2);
  if (!['check', 'review'].includes(mode)) throw new Error('使用 check 或 review；参数见 docs/engineering/UPDATES.md');
  const flags = options(args, mode);
  validateWatchlist(tutorialWatchlist, lessonById);
  const local = resolve(root, '.local');
  const directory = resolve(root, flags['state-dir'] || '.local/tutorial-updates');
  if (!inside(local, directory)) throw new Error('记录目录必须位于项目 .local/ 下');
  await withStateLock(directory, async () => {
    if (!inside(await realpath(root), await realpath(directory))) throw new Error('记录目录不能通过链接指向项目外');
    const state = await readState(directory);
    if (mode === 'check') {
      const requested = flags.only?.split(',');
      if (requested?.some(id => !tutorialWatchlist.some(source => source.id === id))) throw new Error('未登记的来源 ID');
      const sources = tutorialWatchlist.filter(source => !requested || requested.includes(source.id));
      const result = await check(sources, state);
      await save(directory, result.state, result.report);
      const counts = result.report.results.reduce((total, item) => ({ ...total, [item.status]: (total[item.status] || 0) + 1 }), {});
      console.log(json({ report: relative(root, join(directory, 'latest.md')), ...counts, notify: result.report.results.filter(item => item.notify).map(item => item.id) }));
      if (counts.unverified) process.exitCode = 2;
    } else {
      const source = tutorialWatchlist.find(item => item.id === flags.source);
      if (!source) throw new Error('需指定已登记的 --source');
      const report = JSON.parse(await readFile(join(directory, 'latest.json'), 'utf8'));
      const result = report.results.find(item => item.id === source.id);
      if (!result || result.status !== 'changed' || result.fingerprint !== flags.expected) throw new Error('最新报告未包含该候选，请重新检查该来源');
      const next = resolveUpdate(state, source, { expected: flags.expected, decision: flags.decision, note: flags.note,
        steps: flags.steps?.split(',') || [], evidence: await evidenceFiles(flags.evidence) });
      const review = next.reviews.at(-1);
      Object.assign(result, { status: 'reviewed', pendingCandidate: false, notify: false, review, reason: '已登记维护者结论；不会自动更新教程实测日期。' });
      await save(directory, next, report);
      console.log(json({ source: source.id, decision: review.decision, steps: review.steps, report: relative(root, join(directory, 'latest.md')) }));
    }
  });
}
main().catch(error => { console.error('教程维护检查未完成：' + error.message); process.exitCode = 1; });
