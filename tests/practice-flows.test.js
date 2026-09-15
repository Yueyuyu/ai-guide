import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessons, lessonById, paths } from '../src/data/index.js';
import { projectStages } from '../src/data/project-stages.js';
import { resourceFiles, projectResources } from '../src/data/practice-resources.js';
import { apiExamples, validateTaskOutput } from '../src/lib/api-output.js';
import { resultHref, readingContext } from '../src/lib/discovery.js';
import { emptyLearning, normalizeLearning, updateLearning, getPathProgress } from '../src/lib/learning.js';
import { practiceResultText } from '../src/lib/practice-files.js';
import registry from '../src/data/source-review.json' with { type: 'json' };

test('连续路线不强制换工具，旧选学进度保留且不算入新主线', () => {
  const builder = paths.find(path => path.id === 'builder');
  assert.deepEqual(builder.sequence, ['choose-model', 'codex-web', 'codex-iterate', 'website-check']);
  assert.equal(readingContext('codex-web', 'builder').next.id, 'codex-iterate');
  assert.equal(readingContext('codex-iterate', 'builder').next.id, 'website-check');
  for (const path of paths) for (const id of path.electives || []) assert.ok(lessonById[id] && !path.sequence.includes(id));
  const state = normalizeLearning({ ...emptyLearning(), completed: ['cursor-debug'], exercises: { 'cursor-debug': [0, 1, 2] } });
  assert.ok(state.completed.includes('cursor-debug'));
  assert.equal(getPathProgress(builder, state).done, 0);
  for (const stage of projectStages['personal-page']) assert.notEqual(lessonById[stage.lesson].productId, 'cursor');
});

test('下载材料与正文一致，所有项目能进入自己的成果区', async () => {
  for (const [name, content] of Object.entries(resourceFiles)) {
    const file = await readFile(new URL('../public/practice/' + name, import.meta.url), 'utf8');
    assert.equal(file.replace(/^\uFEFF/u, '').trim(), content.trim(), name);
  }
  for (const resources of Object.values(projectResources)) {
    assert.ok(lessonById[resources.lesson].resultSaving);
    assert.ok(paths.find(path => path.id === resources.path).sequence.includes(resources.lesson));
  }
  for (const lesson of lessons.filter(item => item.resultSaving)) {
    const index = lesson.sections.findIndex(section => section.resultEditor);
    assert.ok(index >= 0, lesson.id);
    assert.equal(new URLSearchParams(resultHref(lesson).split('?')[1]).get('section'), 'section-' + index);
    assert.ok(practiceResultText(lesson, '本次核对记录').includes(lesson.resultSaving.material));
  }
  const source = await readFile(new URL('../public/tutorials/codex-web/official-entry-source.txt', import.meta.url));
  assert.equal(createHash('sha256').update(source).digest('hex'), registry.sources['chatgpt-app'].contentSha256);
  assert.match(source.toString(), /In Codex, start with New chat/);
});

test('多份成果彼此独立，导入和刷新保留内容，填写不会自动完成课程', () => {
  let state = emptyLearning();
  for (const id of ['doubao-notice', 'research-first', 'workflow-basics', 'website-check', 'api-output-check']) state = updateLearning(state, { type: 'draft', id, text: '我的记录：' + id });
  assert.equal(Object.keys(state.drafts).length, 5);
  const restored = normalizeLearning(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored.drafts, state.drafts);
  assert.deepEqual(restored.completed, []);
  state = updateLearning(state, { type: 'draft', id: 'research-first', text: '' });
  assert.equal(Object.keys(state.drafts).length, 4);
  assert.equal(state.drafts['doubao-notice'], '我的记录：doubao-notice');
});

test('业务JSON校验拒绝非法结构、缺字段、超长输入和多余字段', () => {
  assert.equal(validateTaskOutput(apiExamples.valid).valid, true);
  assert.match(validateTaskOutput(apiExamples.missing).errors.join(' '), /due/);
  for (const text of ['', 'null', '[]', '{}', '{bad', 'x'.repeat(12001), '{"tasks":[],"questions":[],"secret":"x"}', '{"tasks":[{"title":" ","owner":null,"due":null}],"questions":[]}', '{"tasks":[],"questions":[null]}']) assert.equal(validateTaskOutput(text).valid, false, text.slice(0, 80));
  const many = JSON.stringify({ tasks: Array.from({ length: 21 }, () => ({ title: 'a', owner: null, due: null })), questions: [] });
  assert.equal(validateTaskOutput(many).valid, false);
  assert.equal(validateTaskOutput(JSON.stringify({ tasks: [{ title: 'a'.repeat(201), owner: null, due: null }], questions: [] })).valid, false);
  assert.deepEqual(validateTaskOutput('{"tasks":[],"questions":[]}'), { valid: true, errors: [], taskCount: 0, questionCount: 0 });
});

test('结构校验不能把事实有误示例判为事实正确，参考答案标识保留', () => {
  assert.equal(validateTaskOutput(apiExamples.inaccurate).valid, true);
  assert.notEqual(JSON.parse(apiExamples.inaccurate).tasks[0].owner, '小林');
  const reference = lessonById['research-first'].sections.find(section => section.reference?.rows.some(row => row[0] === '10月12日14:30开始')).reference;
  assert.match(reference.label, /人工参考/);
  assert.equal(reference.rows.find(row => row[0] === '小林负责收集报名信息')[2], '截止日待确认');
  const weekly = lessonById['workflow-basics'];
  assert.match(weekly.sections.find(section => section.reference).reference.rows[0][2], /仍是12条/);
});
