import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { lessonById } from '../src/data/index.js';
import { tutorialWatchlist } from '../maintenance/tutorial-watchlist.js';
import { extractSource, fetchSource, fingerprint } from '../maintenance/update-source.js';
import { assessImpact, inspectUpdates, resolveUpdate, validateWatchlist } from '../maintenance/update-impact.js';
import { atomicWrite, readState, withStateLock } from '../maintenance/update-store.js';
import { renderUpdateReport } from '../maintenance/update-report.js';
import { publicFetcher } from '../maintenance/update-transport.js';

const source = { id: 'example-doc', title: '演练来源', url: 'https://example.com/doc', format: 'html', minChars: 5,
  steps: [{ lessonId: 'network-prepare', section: 3, keywords: ['订阅'] }, { lessonId: 'network-prepare', section: 4, keywords: ['节点'] }] };
const empty = () => ({ schemaVersion: 1, sources: {}, reviews: [] });
const run = (text, state = empty(), sources = [source]) => inspectUpdates(sources, state, {
  now: '2026-09-18T06:00:00.000Z', fetchSource: async current => ({ text, finalUrl: current.url }),
});
const fail = state => inspectUpdates([source], state, { fetchSource: async () => { throw new Error('HTTP 403'); } });

test('维护映射使用现有主线的稳定章节，不改课程及证据数据', async () => {
  const before = JSON.stringify(lessonById);
  validateWatchlist(tutorialWatchlist, lessonById);
  assert.equal(tutorialWatchlist.length, 13);
  await run('订阅入口：旧按钮');
  assert.equal(JSON.stringify(lessonById), before);
  assert.throws(() => validateWatchlist([{ ...source, steps: [{ ...source.steps[0], section: 999 }] }], lessonById));
  assert.throws(() => validateWatchlist([{ ...source, url: 'https://example.com/?token=secret' }], lessonById));
});

test('提取忽略导航脚本噪声，但保留正文和下载入口变化', () => {
  const html = label => '<nav>随机</nav><main><h1>软件文档</h1><script>random()</script><p><a href="/download">' + label + '</a>&nbsp;Windows</p></main>';
  const text = extractSource(html('下载'), source);
  assert.equal(text, extractSource(html('下载').replace('随机', '另一次').replace('random()', 'newScript()'), source));
  assert.match(text, /下载 \[\/download\] Windows/u);
  assert.notEqual(text, extractSource(html('下载').replace('/download', '/new-download'), source));
  assert.notEqual(text, extractSource(html('安装'), source));
  assert.throws(() => extractSource('<html><title>豆包</title><script>render()</script><div id="app"></div></html>', source), /正文/u);
  assert.throws(() => extractSource('<main>Verify you are human</main>', source), /验证页/u);
});

test('发行源仅比较稳定版说明，忽略下载次数', () => {
  const release = { tag_name: 'v2.0', name: '测试版本', published_at: '2026-09-18', body: '变更订阅入口', assets: [{ download_count: 1 }] };
  const releaseSource = { ...source, format: 'github-release' };
  const text = extractSource(JSON.stringify(release), releaseSource);
  release.assets[0].download_count++;
  assert.equal(extractSource(JSON.stringify(release), releaseSource), text);
  release.body = '新增节点选择';
  assert.notEqual(extractSource(JSON.stringify(release), releaseSource), text);
  assert.throws(() => extractSource(JSON.stringify({ ...release, prerelease: true }), releaseSource));
  assert.throws(() => extractSource('<html>拦截</html>', { ...source, format: 'markdown' }));
});

test('请求拒绝403、跨站跳转和超大正文，超时不降级 TLS', async () => {
  const mock = response => ({ fetcher: async () => response });
  await assert.rejects(fetchSource(source, mock(new Response('Forbidden', { status: 403 }))), /403/u);
  await assert.rejects(fetchSource(source, mock(new Response(null, { status: 302, headers: { location: 'https://elsewhere.example/doc' } }))), /跨站/u);
  await assert.rejects(fetchSource(source, { ...mock(new Response('<main>正文足够读取</main>', { headers: { 'content-type': 'text/html' } })), maxBytes: 5 }), /大小/u);
  await assert.rejects(fetchSource(source, { timeoutMs: 5, fetcher: async (_url, options) => {
    await new Promise(resolve => setTimeout(resolve, 20)); options.signal.throwIfAborted();
  } }), { name: 'TimeoutError' });
});

test('初次只建基线，未复核的差异持续存在且不重复提醒', async () => {
  const baseline = await run('订阅入口：旧按钮\n节点不变');
  assert.equal(baseline.report.results[0].status, 'baseline-created');
  assert.equal(baseline.report.results[0].notify, false);
  const changed = await run('订阅入口：新按钮\n节点不变', baseline.state);
  assert.equal(changed.report.results[0].status, 'changed');
  assert.equal(changed.report.results[0].notify, true);
  assert.deepEqual(changed.report.results[0].suggestedSteps.map(item => item.section), [3]);
  assert.equal(changed.state.sources[source.id].baseline.text, '订阅入口：旧按钮\n节点不变');
  const repeated = await run('订阅入口：新按钮\n节点不变', changed.state);
  assert.equal(repeated.report.results[0].status, 'changed');
  assert.equal(repeated.report.results[0].notify, false);
  const newer = await run('订阅入口：新新按钮\n节点不变', repeated.state);
  assert.equal(newer.report.results[0].notify, true);
});

test('Windows 仅对 Node 连接失败使用系统读取，HTTP 拒绝与超时不重试', async () => {
  const options = { signal: new AbortController().signal, redirect: 'manual' };
  let fallbackCount = 0;
  const fallback = async (url, args) => { assert.equal(url, source.url); assert.equal(args, options); fallbackCount++; return new Response('正文'); };
  const failing = async () => { throw new TypeError('fetch failed'); };
  assert.equal((await publicFetcher({ platform: 'win32', fetcher: failing, fallback })(source.url, options)).status, 200);
  const rejected = await publicFetcher({ platform: 'win32', fetcher: async () => new Response(null, { status: 403 }), fallback })(source.url, options);
  assert.equal(rejected.status, 403);
  await assert.rejects(publicFetcher({ platform: 'linux', fetcher: failing, fallback })(source.url, options));
  await assert.rejects(publicFetcher({ platform: 'win32', fetcher: failing, fallback })(source.url, { signal: AbortSignal.abort() }));
  assert.equal(fallbackCount, 1);
});

test('读取失败保留待办，只在连续第三次失败时提醒，恢复另行提示', async () => {
  const baseline = await run('订阅入口：旧按钮');
  const changed = await run('订阅入口：新按钮', baseline.state);
  let current = changed;
  for (let count = 1; count <= 4; count++) {
    current = await fail(current.state);
    assert.equal(current.report.results[0].status, 'unverified');
    assert.equal(current.report.results[0].notify, count === 3);
    assert.equal(current.report.results[0].pendingCandidate, true);
    assert.deepEqual(current.state.sources[source.id].baseline, baseline.state.sources[source.id].baseline);
  }
  assert.throws(() => resolveUpdate(current.state, source, { expected: changed.report.results[0].fingerprint, decision: 'no-impact', note: '失败期间不可验收候选' }), /失败/u);
  const pendingRecovered = await run('订阅入口：新按钮', current.state);
  assert.equal(pendingRecovered.report.results[0].status, 'changed');
  assert.equal(pendingRecovered.report.results[0].notify, true);
  const recovered = await run('订阅入口：旧按钮', current.state);
  assert.equal(recovered.report.results[0].notify, true);
  assert.equal(recovered.state.sources[source.id].candidate, null);
});

test('来源配置改变须独立登记，无关键词命中也不能漏报', async () => {
  const baseline = await run('订阅入口：旧按钮');
  const moved = await run('订阅入口：新按钮', baseline.state, [{ ...source, url: 'https://example.com/new' }]);
  assert.equal(moved.report.results[0].status, 'unverified');
  assert.deepEqual(moved.state.sources[source.id].baseline, baseline.state.sources[source.id].baseline);
  const impact = assessImpact(source, '原说明\n重复', '重复\n新说明');
  assert.equal(impact.kind, 'scope-review');
  assert.equal(impact.suggestedSteps.length, 2);
  const reordered = await run('重复\n原说明', (await run('原说明\n重复')).state);
  assert.equal(reordered.report.results[0].status, 'changed');
});

test('复核要求匹配当前候选、具体结论、正确步骤和修改证据', async () => {
  const changed = await run('订阅入口：新按钮', (await run('订阅入口：旧按钮')).state);
  const args = { expected: changed.report.results[0].fingerprint, decision: 'text-updated', note: '已核对并只修正订阅按钮名称', steps: ['network-prepare:section-3'], evidence: ['src/data/network-preparation.js'] };
  assert.throws(() => resolveUpdate(changed.state, source, { ...args, expected: fingerprint('更老的候选') }), /指纹/u);
  assert.throws(() => resolveUpdate(changed.state, source, { ...args, steps: ['network-prepare:section-0'] }), /范围/u);
  assert.throws(() => resolveUpdate(changed.state, source, { ...args, evidence: [] }), /证据/u);
  assert.throws(() => resolveUpdate(changed.state, source, { ...args, note: '已看' }), /说明/u);
  assert.throws(() => resolveUpdate(changed.state, { ...source, url: 'https://example.com/new' }, args), /配置/u);
  const reviewed = resolveUpdate(changed.state, source, args);
  assert.equal(reviewed.reviews.length, 1);
  assert.equal(reviewed.sources[source.id].candidate, null);
  assert.equal((await run('订阅入口：新按钮', reviewed)).report.results[0].status, 'unchanged');
  assert.equal(changed.state.reviews.length, 0);
  assert.equal(resolveUpdate(changed.state, source, { ...args, decision: 'no-impact', steps: [], evidence: [], note: '变化只是说明措辞，现有按钮和操作顺序一致' }).reviews[0].decision, 'no-impact');
});

test('报告给出可定位步骤和差异，外部内容不成为活动 HTML 或图片', async () => {
  const changed = await run('订阅入口：新按钮 <img src=x> ![link](https://evil.example/)', (await run('订阅入口：旧按钮')).state);
  const report = renderUpdateReport(changed.report, lessonById);
  assert.match(report, /\?section=section-3/u);
  assert.match(report, /只修改确认受影响/u);
  assert.ok(!report.includes('<img'));
  assert.ok(!report.includes('![link]'));
});

test('记录损坏不重建基线，文件原子更新，锁阻止并发', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'aiguide-updates-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  assert.deepEqual(await readState(directory), empty());
  const baseline = await run('订阅入口：旧按钮');
  await withStateLock(directory, async () => {
    await assert.rejects(withStateLock(directory, async () => {}), /已有维护/u);
    await atomicWrite(directory, 'state.json', JSON.stringify(baseline.state));
  });
  assert.deepEqual(await readState(directory), baseline.state);
  await atomicWrite(directory, 'state.json', JSON.stringify(baseline.state));
  const corrupted = structuredClone(baseline.state); corrupted.sources[source.id].baseline.text = '被意外截断';
  await atomicWrite(directory, 'state.json', JSON.stringify(corrupted));
  await assert.rejects(readState(directory), /指纹/u);
  assert.equal(JSON.parse(await readFile(join(directory, 'state.json'), 'utf8')).sources[source.id].baseline.text, '被意外截断');
  await writeFile(join(directory, 'state.json'), '{invalid');
  await assert.rejects(readState(directory), SyntaxError);
});

test('CLI 在隔离目录登记演练结论，不触碰公开证据；拒绝缺失证据文件', async t => {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
  await mkdir(join(root, '.local'), { recursive: true });
  const directory = await mkdtemp(join(root, '.local', 'updates-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const liveSource = tutorialWatchlist.find(item => item.id === 'clash-handson');
  const baseline = await run('订阅入口：旧按钮', empty(), [liveSource]);
  const changed = await run('订阅入口：演练按钮', baseline.state, [liveSource]);
  await atomicWrite(directory, 'state.json', JSON.stringify(changed.state));
  await atomicWrite(directory, 'latest.json', JSON.stringify(changed.report));
  const before = await readFile(join(root, 'src/data/source-review.json'));
  const args = ['scripts/check-tutorial-updates.mjs', 'review', '--state-dir', directory, '--source', liveSource.id, '--expected', changed.report.results[0].fingerprint,
    '--decision', 'text-updated', '--note', '隔离目录演练，未修改任何真实教程', '--steps', 'network-prepare:section-3', '--evidence', 'not-existing-file'];
  const invalid = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8' });
  assert.equal(invalid.status, 1);
  assert.equal((await readState(directory)).reviews.length, 0);
  args[args.indexOf('text-updated')] = 'no-impact';
  const valid = spawnSync(process.execPath, args.slice(0, args.indexOf('--steps')), { cwd: root, encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stderr);
  assert.equal((await readState(directory)).reviews[0].decision, 'no-impact');
  assert.deepEqual(await readFile(join(root, 'src/data/source-review.json')), before);
  assert.match(await readFile(join(directory, 'latest.md'), 'utf8'), /隔离目录演练/u);
});
