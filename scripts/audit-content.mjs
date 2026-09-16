import { readFile, access, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessons, lessonById, tools, paths, projects, companies } from '../src/data/index.js';
import { reviewFreshness, ageInDays } from '../src/lib/content-maintenance.js';
import registry from '../src/data/source-review.json' with { type: 'json' };
import { checkPublicLink } from './content-links.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const external = process.argv.includes('--links');
const outputIndex = process.argv.indexOf('--output');
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) throw new Error('--output 后需要文件路径');
const report = { checkedAt: new Date().toISOString(), counts: { lessons: lessons.length }, errors: [], staleReviews: [], pendingPractice: [], links: [], ranking: null };
const urls = new Set(Object.values(registry.sources).map(source => source.url));
const seen = new Set();
const routes = { learn: new Set(lessons.map(item => item.id)), tool: new Set(tools.map(item => item.id)), model: new Set(tools.filter(item => item.kind === 'model').map(item => item.id)), path: new Set(paths.map(item => item.id)), project: new Set(projects.map(item => item.id)), company: new Set(companies.map(item => item.id)) };
const indexRoutes = new Set(['', 'tutorials', 'tools', 'models', 'ranking', 'paths', 'projects', 'library', 'about', 'search', 'feedback']);

async function checkLink(href, owner) {
  if (href.startsWith('https://')) { urls.add(href); return; }
  if (href.startsWith('#/')) {
    const [path, search = ''] = href.slice(2).split('?');
    const [kind, id, extra] = path.split('/');
    if (extra || (id ? !routes[kind]?.has(id) : !indexRoutes.has(kind))) report.errors.push(`${owner}：无效站内地址 ${href}`);
    const context = new URLSearchParams(search).get('path');
    if (kind === 'learn' && context && !paths.find(item => item.id === context)?.sequence.includes(id)) report.errors.push(`${owner}：课程与路线不匹配 ${href}`);
    return;
  }
  const file = resolve(root, 'public', href);
  if (!file.startsWith(resolve(root, 'public') + '/') && !file.startsWith(resolve(root, 'public') + '\\')) { report.errors.push(`${owner}：无效资源路径 ${href}`); return; }
  try { await access(file); } catch { report.errors.push(`${owner}：资源不存在 ${href}`); }
}

for (const lesson of lessons) {
  if (seen.has(lesson.id)) report.errors.push(`重复课程：${lesson.id}`);
  seen.add(lesson.id);
  if (reviewFreshness(lesson.review).stale) report.staleReviews.push(lesson.id);
  if (lesson.review.status === 'partial') report.pendingPractice.push({ id: lesson.id, scope: lesson.review.limit });
  for (const section of lesson.sections) {
    for (const link of [...(section.links || []), ...(section.downloads || [])]) await checkLink(link.href, lesson.id);
    for (const image of [section.screenshot, ...(section.walkthrough || []).map(step => step.screenshot)].filter(Boolean)) {
      await checkLink(image.src, lesson.id);
      if (image.sourceUrl) await checkLink(image.sourceUrl, lesson.id);
    }
  }
  for (const item of lesson.guide?.help || []) if (!lesson.sections[item.section]) report.errors.push(`${lesson.id}：问题帮助指向无效章节 ${item.id}`);
}
for (const route of paths) for (const id of [...route.sequence, ...(route.electives || [])]) if (!lessonById[id]) report.errors.push(`${route.id}：课程不存在 ${id}`);
const snapshot = JSON.parse(await readFile(resolve(root, 'public/data/rankings/current.json'), 'utf8'));
report.ranking = { retrievedAt: snapshot.retrievedAt, ageDays: ageInDays(snapshot.retrievedAt), metrics: snapshot.metrics.map(metric => ({ id: metric.id, rows: metric.rows.length })) };

if (external) {
  const queue = [...urls];
  const check = async url => {
    // 可达性不代表内容已经核对，不修改资料日期或实测状态。
    report.links.push(await checkPublicLink(url, { systemHttp: process.argv.includes('--system-http') }));
  };
  await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await check(queue.shift()); }));
  report.links.sort((a, b) => a.url.localeCompare(b.url));
}
if (outputIndex >= 0) { const output = resolve(process.argv[outputIndex + 1]); await mkdir(dirname(output), { recursive: true }); await writeFile(output, JSON.stringify(report, null, 2) + '\n'); }
const summary = { checkedAt: report.checkedAt, ...report.counts, errors: report.errors, staleReviews: report.staleReviews.length, partialLessons: report.pendingPractice.length, ranking: report.ranking, externalChecked: report.links.length, externalIssues: report.links.filter(link => link.status !== 'reachable') };
console.log(JSON.stringify(summary, null, 2));
if (report.errors.length || report.links.some(link => link.status === 'missing')) process.exitCode = 1;
else if (report.links.some(link => link.status !== 'reachable')) process.exitCode = 2;
