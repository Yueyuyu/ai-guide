import { manuals, getManual } from '../src/data/manuals/index.js';
import { manualResourceHref, manualSectionKinds } from '../src/data/manual-catalog.js';
import { escapeHtml } from './reading-pages.js';

const paragraphs = items => items.map(text => `<p>${escapeHtml(text)}</p>`).join('');
const officialLink = (url, title) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(title)} ↗</a>`;

function shell({ title, description, body, canonical }) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} — AIGuide</title><meta name="description" content="${escapeHtml(description)}">${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : ''}<link rel="icon" href="../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../read/styles.css"></head><body><header class="site-header"><a class="brand" href="../">AIGuide</a><nav aria-label="网站导航"><a href="index.html">使用手册</a><a href="../read/index.html">教程目录</a></nav></header><main>${body}</main><footer>本站原创整理，保留官方来源。本页可直接阅读、选中文字复制或打印。</footer></body></html>`;
}

function renderSection(manual, section, index) {
  const label = manualSectionKinds.find(kind => kind.id === section.kind).label;
  const example = section.caseStudy;
  const caseHtml = example ? `<aside class="note"><strong>${example.status === 'recorded' ? '已有实测记录' : '教学练习 · 待产品实测'}</strong>${paragraphs([example.scope, example.result])}</aside>` : '';
  const faq = (section.faq || []).map(item => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join('');
  const resources = section.links ? `<div class="links">${section.links.map(link => `<a href="${escapeHtml(manualResourceHref(link, { staticPage: true }))}"${link.download ? ` download="${escapeHtml(link.download)}"` : ''}>${escapeHtml(link.label)}</a>`).join('')}</div>` : '';
  const sources = section.sourceIds.map(id => { const source = manual.sources.find(source => source.id === id); return officialLink(source.url, source.title); }).join('');
  return `<section id="manual-${section.id}"><p class="eyebrow">${label}</p><h2>${index + 1}. ${escapeHtml(section.title)}</h2>${paragraphs(section.paragraphs)}${caseHtml}${section.steps ? `<ol>${section.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>` : ''}${section.prompt ? `<figure><figcaption>${escapeHtml(section.promptLabel || '本站示例任务 · 可选中文字复制')}</figcaption><pre><code>${escapeHtml(section.prompt)}</code></pre></figure>` : ''}${faq}${resources}<aside class="note"><strong>完成后检查</strong><p>${escapeHtml(section.check)}</p></aside><div class="links"><span>本节官方参考</span>${sources}</div></section>`;
}

export function renderManualPage(id, base = null) {
  const manual = getManual(id);
  if (!manual) return null;
  const topics = manualSectionKinds.map(kind => `<a href="#manual-${manual.sections.find(section => section.kind === kind.id).id}">${kind.label}</a>`).join('');
  const body = `<p class="eyebrow">使用手册 · 本站原创整理 · 独立阅读版</p><h1>${escapeHtml(manual.title)}</h1><p class="description">${escapeHtml(manual.description)}</p><p class="meta">官方资料核对：${manual.checkedAt} · ${manual.sections.length} 节</p><div class="links">${officialLink(manual.officialUrl, '查看官方文档')}<a href="../#/manuals/${manual.id}">打开互动版</a></div><nav class="links" aria-label="按内容类型阅读">${topics}</nav><nav class="toc" aria-label="本篇目录"><ol>${manual.sections.map(section => `<li><a href="#manual-${section.id}">${escapeHtml(section.title)}</a></li>`).join('')}</ol></nav>${manual.sections.map((section, index) => renderSection(manual, section, index)).join('')}${manual.lessons.length ? `<section><h2>继续动手练习</h2><div class="links">${manual.lessons.map(lesson => `<a href="../read/${lesson.id}.html">${escapeHtml(lesson.label)}</a>`).join('')}</div></section>` : ''}<section><h2>来源与核对范围</h2>${paragraphs([manual.scope, '本文为本站整理，不是官方译本。示例任务与完成标准用于学习，不代表产品承诺。'])}<ul class="sources">${manual.sources.map(source => `<li>${officialLink(source.url, source.title)}</li>`).join('')}</ul></section><a href="index.html">返回使用手册目录</a>`;
  return shell({ title: manual.title, description: manual.description, body, canonical: base ? new URL(`manuals/${manual.id}.html`, base).href : null });
}

export function renderManualIndex(base = null) {
  return shell({ title: '使用手册', description: 'OpenAI、WorkBuddy、ZCode 与 Claude Code 的本站中文教程和官方文档入口。', canonical: base ? new URL('manuals/index.html', base).href : null, body: `<p class="eyebrow">AIGuide · 中文使用手册</p><h1>在这里学会，再向官方深入。</h1><p class="description">本站教程提供中文步骤、示例任务与核对方法，官方入口提供原始说明与最新功能。</p><div class="reading-list">${manuals.map(manual => `<article><h2>${escapeHtml(manual.title)}</h2><p>${escapeHtml(manual.description)}</p><div class="links"><a href="${manual.id}.html">阅读本站教程</a>${officialLink(manual.officialUrl, '查看官方文档')}</div><small>本站原创整理 · 官方资料核对 ${manual.checkedAt}</small></article>`).join('')}</div>` });
}
