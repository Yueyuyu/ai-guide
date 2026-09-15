import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessons, lessonById, paths } from '../src/data/index.js';
import { emptyLearning, normalizeLearning, getPathProgress } from '../src/lib/learning.js';
import { feedbackRepository, publicIssueUrl, redactFeedback } from '../src/lib/public-feedback.js';
import { analyticsMarkup, analyticsPlugin } from '../server/analytics-plugin.js';

test('新增网络主线有可复核来源，不继承原有课程的完成进度', async () => {
  const lesson = lessonById['network-prepare'];
  assert.equal(lesson.review.status, 'documented');
  assert.match(lesson.review.limit, /尚未实测/);
  for (const source of lesson.review.sources) {
    const content = await readFile(new URL('../public/' + source.contentFile, import.meta.url));
    assert.equal(createHash('sha256').update(content).digest('hex'), source.contentSha256);
  }
  const old = normalizeLearning({ ...emptyLearning(), completed: ['ai-first', 'codex-web'] });
  assert.equal(getPathProgress(paths.find(path => path.id === 'network'), old).done, 0);
  assert.ok(lessons.some(item => item.id === 'network-prepare' && item.sections.some(section => section.resultEditor)));
});

test('公开反馈移除常见订阅链接与凭据，长正文走复制而不截断', () => {
  const input = '普通反馈\nhttps://subscription.example.test/sub?token=private-test\nvmess://private-config\nToken: hidden-test\nBearer private-test\nsk-demoKey\nme@example.test';
  const cleaned = redactFeedback(input);
  for (const secret of ['private-test', 'hidden-test', 'private-config', 'sk-demoKey', 'me@example.test']) assert.ok(!cleaned.includes(secret));
  assert.match(cleaned, /普通反馈/);
  const url = publicIssueUrl({ title: '[试用反馈] 测试 & 中文', body: input });
  const parsed = new URL(url);
  assert.equal(parsed.origin, 'https://github.com');
  assert.equal(parsed.searchParams.get('body'), cleaned);
  assert.equal(publicIssueUrl({ title: '长反馈', body: '中文'.repeat(4000) }), feedbackRepository + '/issues/new');
  assert.equal(publicIssueUrl({ title: '反馈', body: ' ' }), null);
});

test('访问统计默认关闭，配置仅接受公开站点 token，并覆盖阅读页', () => {
  assert.equal(analyticsMarkup(), '');
  for (const token of ['account-secret', '<script>', '1'.repeat(33)]) assert.throws(() => analyticsMarkup(token));
  const token = 'a'.repeat(32);
  assert.match(analyticsMarkup(token), /type="module" async/);
  assert.match(analyticsMarkup(token), /"spa":false/);
  const bundle = { 'index.html': { type: 'asset', fileName: 'index.html', source: '<body>互动版</body>' }, 'read/test.html': { type: 'asset', fileName: 'read/test.html', source: '<body>正文</body>' }, 'code.js': { type: 'chunk', code: 'unchanged' } };
  analyticsPlugin().generateBundle.handler({}, bundle);
  assert.doesNotMatch(bundle['index.html'].source, /script/);
  assert.throws(() => analyticsPlugin({ token, hostname: 'localhost' }).generateBundle.handler({}, bundle));
  analyticsPlugin({ token, hostname: 'example.test' }).generateBundle.handler({}, bundle);
  assert.match(bundle['index.html'].source, /beacon.min.js/);
  assert.match(bundle['read/test.html'].source, /beacon.min.js/);
  assert.equal(bundle['code.js'].code, 'unchanged');
});
