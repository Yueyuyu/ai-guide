import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { manuals } from '../src/data/manuals/index.js';
import { manualHref, manualResourceHref, manualSectionKinds, searchManuals } from '../src/data/manual-catalog.js';
import { lessonById } from '../src/data/index.js';
import { searchContent } from '../src/lib/discovery.js';
import { parseRoute } from '../src/lib/learning.js';
import { escapeHtml, renderSitemap } from '../server/reading-pages.js';
import { renderManualPage, renderManualIndex } from '../server/manual-pages.js';
import { readingPlugin } from '../server/reading-plugin.js';

test('手册的章节深链、官方依据和后续练习均能解析', async () => {
  assert.equal(new Set(manuals.map(manual => manual.id)).size, 4);
  for (const manual of manuals) {
    await access(new URL('../public/brands/' + manual.logo, import.meta.url));
    assert.equal(new URL(manual.officialUrl).protocol, 'https:');
    assert.equal(new Set(manual.sections.map(section => section.id)).size, manual.sections.length);
    assert.equal(new Set(manual.sources.map(source => source.id)).size, manual.sources.length);
    for (const kind of manualSectionKinds) assert.ok(manual.sections.some(section => section.kind === kind.id));
    for (const section of manual.sections) {
      const route = parseRoute(manualHref(manual.id, section.id));
      assert.equal(route.page, 'manuals');
      assert.equal(route.id, manual.id);
      assert.equal(route.params.get('section'), section.id);
      assert.ok(section.paragraphs.length && section.check && section.sourceIds.length);
      for (const sourceId of section.sourceIds) assert.ok(manual.sources.some(source => source.id === sourceId));
      for (const link of section.links || []) {
        if (link.lessonId) {
          assert.ok(lessonById[link.lessonId]);
          if (link.section) assert.ok(lessonById[link.lessonId].sections[Number(link.section.slice('section-'.length))]);
        } else await access(new URL('../public/' + link.path, import.meta.url));
      }
    }
    for (const source of manual.sources) assert.equal(new URL(source.url).protocol, 'https:');
    for (const lesson of manual.lessons) assert.ok(lessonById[lesson.id], lesson.id);
  }
});

test('搜索能按产品别名找到本站手册，空白和不存在的查询不制造结果', () => {
  for (const [query, expected] of [['Z Code', 'zcode'], ['智谱 工作区', 'zcode'], ['workbody', 'workbuddy'], ['OpenAI 图像', 'openai'], ['claude code', 'claude-code'], ['OpenAI 批注', 'openai'], ['WorkBuddy 计划模式', 'workbuddy'], ['ZCode Skill', 'zcode'], ['Claude compact', 'claude-code']]) {
    assert.deepEqual(searchContent(query).manuals.map(manual => manual.id), [expected]);
  }
  assert.deepEqual(searchManuals('   '), []);
  assert.deepEqual(searchManuals('不存在的产品xyz'), []);
});

test('独立阅读完整保留正文、任务和两个入口，支持子目录部署', () => {
  const base = 'https://example.test/guide/';
  for (const manual of manuals) {
    const html = renderManualPage(manual.id, base);
    assert.ok(html.includes(`https://example.test/guide/manuals/${manual.id}.html`));
    assert.ok(html.includes('../read/styles.css'));
    assert.ok(html.includes('../#/manuals/' + manual.id));
    assert.ok(html.includes(escapeHtml(manual.officialUrl)));
    assert.doesNotMatch(html, /<script\b|<iframe\b/u);
    for (const section of manual.sections) {
      assert.ok(html.includes(`id="manual-${section.id}"`));
      for (const text of [...section.paragraphs, ...(section.steps || []), section.check, section.prompt].filter(Boolean)) assert.ok(html.includes(escapeHtml(text)));
      for (const entry of section.faq || []) {
        assert.ok(html.includes('<summary>' + escapeHtml(entry.question) + '</summary>'));
        assert.ok(html.includes(escapeHtml(entry.answer)));
      }
      if (section.caseStudy) {
        assert.ok(['recorded', 'practice'].includes(section.caseStudy.status));
        assert.ok(html.includes(escapeHtml(section.caseStudy.scope)) && html.includes(escapeHtml(section.caseStudy.result)));
      }
      for (const link of section.links || []) {
        assert.ok(html.includes(`href="${manualResourceHref(link, { staticPage: true })}"`));
        if (link.download) assert.ok(html.includes(`download="${link.download}"`));
      }
    }
  }
  const index = renderManualIndex();
  for (const manual of manuals) assert.ok(index.includes(`href="${manual.id}.html"`));
  for (const id of ['unknown', '__proto__', '../openai']) assert.equal(renderManualPage(id), null);
});

test('原有章节深链仍在原位置，案例跳转和下载保留部署前缀', () => {
  const initial = {
    openai: ['entry', 'prompt', 'iterate', 'images', 'codex'],
    workbuddy: ['prepare', 'plan', 'create', 'review', 'save'],
    zcode: ['setup', 'workspace', 'build', 'inspect', 'organize'],
    'claude-code': ['install', 'read', 'plan', 'change', 'continue'],
  };
  for (const manual of manuals) assert.deepEqual(manual.sections.slice(0, 5).map(section => section.id), initial[manual.id]);
  const lesson = { lessonId: 'workbuddy-first', section: 'section-4' };
  assert.equal(manualResourceHref(lesson), '#/learn/workbuddy-first?section=section-4');
  assert.equal(manualResourceHref(lesson, { staticPage: true }), '../read/workbuddy-first.html#section-4');
  assert.equal(manualResourceHref({ path: 'practice/manuals/claude-total.mjs' }, { base: '/guide/' }), '/guide/practice/manuals/claude-total.mjs');
});

test('构建插件实际输出手册页，站点地图指向生成资产', async () => {
  const emitted = new Map();
  const base = 'https://example.test/guide/';
  await readingPlugin({ siteUrl: base }).generateBundle.call({ emitFile: asset => emitted.set(asset.fileName, asset.source) });
  for (const id of ['index', ...manuals.map(manual => manual.id)]) assert.ok(emitted.get('manuals/' + id + '.html'));
  assert.ok(emitted.has('read/styles.css'));
  for (const match of renderSitemap(base).matchAll(/<loc>([^<]+)<\/loc>/gu)) assert.ok(emitted.has(new URL(match[1]).pathname.slice('/guide/'.length)), match[1]);
});
