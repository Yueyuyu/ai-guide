import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, lessonById, tools, paths, projects, categories } from '../src/data/index.js';
import { emptyLearning, normalizeLearning, updateLearning, getPathProgress, filterLessons, catalogUrl, parseRoute } from '../src/lib/learning.js';

test('内容目录 ID 唯一，所有教程、专题、路线和项目相互引用有效', () => {
  for (const list of [lessons, tools, paths, projects]) assert.equal(new Set(list.map(item => item.id)).size, list.length);
  for (const lesson of lessons) {
    assert.ok(categories.some(category => category.id === lesson.category));
    assert.ok(lesson.sections.length >= 3 && lesson.exercises.length >= 3 && lesson.goals.length >= 3);
    assert.ok(lesson.sections.every(section => section.paragraphs.length >= 1));
    lesson.tools.forEach(id => assert.ok(tools.some(tool => tool.id === id), `${lesson.id} 引用了未知专题 ${id}`));
  }
  for (const tool of tools) { assert.ok(lessons.some(lesson => lesson.tools.includes(tool.id))); assert.equal(new URL(tool.docs).protocol, 'https:'); }
  for (const path of paths) path.sequence.forEach(id => assert.ok(lessonById[id]));
  for (const project of projects) project.lessons.forEach(id => assert.ok(lessonById[id]));
});

test('收藏可以切换，重复访问不会复制历史记录', () => {
  let state = updateLearning(emptyLearning(), { type: 'save', id: 'codex-web' });
  assert.deepEqual(state.saved, ['codex-web']);
  state = updateLearning(state, { type: 'save', id: 'codex-web' });
  assert.deepEqual(state.saved, []);
  state = updateLearning(state, { type: 'visit', id: 'ai-first' });
  state = updateLearning(state, { type: 'visit', id: 'codex-web' });
  state = updateLearning(state, { type: 'visit', id: 'ai-first' });
  assert.deepEqual(state.history, ['ai-first', 'codex-web']);
});

test('未完成练习不能标记完成，取消练习会同步撤销完成状态', () => {
  let state = updateLearning(emptyLearning(), { type: 'complete', id: 'codex-web' });
  assert.deepEqual(state.completed, []);
  for (const index of [0, 1, 2]) state = updateLearning(state, { type: 'exercise', id: 'codex-web', index });
  state = updateLearning(state, { type: 'complete', id: 'codex-web' });
  assert.deepEqual(state.completed, ['codex-web']);
  const restored = normalizeLearning(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored, state);
  state = updateLearning(state, { type: 'exercise', id: 'codex-web', index: 1 });
  assert.deepEqual(state.completed, []);
  assert.deepEqual(state.exercises['codex-web'], [0, 2]);
});

test('损坏与恶意导入不会保留未知教程、越界练习或伪造完成状态', () => {
  assert.deepEqual(normalizeLearning(null), emptyLearning());
  const state = normalizeLearning({ saved: ['__proto__', 'toString', 'codex-web', 'codex-web', 0], completed: ['codex-web'], history: ['invalid'], exercises: { 'codex-web': [-1, 0, 0, 42, 1.5, '1'] } });
  assert.deepEqual(state.saved, ['codex-web']);
  assert.deepEqual(state.completed, []);
  assert.deepEqual(state.exercises['codex-web'], [0]);
  assert.deepEqual(updateLearning(state, { type: 'exercise', id: '__proto__', index: 1 }), state);
});

test('搜索同时支持中文分类、专题别名、英文大小写和多个词，筛选条件取交集', () => {
  assert.ok(filterLessons(lessons, { query: 'CODEX 网页' }).some(lesson => lesson.id === 'codex-web'));
  assert.ok(filterLessons(lessons, { query: '通义 JSON' }).some(lesson => lesson.id === 'qwen-structured'));
  assert.ok(filterLessons(lessons, { query: '零基础' }).every(lesson => lesson.category === 'basics'));
  assert.deepEqual(filterLessons(lessons, { category: 'coding', level: '入门', tool: 'codex' }).map(lesson => lesson.id), ['codex-web', 'codex-iterate', 'website-check']);
  assert.equal(filterLessons(lessons, { query: '不存在的教程xx' }).length, 0);
  assert.equal(filterLessons(lessons, { category: 'bad-id' }).length, 0);
});

test('筛选链接保留中文和特殊字符，刷新可恢复同一查询条件', () => {
  const url = catalogUrl({ q: '模型 & API?', category: 'models', level: 'all' });
  const route = parseRoute(url);
  assert.equal(route.page, 'tutorials');
  assert.equal(route.params.get('q'), '模型 & API?');
  assert.equal(route.params.get('category'), 'models');
  assert.equal(route.params.has('level'), false);
});

test('路线进度由有效完成记录计算，下一课跳过已经完成的教程', () => {
  const path = paths[0];
  let state = emptyLearning();
  assert.equal(getPathProgress(path, state).percent, 0);
  for (const id of path.sequence.slice(0, 2)) {
    for (const index of [0, 1, 2]) state = updateLearning(state, { type: 'exercise', id, index });
    state = updateLearning(state, { type: 'complete', id });
  }
  assert.deepEqual(getPathProgress(path, state), { done: 2, total: 6, percent: 33, next: 'prompt-template' });
});
