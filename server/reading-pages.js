import { lessons, lessonById } from '../src/data/index.js';
import { learningSetups } from '../src/data/learning-guidance.js';
import { reviewLabels, reviewDate } from '../src/data/source-review.js';

export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/gu, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function siteBase(value) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('AIGUIDE_SITE_URL 需要不含账号、查询和片段的 HTTPS 网站地址');
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url.href;
}

const contentLink = href => href.startsWith('#/') ? '../' + href : href.startsWith('https://') ? href : '../' + href;
const link = (href, label) => `<a href="${escapeHtml(contentLink(href))}">${escapeHtml(label)}</a>`;
const paragraphs = items => (items || []).map(text => `<p>${escapeHtml(text)}</p>`).join('');
const list = (items, ordered = false) => { const tag = ordered ? 'ol' : 'ul'; return `<${tag}>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</${tag}>`; };
const interactive = id => `../#/learn/${encodeURIComponent(id)}`;

function shell({ title, description, body, canonical }) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} — AIGuide</title><meta name="description" content="${escapeHtml(description)}"><meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:url" content="${escapeHtml(canonical)}">` : ''}<link rel="icon" href="../favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css"></head><body><header class="site-header"><a class="brand" href="../"><img src="../favicon.svg" width="28" height="28" alt="AIGuide 书页标识">AIGuide</a><nav aria-label="网站导航"><a href="index.html">阅读目录</a><a href="../#/paths">学习路线</a></nav></header><main>${body}</main><footer>AIGuide · 中文 AI 学习手册。${link('#/about', '关于与来源')} · ${link('#/feedback', '试用与反馈')}。学习记录保存在互动版的当前浏览器。</footer></body></html>`;
}

function renderSection(section, index, lessonId) {
  let body = paragraphs(section.paragraphs);
  if (section.actionSteps) body += list(section.actionSteps, true);
  if (section.list) body += list(section.list);
  if (section.diagram) body += '<aside class="note">关系示意：公司开发应用与模型；应用提供操作界面，模型在背后处理输入。互动版可查看并放大关系图。</aside>';
  if (section.prompt || section.code) body += `<figure><figcaption>${escapeHtml(section.promptLabel || section.language || '任务提示词')}</figcaption><pre><code>${escapeHtml(section.prompt || section.code)}</code></pre></figure>`;
  if (section.downloads) body += `<div class="links">${section.downloads.map(item => `<a href="${escapeHtml(contentLink(item.href))}" download="${escapeHtml(item.filename || '')}">${escapeHtml(item.label)}</a>`).join('')}</div>`;
  if (section.screenshot) {
    const image = section.screenshot;
    body += `<figure><img class="tutorial-image" src="${escapeHtml(contentLink(image.src))}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image.alt)}" loading="lazy"><figcaption>${escapeHtml(image.caption.replace('点击图片放大。', ''))}</figcaption>${image.markers ? list(image.markers.map(marker => marker.title + '：' + marker.description)) : ''}</figure>`;
  }
  if (section.reference) {
    const reference = section.reference;
    body += `<div class="table-scroll" tabindex="0" role="region" aria-label="参考答案，可横向滚动"><table><caption>${escapeHtml(reference.label)}</caption><thead><tr>${reference.columns.map(column => `<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${reference.rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  if (section.checkpoint) body += `<aside class="note">这一步完成的标志：${escapeHtml(section.checkpoint)}</aside>`;
  if (section.faq) body += section.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('');
  if (section.resultEditor || section.apiLab || section.noticeReview) body += `<aside class="note">${section.resultEditor ? '保存自己的成果' : section.apiLab ? '使用本地 JSON 练习台' : '练习判断原文依据'}：<a href="${interactive(lessonId)}?section=section-${index}">进入本节互动练习</a>。练习不会自动标记为完成。</aside>`;
  if (section.links) body += `<div class="links">${section.links.map(item => link(item.href, item.label)).join('')}</div>`;
  return `<section id="section-${index}"><h2>${index + 1}. ${escapeHtml(section.title)}</h2>${body}</section>`;
}

export function renderReadingPage(id, base = null) {
  const lesson = Object.hasOwn(lessonById, id) ? lessonById[id] : null;
  if (!lesson) return null;
  const setup = learningSetups[lesson.guide?.setup];
  const readiness = setup ? `<dl>${setup.facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>` : paragraphs([lesson.prerequisite]);
  const help = lesson.guide?.help ? `<section><h2>遇到问题，找到下一步</h2>${lesson.guide.help.map(item => `<details><summary>${escapeHtml(item.title)}</summary>${list(item.steps, true)}${item.prompt ? `<pre>${escapeHtml(item.prompt)}</pre>` : ''}<a href="#section-${item.section}">回到相关步骤</a></details>`).join('')}</section>` : '';
  const sources = lesson.review.sources.map(source => `<li>${link(source.url, source.title)}<p>${source.status === 'reviewed' ? '已核对资料' : '入口参考'} · 获取：${escapeHtml(reviewDate(source.retrievedAt))} · 来源更新：${escapeHtml(reviewDate(source.sourceUpdatedAt))}</p>${paragraphs([source.scope])}</li>`).join('');
  const body = `<p class="eyebrow">中文教程 · 独立阅读版</p><h1>${escapeHtml(lesson.title)}</h1><p class="description">${escapeHtml(lesson.description)}</p><p class="meta">内容整理：${escapeHtml(lesson.edited)} · 资料核对：${escapeHtml(reviewDate(lesson.review.checkedAt))}</p><a class="button" href="${interactive(id)}">进入互动版，练习并保存成果</a><nav class="toc" aria-label="本篇目录"><h2>本篇内容</h2><ol>${lesson.sections.map((section, index) => `<li><a href="#section-${index}">${escapeHtml(section.title)}</a></li>`).join('')}</ol></nav><section class="setup"><h2>开始前准备</h2>${readiness}${lesson.guide?.evidence ? paragraphs(['核对范围：' + lesson.guide.evidence]) : ''}</section>${lesson.sections.map((section, index) => renderSection(section, index, id)).join('')}${help}<section><h2>练习与核对</h2>${list(lesson.exercises)}<p>按实际操作自查，完成标记与成果草稿请在互动版保存。</p><a class="button" href="${interactive(id)}?section=practice">打开练习与核对</a></section><section><h2>带走这一点</h2>${paragraphs([lesson.takeaway])}</section><section id="sources"><h2>资料与核对记录</h2><strong>${escapeHtml(reviewLabels[lesson.review.status])}</strong>${paragraphs([lesson.review.scope, lesson.review.limit])}<ul class="sources">${sources}</ul></section><p><a href="${interactive(id)}?section=sources">步骤对不上？在互动版生成问题记录</a></p>`;
  const readingNote = '<p class="meta">本页可直接阅读、选中文本复制或打印。文中的复制按钮、判断练习和成果保存，请使用互动版。</p>';
  return shell({ title: lesson.title, description: lesson.description, body: readingNote + body, canonical: base ? new URL('read/' + id + '.html', base).href : null });
}

export function renderReadingIndex(base = null) {
  return shell({ title: '中文 AI 教程阅读目录', description: '按任务阅读 AI 教程，核对来源，并进入互动版保存自己的成果。', canonical: base ? new URL('read/index.html', base).href : null, body: `<p class="eyebrow">AIGuide · 阅读目录</p><h1>从一篇教程开始。</h1><p class="description">${lessons.length} 篇中文教程。独立页面可直接阅读；练习、收藏与进度在互动版使用。</p><div class="reading-list">${lessons.map(lesson => `<article><h2><a href="${escapeHtml(lesson.id)}.html">${escapeHtml(lesson.title)}</a></h2><p>${escapeHtml(lesson.description)}</p><small>内容整理 ${escapeHtml(lesson.edited)}</small></article>`).join('')}</div>` });
}

export function renderSitemap(base) {
  if (!base) return null;
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(new URL('read/index.html', base).href)}</loc></url>${lessons.map(lesson => `<url><loc>${escapeHtml(new URL('read/' + lesson.id + '.html', base).href)}</loc><lastmod>${escapeHtml(lesson.edited)}</lastmod></url>`).join('')}</urlset>`;
}
