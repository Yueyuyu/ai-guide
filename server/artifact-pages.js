import { readFile } from 'node:fs/promises';
import { lessons } from '../src/data/index.js';
import { escapeHtml } from './reading-pages.js';

// 只生成教程明确引用的公开产物，不使用请求路径读取本机任意文件。
export const artifactPreviews = new Map(lessons.flatMap(lesson => lesson.sections.flatMap((section, index) =>
  (section.comparison?.items || []).flatMap(item => item.versions.map(version => [version.href + '.html', { ...version, lessonId: lesson.id, section: index }])),
)));

export async function renderArtifactPreview(path) {
  const artifact = artifactPreviews.get(path);
  if (!artifact) return null;
  const text = await readFile(new URL('../public/' + artifact.href, import.meta.url), 'utf8');
  const filename = artifact.href.split('/').pop();
  const root = '../'.repeat(artifact.href.split('/').length - 1);
  const title = artifact.label + ' · ' + filename;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} — AIGuide</title><link rel="icon" href="${root}favicon.svg"><style>*{box-sizing:border-box}body{margin:0;color:#263e60;background:#fcfdff;font:16px/1.9 system-ui,"Microsoft YaHei",sans-serif}main{max-width:960px;margin:32px auto;padding:0 20px}h1{font-size:24px;line-height:1.5;overflow-wrap:anywhere}nav{display:flex;flex-wrap:wrap;gap:12px 24px}a{color:#285bab;text-underline-offset:4px;min-height:44px;display:inline-flex;align-items:center}a:focus-visible{outline:3px solid #6798e1;outline-offset:4px}p{font-size:14px;color:#5d708c}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:14px/2 system-ui,"Microsoft YaHei",sans-serif;margin:20px 0;padding:20px;background:#f3f7fc;border:1px solid #dce6f2;border-radius:12px}@media(max-width:480px){main{padding:0 16px}h1{font-size:20px}pre{padding:14px}}</style></head><body><main><nav><a href="${root}#/learn/${escapeHtml(artifact.lessonId)}?section=section-${artifact.section}">返回教程</a><a href="${escapeHtml(filename)}" download="${escapeHtml(filename)}">下载原始 TXT</a></nav><h1>${escapeHtml(title)}</h1><p>完整文件预览 · 内容与原始 TXT 相同，保留原有文字和换行。</p><pre>${escapeHtml(text)}</pre></main></body></html>`;
}
