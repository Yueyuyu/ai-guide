import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { companies, companyByToolId, featuredCompanies, tools, lessons } from '../src/data/index.js';
import { filterCompanyGroups } from '../src/lib/company-directory.js';

test('每个产品唯一归属一家公司，公司内专属教程无遗漏且品牌资源有效', () => {
  const productIds = companies.flatMap(company => company.toolIds);
  assert.equal(new Set(companies.map(company => company.id)).size, companies.length);
  assert.equal(new Set(productIds).size, productIds.length, '产品不能重复归到多家公司');
  assert.deepEqual([...productIds].sort(), tools.map(tool => tool.id).sort());
  for (const company of companies) {
    assert.ok(company.toolIds.length > 0);
    assert.ok(fs.existsSync(new URL(`../public/brands/${company.logo || company.brand + '.svg'}`, import.meta.url)), company.id);
  }
  for (const lesson of lessons.filter(item => item.productId)) assert.ok(companyByToolId[lesson.productId]?.toolIds.includes(lesson.productId), lesson.id);
  for (const id of ['chatgpt', 'chatgpt-desktop', 'codex', 'codex-cloud', 'codex-cli', 'gpt-models']) assert.equal(companyByToolId[id].id, 'openai');
  for (const id of ['claude', 'claude-desktop', 'claude-cowork', 'claude-code', 'claude-models']) assert.equal(companyByToolId[id].id, 'anthropic');
  assert.equal(companyByToolId['qwen-code'].id, 'alibaba');
  assert.equal(new Set(featuredCompanies.map(company => company.id)).size, featuredCompanies.length);
});

test('公司搜索兼容产品别名，类型与使用端取交集，不显示无匹配入口的公司', () => {
  assert.equal(filterCompanyGroups().length, companies.length);
  assert.deepEqual(filterCompanyGroups({ query: '阿里巴巴' }).flatMap(group => group.tools.map(tool => tool.id)), ['qwen', 'qwen-code', 'qwen-models']);
  assert.deepEqual(filterCompanyGroups({ query: '  QWEN CODE  ' }).map(group => [group.company.id, group.tools.map(tool => tool.id)]), [['alibaba', ['qwen-code']]]);
  assert.deepEqual(filterCompanyGroups({ query: '谷歌', kind: 'model' }).flatMap(group => group.tools.map(tool => tool.id)), ['gemini-models']);
  assert.deepEqual(filterCompanyGroups({ query: 'OpenAI', platform: 'desktop' }).flatMap(group => group.tools.map(tool => tool.id)), ['chatgpt-desktop', 'codex']);
  assert.deepEqual(filterCompanyGroups({ query: 'OpenAI', kind: 'agent', platform: 'desktop' }).flatMap(group => group.tools.map(tool => tool.id)), ['codex']);
  assert.equal(filterCompanyGroups({ kind: 'model', platform: 'desktop' }).length, 0);
  assert.equal(filterCompanyGroups({ query: '不存在的公司' }).length, 0);
});
