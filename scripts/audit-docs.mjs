import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const currentDocs = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'NOTICE.md', 'docs/README.md', 'docs/STATUS.md', 'docs/ROADMAP.md', 'docs/readme/README.md', '.github/pull_request_template.md'];
for (const name of await readdir(resolve(root, 'docs/engineering'))) if (name.endsWith('.md')) currentDocs.push('docs/engineering/' + name);
const errors = [];
let links = 0;
for (const file of currentDocs) {
  const markdown = await readFile(resolve(root, file), 'utf8');
  if (/[A-Z]:[/\\](?:Users|Support)[/\\]/iu.test(markdown)) errors.push(`${file}：工程文档包含机器专属路径`);
  // 只检查当前维护文档；历史设计记录保留原范围，不当成当前工程说明。
  const prose = markdown.replace(/```[\s\S]*?```/gu, '');
  // README 的居中品牌区使用 HTML；图片和按钮链接也应纳入本地检查。
  const references = [
    ...Array.from(prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/gu), match => match[1]),
    ...Array.from(prose.matchAll(/<(?:a|img|source)\b[^>]*?\b(?:href|src)\s*=\s*["']([^"']+)["']/giu), match => match[1]),
  ];
  for (const reference of references) {
    const href = reference.trim().replace(/^<|>$/gu, '');
    if (/^(?:https?:|mailto:|#)/iu.test(href)) continue;
    const relative = decodeURIComponent(href.split(/[?#]/u)[0]);
    if (!relative) continue;
    links++;
    try { await access(resolve(dirname(resolve(root, file)), relative)); }
    catch { errors.push(`${file}：本地链接不存在 ${relative}`); }
  }
}
console.log(JSON.stringify({ documents: currentDocs.length, localLinks: links, errors }, null, 2));
if (errors.length) process.exitCode = 1;
