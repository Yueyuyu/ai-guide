import test from 'node:test';
import assert from 'node:assert/strict';
import { companies, tools, lessonById } from '../src/data/index.js';
import { companyLearningGroup, filterLearningCompanies, resolveLearningEntry } from '../src/lib/company-learning.js';

test('四类学习入口保留真实使用端，API教程与模型指南各有独立目标', () => {
  const openai = companyLearningGroup(companies.find(company => company.id === 'openai'));
  assert.deepEqual(openai.sections.map(section => section.id), ['web', 'desktop', 'api', 'model']);
  assert.deepEqual(openai.sections.find(section => section.id === 'web').links.map(link => [link.label, link.href]), [
    ['ChatGPT', '#/tool/chatgpt?platform=web'], ['Codex', '#/tool/codex-cloud?platform=web'],
  ]);
  assert.deepEqual(openai.sections.find(section => section.id === 'desktop').links.map(link => [link.label, link.href]), [
    ['ChatGPT', '#/tool/chatgpt-desktop?platform=desktop'], ['Codex', '#/tool/codex?platform=desktop'],
  ]);
  assert.equal(openai.sections.find(section => section.id === 'api').links[0].href, '#/learn/gpt-api-map');
  assert.equal(openai.sections.find(section => section.id === 'model').links[0].href, '#/model/gpt-models');
  const anthropic = companyLearningGroup(companies.find(company => company.id === 'anthropic'));
  for (const platform of ['web', 'desktop']) assert.ok(anthropic.sections.find(section => section.id === platform).links.some(link => link.href === '#/tool/claude-cowork?platform=' + platform));
  assert.equal(companyLearningGroup(companies.find(company => company.id === 'google')).sections.some(section => section.id === 'desktop'), false);
});

test('公司目录和进阶区覆盖全部原产品，只有真实的专属API教程才生成入口', () => {
  const reachable = new Set();
  for (const company of companies) {
    const group = companyLearningGroup(company);
    for (const section of group.sections) for (const link of section.links) {
      reachable.add(link.tool.id);
      if (section.id === 'api') {
        const lesson = lessonById[link.href.slice('#/learn/'.length)];
        assert.equal(lesson?.productId, link.tool.id);
        assert.equal(lesson?.platform, 'api');
      } else if (section.id === 'model') assert.equal(link.tool.kind, 'model');
      else assert.ok(link.tool.platforms.includes(new URLSearchParams(link.href.split('?')[1]).get('platform')));
      assert.doesNotMatch(link.label, /CLI|云端版|桌面入口/);
    }
    for (const tool of group.advanced) { reachable.add(tool.id); assert.ok(tool.platforms.includes('terminal')); }
  }
  assert.deepEqual([...reachable].sort(), tools.map(tool => tool.id).sort());
});

test('公司搜索保留公司整体，分类不制造空公司，旧链接能转换到简单分类', () => {
  assert.equal(filterLearningCompanies().length, 12);
  const found = filterLearningCompanies({ query: '  QWEN CODE  ' });
  assert.deepEqual(found.map(group => group.company.id), ['alibaba']);
  assert.ok(found[0].advanced.some(tool => tool.id === 'qwen-code'));
  assert.deepEqual(filterLearningCompanies({ query: '谷歌', entry: 'model' }).map(group => group.sections.map(section => section.id)), [['model']]);
  assert.equal(filterLearningCompanies({ query: 'Google', entry: 'desktop' }).length, 0);
  assert.equal(filterLearningCompanies({ entry: 'desktop' }).length, 5);
  assert.equal(filterLearningCompanies({ query: '不存在的公司' }).length, 0);
  for (const [query, expected] of [['kind=model', 'model'], ['platform=api', 'api'], ['platform=editor', 'desktop'], ['entry=all&kind=model', 'all'], ['entry=unknown', 'all']]) {
    assert.equal(resolveLearningEntry(new URLSearchParams(query)), expected);
  }
});
