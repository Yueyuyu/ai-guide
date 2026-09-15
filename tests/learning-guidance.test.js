import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, lessonById, paths } from '../src/data/index.js';
import { learningSetups, routeSetups } from '../src/data/learning-guidance.js';
import { ageInDays, reviewFreshness, correctionRecord } from '../src/lib/content-maintenance.js';
import { emptyLearning, normalizeLearning, updateLearning } from '../src/lib/learning.js';
import { checkPublicLink } from '../scripts/content-links.mjs';

test('HEAD失败需用GET确认，拒绝把403或网络失败说成链接失效', async () => {
  const methods = [];
  let cancelled = 0;
  const result = await checkPublicLink('https://example.test/help', { fetcher: async (url, options) => { methods.push(options.method || 'GET'); return { status: options.method === 'HEAD' ? 404 : 200, url, body: { cancel: async () => { cancelled++; } } }; } });
  assert.equal(result.status, 'reachable');
  assert.deepEqual(methods, ['HEAD', 'GET']);
  assert.equal(cancelled, 2);
  assert.equal((await checkPublicLink('https://example.test/', { fetcher: async () => ({ status: 403 }) })).status, 'manual-review');
  assert.equal((await checkPublicLink('https://example.test/', { fetcher: async () => { throw new Error('network'); } })).status, 'unverified');
  assert.equal((await checkPublicLink('https://example.test/', { fetcher: async () => ({ status: 410 }) })).status, 'missing');
});

test('资料过期以最早来源判断，新核对一份不会掩盖旧来源', () => {
  const now = '2026-09-15T00:00:00Z';
  assert.equal(ageInDays('2026-09-08T00:00:00Z', now), 7);
  assert.equal(ageInDays('2026-09-08T00:00:01Z', now), 6);
  assert.equal(ageInDays('invalid', now), null);
  assert.equal(ageInDays('2026-09-16T00:00:00Z', now), null);
  const review = { checkedAt: now, sources: [{ status: 'reviewed', reviewedAt: now }, { status: 'reviewed', reviewedAt: '2026-08-16T00:00:00Z' }] };
  assert.deepEqual(reviewFreshness(review, now), { age: 30, stale: true, interval: 30 });
  assert.equal(reviewFreshness({ checkedAt: now, sources: [] }, now).stale, false);
  assert.equal(reviewFreshness({ sources: [{ status: 'reviewed' }] }, now).age, null);
});

test('问题记录只包含当前课程与读者输入，不冒充已发送', () => {
  const lesson = lessonById['doubao-notice'];
  const data = { lesson, type: '步骤或按钮对不上', section: lesson.sections[2].title, description: '已登录，但发送后回首页。', now: '2026-09-15T06:00:00Z' };
  const text = correctionRecord(data);
  assert.ok(text.includes('#/learn/doubao-notice'));
  assert.ok(text.includes(lesson.sections[2].title));
  assert.match(text, /尚未发送/);
  for (const description of ['', ' \n ', null, 'x'.repeat(4001)]) assert.equal(correctionRecord({ ...data, description }), null);
  assert.equal(correctionRecord({ ...data, type: 'unknown' }), null);
  assert.match(correctionRecord({ ...data, section: 'unknown' }), /章节：整篇教程/);
});

test('准备、求助与成果入口对应真实课程，不改变旧章节位置或完成标记', () => {
  for (const path of paths) assert.ok(learningSetups[routeSetups[path.id]]);
  for (const lesson of lessons.filter(item => item.guide)) {
    for (const issue of lesson.guide.help) assert.ok(lesson.sections[issue.section], `${lesson.id}/${issue.id}`);
    assert.ok(lesson.sections.some(section => section.resultEditor));
    const state = updateLearning(emptyLearning(), { type: 'location', id: lesson.id, section: 'help' });
    assert.equal(normalizeLearning(state).locations[lesson.id], 'help');
    assert.deepEqual(state.completed, []);
  }
  assert.equal(lessonById['doubao-notice'].sections.findIndex(section => section.resultEditor), 5);
  assert.equal(lessonById['codex-web'].sections.findIndex(section => section.resultEditor), 4);
  assert.equal(normalizeLearning({ ...emptyLearning(), locations: { 'ai-first': 'help' } }).locations['ai-first'], undefined);
});
