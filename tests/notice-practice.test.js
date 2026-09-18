import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessonById, paths } from '../src/data/index.js';
import { noticeMaterial, noticePrompt } from '../src/data/doubao-notice.js';
import { emptyLearning, normalizeLearning, updateLearning, getPathProgress } from '../src/lib/learning.js';
import { readingContext } from '../src/lib/discovery.js';
import { MAX_RESULT_LENGTH, practiceResultText } from '../src/lib/practice-files.js';
import registry from '../src/data/source-review.json' with { type: 'json' };

test('网页实操替代必修桌面课，旧桌面进度保留且不冒充网页完成', () => {
  const starter = paths.find(path => path.id === 'starter');
  assert.equal(readingContext('choose-tool', 'starter').next.id, 'doubao-notice');
  assert.equal(readingContext('doubao-notice', 'starter').next.id, 'research-first');
  assert.ok(starter.sequence.every(id => ['general', 'web'].includes(lessonById[id].platform)));
  let old = emptyLearning();
  for (const index of [0, 1, 2]) old = updateLearning(old, { type: 'exercise', id: 'doubao-work-start', index });
  old = updateLearning(old, { type: 'complete', id: 'doubao-work-start' });
  const migrated = normalizeLearning({ ...old, contexts: { 'doubao-work-start': 'starter' } });
  assert.ok(migrated.completed.includes('doubao-work-start'));
  assert.equal(getPathProgress(starter, migrated).done, 0);
  assert.equal(migrated.contexts['doubao-work-start'], undefined);
});

test('练习材料、截图与来源证据真实可读，人工答案不伪装成产品实测', async () => {
  const lesson = lessonById['doubao-notice'];
  const material = await readFile(new URL('../public/tutorials/doubao-notice/notice.txt', import.meta.url), 'utf8');
  assert.equal(material.replace(/^\uFEFF/u, '').trim(), noticeMaterial);
  assert.ok(noticePrompt.includes(noticeMaterial));
  for (const image of lesson.sections.flatMap(section => [section.screenshot, ...(section.walkthrough || []).map(step => step.screenshot)]).filter(Boolean)) {
    const bytes = await readFile(new URL('../public/' + image.src, import.meta.url));
    assert.equal(bytes.subarray(0, 3).toString('hex'), 'ffd8ff');
    assert.ok(bytes.length > 1024);
  }
  const reference = lesson.sections.find(section => section.reference).reference;
  assert.match(reference.label, /人工.*不是 AI 实测/);
  assert.equal(reference.rows.find(row => row[0] === '收集报名信息')[2], '待确认');
  const source = await readFile(new URL('../public/tutorials/doubao-notice/interface-source.txt', import.meta.url));
  assert.equal(createHash('sha256').update(source).digest('hex'), registry.sources['doubao-entry'].contentSha256);
  assert.equal(lesson.review.status, 'partial');
  assert.match(lesson.review.limit, /尚未实测/);
  assert.equal(lesson.edited, '2026-09-18');
});

test('成果草稿可恢复和清空，拒绝无效导入且不会自动标记课程完成', () => {
  const draft = '填写报名表｜参加者｜10月10日18:00前\n地点待确认。';
  const state = updateLearning(emptyLearning(), { type: 'draft', id: 'doubao-notice', text: draft });
  assert.equal(normalizeLearning(JSON.parse(JSON.stringify(state))).drafts['doubao-notice'], draft);
  assert.deepEqual(state.completed, []);
  assert.deepEqual(updateLearning(state, { type: 'complete', id: 'doubao-notice' }).completed, []);
  assert.equal(updateLearning(state, { type: 'draft', id: 'doubao-notice', text: 'x'.repeat(MAX_RESULT_LENGTH + 1) }).drafts['doubao-notice'], draft);
  assert.deepEqual(normalizeLearning({ ...state, drafts: { 'doubao-notice': ['not a string'], 'ai-first': '不可存入非练习课程', unknown: 'unknown' } }).drafts, {});
  assert.deepEqual(updateLearning(state, { type: 'draft', id: 'doubao-notice', text: '  ' }).drafts, {});
});

test('成果导出只使用读者输入，保留原文并拒绝空内容', () => {
  const lesson = lessonById['doubao-notice'];
  for (const invalid of ['', ' \n ', null, 'x'.repeat(MAX_RESULT_LENGTH + 1)]) assert.equal(practiceResultText(lesson, invalid), null);
  assert.equal(practiceResultText(lessonById['ai-first'], '结果'), null);
  const result = practiceResultText(lesson, '我的实际核对结果：地点待确认。');
  assert.ok(result.includes(noticeMaterial));
  assert.ok(result.includes('【我的整理结果】\n我的实际核对结果：地点待确认。'));
  assert.match(result, /没有自动验证/);
  assert.doesNotMatch(result, /已通过验证|实测通过/);
});
