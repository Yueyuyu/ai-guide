import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessonById } from '../src/data/index.js';
import { noticeMaterial, noticePrompt, noticeFollowup } from '../src/data/doubao-notice.js';
import registry from '../src/data/source-review.json' with { type: 'json' };
import captures from '../public/tutorials/doubao-live-20260918/images.json' with { type: 'json' };
import evidence from '../public/tutorials/doubao-live-20260918/evidence.json' with { type: 'json' };

const publicFile = path => readFile(new URL('../public/' + path, import.meta.url));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const normalize = text => text.replace(/\r\n/g, '\n').trim();

test('豆包真实截图和文本保持证据字节，图片尺寸与 JPEG 实际尺寸一致', async () => {
  const lesson = lessonById['doubao-notice'];
  const used = lesson.sections.flatMap(section => (section.walkthrough || []).map(step => step.screenshot.src));
  for (const capture of captures) {
    const bytes = await publicFile(capture.src);
    assert.equal(hash(bytes), capture.sha256);
    assert.equal(bytes.length, capture.bytes);
    assert.ok(used.includes(capture.src));
    let found = false;
    for (let offset = 2; offset < bytes.length;) {
      const marker = bytes.readUInt16BE(offset); offset += 2;
      const size = bytes.readUInt16BE(offset);
      if ([0xffc0, 0xffc1, 0xffc2].includes(marker)) {
        assert.equal(capture.width, bytes.readUInt16BE(offset + 5));
        assert.equal(capture.height, bytes.readUInt16BE(offset + 3));
        found = true; break;
      }
      offset += size;
    }
    assert.ok(found, capture.src);
  }
  for (const file of evidence.files) {
    const bytes = await publicFile(file.path);
    assert.equal(bytes.length, file.bytes);
    assert.equal(hash(bytes), file.sha256);
  }
  const answer = await publicFile(registry.sources['doubao-practice'].contentPath);
  assert.equal(hash(answer), registry.sources['doubao-practice'].contentSha256);
});

test('教程提示词与实际输入一致，实际下载包含原通知和完整真实修正版', async () => {
  const read = async file => (await publicFile('practice/doubao-session/' + file)).toString('utf8');
  assert.equal(normalize(await read('prompt.txt')), normalize(noticePrompt));
  assert.equal(normalize(await read('followup.txt')), normalize(noticeFollowup));
  const saved = await read('saved-result.txt');
  assert.equal(saved.charCodeAt(0), 0xfeff);
  assert.ok(normalize(saved).includes(normalize(noticeMaterial)));
  assert.ok(normalize(saved).includes(normalize(await read('revised-answer.txt'))));
  assert.match(await read('first-answer.txt'), /参加读书会，填写报名表/);
  assert.match(await read('revised-answer.txt'), /时间：10月12日14:00/);
  const lesson = lessonById['doubao-notice'];
  assert.equal(lesson.sections.length, 7);
  assert.equal(lesson.sections.findIndex(section => section.resultEditor), 5);
  assert.ok(lesson.review.sourceIds.includes('doubao-practice'));
  assert.match(lesson.review.limit, /系统记事本.*真实手机.*尚未实测/);
});
