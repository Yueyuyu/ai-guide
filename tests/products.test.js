import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { lessons, tools, platforms, projects } from '../src/data/index.js';
import { filterLessons, catalogUrl, parseRoute } from '../src/lib/learning.js';

test('软件与模型分层，每个专题都有对应入口的独立教程', () => {
  for (const tool of tools) {
    assert.ok(['app', 'agent', 'model'].includes(tool.kind), tool.id);
    assert.ok(lessons.some(lesson => lesson.productId === tool.id), `${tool.id} 缺少独立教程`);
    assert.ok(tool.platforms.every(id => platforms.some(item => item.id === id)));
    assert.equal(tool.platforms.includes('api'), tool.kind === 'model');
    tool.related.forEach(id => assert.ok(tools.some(item => item.id === id)));
  }
  for (const lesson of lessons) {
    assert.ok(platforms.some(item => item.id === lesson.platform));
    if (lesson.productId) {
      const tool = tools.find(item => item.id === lesson.productId);
      assert.ok(tool.platforms.includes(lesson.platform), lesson.id);
      assert.deepEqual(lesson.tools, [lesson.productId], `${lesson.id} 不应同时冒充多个软件的专属教程`);
    } else assert.equal(lesson.platform, 'general');
    assert.equal(new Set(lesson.sources.map(source => source.url)).size, lesson.sources.length);
  }
});

test('桌面和网页筛选取交集，切换与刷新保留正确的教程入口', () => {
  const web = filterLessons(lessons, { tool: 'claude-cowork', platform: 'web' });
  const desktop = filterLessons(lessons, { tool: 'claude-cowork', platform: 'desktop' });
  assert.deepEqual(web.map(item => item.id), ['claude-cowork-web']);
  assert.deepEqual(desktop.map(item => item.id), ['claude-cowork-desktop']);
  assert.notDeepEqual(web[0].sections, desktop[0].sections);
  assert.equal(filterLessons(lessons, { tool: 'gpt-models', platform: 'desktop' }).length, 0);
  const route = parseRoute(catalogUrl({ q: 'Claude 桌面', platform: 'desktop', tool: 'claude-desktop' }));
  assert.equal(route.params.get('platform'), 'desktop');
  assert.deepEqual(filterLessons(lessons, { query: route.params.get('q'), platform: route.params.get('platform'), tool: route.params.get('tool') }).map(item => item.id), ['claude-desktop-start']);
});

test('所有封面以中文说明学习内容，品牌图标均有本地资源且保留内置配色', () => {
  lessons.forEach(lesson => lesson.cover.forEach(text => assert.match(text, /[\u4e00-\u9fff]/u, lesson.id)));
  projects.forEach(project => assert.match(project.cover, /[\u4e00-\u9fff]/u));
  tools.forEach(tool => {
    assert.ok(fs.existsSync(new URL(`../public/brands/${tool.logo || tool.brand + '.svg'}`, import.meta.url)), tool.id);
    const svg = fs.readFileSync(new URL(`../public/brands/${tool.brand}.svg`, import.meta.url), 'utf8');
    assert.match(svg, /<svg\b/);
    assert.match(svg, /viewBox=/);
  });
  const colors = { anthropic: '#D97757', deepseek: '#4D6BFE', alibaba: '#6336E7', google: '#3186FF', minimax: '#E2167E' };
  for (const [brand, color] of Object.entries(colors)) assert.ok(fs.readFileSync(new URL(`../public/brands/${brand}.svg`, import.meta.url), 'utf8').includes(color));
});
