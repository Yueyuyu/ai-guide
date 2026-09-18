import { lessons, lessonById } from '../src/data/index.js';
import { tutorialSymbols, visualSymbol, lessonIdentity } from '../src/data/tutorial-presentation.js';
import { learningSetups } from '../src/data/learning-guidance.js';
import { reviewLabels, reviewDate } from '../src/data/source-review.js';
import { apiExampleCases, apiPracticeNotice } from '../src/data/api-examples.js';

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

function symbol(name, size = 22) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + tutorialSymbols[name] + '"></path></svg>';
}

function renderIdentity(lesson) {
  const identity = lessonIdentity(lesson);
  if (!identity) return '';
  return '<a class="lesson-product" href="' + escapeHtml(identity.href) + '" aria-label="' + escapeHtml(identity.name + ' 官方入口') + '"><span class="lesson-product-logo brand-' + escapeHtml(identity.brand) + '"><img src="../brands/' + escapeHtml(identity.logo) + '" width="28" height="28" alt=""></span><strong>' + escapeHtml(identity.name) + '</strong><span class="lesson-product-platform">' + escapeHtml(identity.platform) + '</span>' + symbol('external', 14) + '</a>';
}

function renderStepImage(image) {
  const imageUrl = escapeHtml(contentLink(image.src));
  const markers = (image.markers || []).map((marker, i) => `<span class="image-marker" style="left:${Number(marker.x)}%;top:${Number(marker.y)}%" aria-hidden="true">${Number(marker.number) || i + 1}</span>`).join('');
  const content = `<img class="tutorial-image" src="${imageUrl}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image.alt)}" loading="lazy">${markers}`;
  const focus = image.focus;
  const frame = focus
    ? `<div class="image-frame image-focus" style="aspect-ratio:${image.width * focus.width / (image.height * focus.height)}"><div class="image-plane" style="width:${10000 / focus.width}%;left:${-100 * focus.x / focus.width}%;top:${-100 * focus.y / focus.height}%">${content}</div></div>`
    : `<div class="image-frame${image.height > image.width * 1.8 ? ' image-portrait' : ''}">${content}</div>`;
  return `<figure><a href="${imageUrl}" aria-label="${escapeHtml('查看原图：' + image.alt)}">${frame}<span class="zoom-hint">${focus ? '操作区域放大 · 点击看完整原图' : '点击看原图'} ↗</span></a><figcaption>${escapeHtml(image.caption)}${image.sourceUrl ? ' · ' + link(image.sourceUrl, '官方来源') : ''}</figcaption></figure>`;
}

function renderSection(section, index, lessonId) {
  let body = paragraphs(section.paragraphs);
  if (section.downloads) body += `<div class="links">${section.downloads.map(item => `<a href="${escapeHtml(contentLink(item.href))}" download="${escapeHtml(item.filename || '')}">${escapeHtml(item.label)}</a>`).join('')}</div>`;
  if (section.actionSteps) body += list(section.actionSteps, true);
  if (section.screenshot) {
    const image = section.screenshot;
    const imageUrl = escapeHtml(contentLink(image.src));
    const markers = (image.markers || []).map((marker, i) => `<span class="image-marker" style="left:${Number(marker.x)}%;top:${Number(marker.y)}%" aria-hidden="true">${Number(marker.number) || i + 1}</span>`).join('');
    body = `<div class="visual-step"><div>${body}</div><figure><a href="${imageUrl}" aria-label="${escapeHtml('查看原图：' + image.alt)}"><div class="image-frame"><img class="tutorial-image" src="${imageUrl}" width="${image.width}" height="${image.height}" alt="${escapeHtml(image.alt)}" loading="lazy">${markers}</div><span class="zoom-hint">点击看原图 ↗</span></a><figcaption>${escapeHtml(image.caption.replace('点击图片放大。', ''))}${image.sourceUrl ? ' · ' + link(image.sourceUrl, '官方来源') : ''}</figcaption>${!section.actionSteps && image.markers?.length ? list(image.markers.map(marker => marker.title + '：' + marker.description)) : ''}</figure></div>`;
  }
  if (section.visual && !section.screenshot) {
    const visual = section.visual;
    body = `<div class="lesson-diagram-step"><div>${body}</div><figure class="lesson-visual lesson-visual-${escapeHtml(visual.kind || 'flow')}"><figcaption><strong>${escapeHtml(visual.title)}</strong><span>${escapeHtml(visual.label || '步骤图解 · 非软件截图')}</span></figcaption><ol class="lesson-visual-items visual-count-${visual.items.length}">${visual.items.map((item, i) => `<li><span class="visual-symbol" aria-hidden="true">${item.logo ? '<img src="../brands/' + escapeHtml(item.logo) + '" alt="" width="28" height="28">' : symbol(visualSymbol(item, visual, i))}</span><div class="visual-item-content"><strong><span class="visual-index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${escapeHtml(item.title)}</strong>${item.text ? `<p>${escapeHtml(item.text)}</p>` : ''}${item.code ? `<code>${escapeHtml(item.code)}</code>` : ''}</div></li>`).join('')}</ol>${visual.note ? `<p class="visual-note">${escapeHtml(visual.note)}</p>` : ''}</figure></div>`;
  }
  if (section.list) body += list(section.list);
  if (section.walkthrough) body += `<div class="reading-walkthrough">${section.walkthrough.map((step, i) => `<article><h3>${i + 1}. ${escapeHtml(step.title)}</h3><p>${escapeHtml(step.action)}</p>${renderStepImage(step.screenshot)}<aside class="note">完成标准：${escapeHtml(step.checkpoint)}</aside></article>`).join('')}</div>`;
  if (section.comparison) {
    const comparison = section.comparison;
    body += `<div class="artifact-comparison"><h3>${escapeHtml(comparison.title)}</h3><p class="artifact-comparison-caption">${escapeHtml(comparison.caption)}</p>${comparison.items.map(item => `<details name="${escapeHtml(lessonId + '-comparison-' + index)}"><summary>${escapeHtml(item.title)}${symbol('down', 16)}</summary><div class="artifact-versions">${item.versions.map((version, i) => `<div class="artifact-version artifact-version-${i}"><strong class="artifact-version-label"><span aria-hidden="true">${i + 1}</span>${escapeHtml(version.label)}</strong>${version.excerpts.map(text => `<blockquote>${escapeHtml(text)}</blockquote>`).join('')}${version.note ? `<p class="artifact-version-note">${escapeHtml(version.note)}</p>` : ''}<a href="${escapeHtml(contentLink(version.href + '.html'))}" target="_blank" rel="noreferrer" aria-label="${escapeHtml('查看' + version.label + '完整文件（新窗口）')}">查看完整文件 ↗</a></div>`).join('')}</div><p class="artifact-takeaway">${escapeHtml(item.takeaway)}</p></details>`).join('')}</div>`;
  }
  if (section.diagram) body += '<aside class="note">关系示意：公司开发应用与模型；应用提供操作界面，模型在背后处理输入。互动版可查看并放大关系图。</aside>';
  for (const [text, label, preview] of [[section.prompt, section.promptLabel || '任务提示词', section.promptPreview], [section.code, section.language || '代码示例']]) {
    if (!text) continue;
    const content = `<pre><code>${escapeHtml(text)}</code></pre>`;
    body += `<figure><figcaption>${escapeHtml(label)}</figcaption>${preview ? `<p>${escapeHtml(preview)}</p><details><summary>展开完整内容</summary>${content}</details>` : content}</figure>`;
  }
  if (section.reference) {
    const reference = section.reference;
    body += `<details><summary>对照人工参考答案</summary><div class="table-scroll" tabindex="0" role="region" aria-label="参考答案，可横向滚动"><table><caption>${escapeHtml(reference.label)}</caption><thead><tr>${reference.columns.map(column => `<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${reference.rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`;
  }
  if (section.supplement) body += `<details><summary>${escapeHtml(section.supplement.title || '补充说明')}</summary>${paragraphs(section.supplement.paragraphs)}${section.supplement.list ? list(section.supplement.list) : ''}</details>`;
  if (section.checkpoint) body += `<aside class="note">这一步完成的标志：${escapeHtml(section.checkpoint)}</aside>`;
  if (section.apiLab) body += `<p>原通知：${escapeHtml(apiPracticeNotice)}</p><p>本站教学样例 · 不调用模型，不是厂商原始响应。</p>` + apiExampleCases.map(example => `<details><summary>${escapeHtml(example.label)}</summary><pre><code>${escapeHtml(example.value)}</code></pre><p><strong>${escapeHtml(example.result)}</strong>：${escapeHtml(example.check)}</p></details>`).join('');
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
  const body = `<p class="eyebrow">中文教程 · 独立阅读版</p>${renderIdentity(lesson)}<h1>${escapeHtml(lesson.title)}</h1><p class="description">${escapeHtml(lesson.description)}</p><p class="meta">内容整理：${escapeHtml(lesson.edited)} · 资料核对：${escapeHtml(reviewDate(lesson.review.checkedAt))}</p><a class="button" href="${interactive(id)}">进入互动版，练习并保存成果</a><details class="toc"><summary>本篇目录</summary><nav aria-label="本篇目录"><ol>${lesson.sections.map((section, index) => `<li><a href="#section-${index}">${escapeHtml(section.title)}</a></li>`).join('')}</ol></nav></details><details class="setup"><summary>开始前准备 · 设备、账号与费用</summary>${readiness}${lesson.guide?.evidence ? paragraphs(['核对范围：' + lesson.guide.evidence]) : ''}</details>${lesson.sections.map((section, index) => renderSection(section, index, id)).join('')}${help}<section><h2>练习与核对</h2>${list(lesson.exercises)}<p>按实际操作自查，完成标记与成果草稿请在互动版保存。</p><a class="button" href="${interactive(id)}?section=practice">打开练习与核对</a></section><section><h2>带走这一点</h2>${paragraphs([lesson.takeaway])}</section><section id="sources"><h2>资料与核对记录</h2><strong>${escapeHtml(reviewLabels[lesson.review.status])}</strong>${paragraphs([lesson.review.scope, lesson.review.limit])}<details><summary>查看来源与日期</summary><ul class="sources">${sources}</ul></details></section><p><a href="${interactive(id)}?section=sources">步骤对不上？在互动版生成问题记录</a></p>`;
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
