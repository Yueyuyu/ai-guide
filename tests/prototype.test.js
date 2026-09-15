import test from 'node:test';
import assert from 'node:assert/strict';
import { paths, lessonById } from '../src/data/index.js';
import { readingContext, searchContent, lessonType } from '../src/lib/discovery.js';
import { emptyLearning, normalizeLearning, updateLearning, readStoredLearning } from '../src/lib/learning.js';

test('读取损坏或不可用的存储时禁止自动覆盖，合法旧记录继续保留', () => {
  for (const raw of ['{bad', 'null', '{"version":2}', '[]']) {
    const result = readStoredLearning({ getItem: () => raw });
    assert.equal(result.blocked, true);
  }
  assert.equal(readStoredLearning({ getItem: () => { throw new Error('denied'); } }).blocked, true);
  assert.equal(readStoredLearning({ getItem: () => null }).blocked, false);
  const old = { version: 1, saved: ['ai-first'], completed: [], history: ['ai-first'], exercises: {} };
  const result = readStoredLearning({ getItem: () => JSON.stringify(old) });
  assert.equal(result.blocked, false);
  assert.deepEqual(result.learning.saved, ['ai-first']);
});

test('六课入门顺序完整，共享文章按当前路线决定下一课', () => {
  assert.deepEqual(paths.find(p => p.id === 'starter').sequence, ['ai-first', 'choose-model', 'prompt-template', 'choose-tool', 'doubao-notice', 'research-first']);
  assert.equal(readingContext('choose-model', 'starter').next.id, 'prompt-template');
  assert.equal(readingContext('choose-model', 'builder').next.id, 'codex-web');
  assert.equal(readingContext('choose-model', 'developer').next.id, 'api-first');
  assert.equal(readingContext('choose-model', undefined).next, undefined);
});
test('搜索同时发现应用、编程工具、模型与文章；入口教学类型独立', () => {
  const result = searchContent('Claude');
  assert.ok(result.products.some(t => t.id === 'claude-code'));
  assert.ok(result.models.some(t => t.id === 'claude-models'));
  assert.ok(result.lessons.some(t => t.id === 'claude-desktop-start'));
  assert.equal(result.products.some(t => t.kind === 'model'), false);
  assert.equal(lessonType(lessonById['doubao-work-start']), 'setup');
  assert.equal(lessonType(lessonById['claude-desktop-start']), 'operation');
  assert.equal(Object.values(searchContent('')).flat().length, 0);
});
test('浏览记录保留合法路线与阅读位置，恶意位置不会恢复', () => {
  let state = updateLearning(emptyLearning(), { type: 'visit', id: 'choose-model', pathId: 'builder' });
  state = updateLearning(state, { type: 'location', id: 'choose-model', section: 'section-2' });
  assert.equal(normalizeLearning(state).contexts['choose-model'], 'builder');
  assert.equal(normalizeLearning(state).locations['choose-model'], 'section-2');
  const invalid = normalizeLearning({ ...state, contexts: { 'choose-model': 'office' }, locations: { 'choose-model': '__proto__' } });
  assert.equal(invalid.contexts['choose-model'], undefined);
  assert.equal(invalid.locations['choose-model'], undefined);
});
test('项目必须完成本阶段两项自查；撤销检查不影响其他已完成阶段', () => {
  let state = updateLearning(emptyLearning(), { type: 'project-complete', id: 'research-note', index: 0 });
  assert.deepEqual(state.projectCompleted, {});
  for (const index of [0, 1, 2, 3]) state = updateLearning(state, { type: 'project-check', id: 'research-note', index });
  for (const index of [0, 1]) state = updateLearning(state, { type: 'project-complete', id: 'research-note', index });
  assert.deepEqual(state.projectCompleted['research-note'], [0, 1]);
  state = updateLearning(state, { type: 'project-check', id: 'research-note', index: 0 });
  assert.deepEqual(state.projectCompleted['research-note'], [1]);
  assert.deepEqual(normalizeLearning({ ...state, projectCompleted: { 'research-note': [-1, 99, 2, '__proto__'] } }).projectCompleted, {});
});
