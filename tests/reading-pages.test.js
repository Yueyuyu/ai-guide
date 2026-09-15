import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../src/data/index.js';
import { escapeHtml, siteBase, renderReadingPage, renderReadingIndex, renderSitemap } from '../server/reading-pages.js';

test('每篇教程生成独立正文与来源，交互入口保留对应章节', () => {
  for (const lesson of lessons) {
    const html = renderReadingPage(lesson.id);
    assert.ok(html.includes(`<h1>${escapeHtml(lesson.title)}</h1>`));
    assert.ok(html.includes('meta name="description"'));
    for (const [index, section] of lesson.sections.entries()) assert.ok(html.includes(`id="section-${index}"`), `${lesson.id}/${section.title}`);
    for (const source of lesson.review.sources) assert.ok(html.includes(escapeHtml(source.url)), lesson.id);
    assert.doesNotMatch(html, /<script\b/u);
    assert.doesNotMatch(html, /rel="canonical"/u);
    if (lesson.resultSaving) assert.ok(html.includes(`../#/learn/${lesson.id}?section=section-${lesson.sections.findIndex(section => section.resultEditor)}`));
  }
  assert.equal(renderReadingPage('__proto__'), null);
  assert.equal(renderReadingPage('unknown'), null);
});

test('发布地址支持子目录，只在配置真实地址后生成 canonical 与 sitemap', () => {
  assert.equal(siteBase(''), null);
  assert.equal(siteBase('https://example.test/guide'), 'https://example.test/guide/');
  for (const invalid of ['http://example.test', 'https://u:p@example.test', 'https://example.test/?q=1', 'https://example.test/#/learn']) assert.throws(() => siteBase(invalid));
  const base = siteBase('https://example.test/guide/');
  assert.ok(renderReadingPage('doubao-notice', base).includes('href="https://example.test/guide/read/doubao-notice.html"'));
  assert.ok(renderReadingIndex(base).includes('https://example.test/guide/read/index.html'));
  const sitemap = renderSitemap(base);
  assert.equal([...sitemap.matchAll(/<loc>/gu)].length, lessons.length + 1);
  assert.doesNotMatch(sitemap, /#\/|localhost|127\.0\.0\.1/);
  assert.equal(renderSitemap(null), null);
  assert.equal(escapeHtml('<script>"&\''), '&lt;script&gt;&quot;&amp;&#39;');
});
