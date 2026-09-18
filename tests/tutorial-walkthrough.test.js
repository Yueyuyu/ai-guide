import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessons } from '../src/data/index.js';
import { weeklyMaterial } from '../src/data/practice-resources.js';
import { renderReadingPage, escapeHtml } from '../server/reading-pages.js';
import { artifactPreviews, renderArtifactPreview } from '../server/artifact-pages.js';
import captures from '../public/tutorials/live-20260916/images.json' with { type: 'json' };
import evidence from '../public/tutorials/live-20260916/evidence.json' with { type: 'json' };
import doubaoCaptures from '../public/tutorials/doubao-live-20260918/images.json' with { type: 'json' };
import frontendCaptures from '../src/data/tutorial-images.json' with { type: 'json' };

const publicFile = path => readFile(new URL('../public/' + path, import.meta.url));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

test('前端截图索引与公开证据完全对应，避免开发模式直接导入 public', () => {
  assert.deepEqual(frontendCaptures, [...captures, ...doubaoCaptures], '修改截图清单后请运行 pnpm resources');
});

test('逐步图文有操作和完成标准，无脚本阅读包含所有步骤而非只第一步', () => {
  let count = 0;
  for (const lesson of lessons) {
    const html = renderReadingPage(lesson.id);
    for (const section of lesson.sections.filter(item => item.walkthrough)) {
      assert.ok(section.walkthrough.length > 0);
      assert.equal(section.visual, undefined, '不重复显示旧图解');
      assert.equal(section.actionSteps, undefined, '操作与图片一一对应');
      for (const step of section.walkthrough) {
        count++;
        assert.ok(step.title && step.action && step.checkpoint && step.screenshot?.src, lesson.id);
        for (const text of [step.title, step.action, step.checkpoint, step.screenshot.caption]) assert.ok(html.includes(escapeHtml(text)), lesson.id + ': ' + text);
        assert.ok(html.includes('../' + step.screenshot.src));
        for (const marker of step.screenshot.markers || []) assert.ok(marker.x >= 0 && marker.x <= 100 && marker.y >= 0 && marker.y <= 100);
        const focus = step.screenshot.focus;
        if (focus) {
          assert.ok(focus.x >= 0 && focus.y >= 0 && focus.width > 0 && focus.height > 0);
          assert.ok(focus.x + focus.width <= 100 && focus.y + focus.height <= 100);
          assert.ok(html.includes('操作区域放大 · 点击看完整原图'));
        }
      }
    }
  }
  assert.ok(count > 15);
});

test('本轮截图和产物与来源登记字节一致，每张图片实际用于教程', async () => {
  const images = lessons.flatMap(lesson => lesson.sections.flatMap(section => [section.screenshot, ...(section.walkthrough || []).map(step => step.screenshot)])).filter(Boolean);
  for (const capture of captures) {
    const bytes = await publicFile(capture.src);
    assert.equal(hash(bytes), capture.sha256, capture.src);
    assert.equal(bytes.length, capture.bytes);
    assert.equal(bytes.subarray(0, 3).toString('hex'), 'ffd8ff');
    assert.ok(capture.width > 0 && capture.height > 0 && capture.capturedOn);
    assert.ok(images.some(image => image.src === capture.src));
  }
  for (const result of [evidence.workbuddy, evidence.codex]) for (const file of result.files) {
    const bytes = await publicFile(file.path);
    assert.equal(hash(bytes), file.sha256);
    assert.equal(bytes.length, file.bytes);
  }
  const original = (await publicFile('practice/workbuddy-session/weekly-records.txt')).toString('utf8');
  assert.equal(original.replace(/\r\n/g, '\n').trimEnd(), weeklyMaterial);
});

test('网页局部修改仅增加指定标签及其样式，其他内容保持一致', async () => {
  const before = (await publicFile('practice/codex-session/index-before-tags.html')).toString('utf8');
  const after = (await publicFile('practice/codex-session/index.html')).toString('utf8');
  assert.deepEqual([...after.matchAll(/<span class="project-tag">(.*?)<\/span>/g)].map(match => match[1]), ['阅读', '计划', '记录']);
  assert.equal(after.replace(/<span class="project-tag">.*?<\/span>/g, '').replace(/<style>\.project-tag\{[^}]*\}<\/style>\r?\n/, ''), before);
  assert.doesNotMatch(after, /<script|<link[^>]+stylesheet|<img|https?:\/\//i, '交付网页无需外部依赖');
});

test('真实产物对照逐字来自公开文件，独立阅读保留所有摘录与来源', async () => {
  for (const lesson of lessons) for (const section of lesson.sections.filter(item => item.comparison)) {
    const comparison = section.comparison;
    const html = renderReadingPage(lesson.id);
    for (const item of comparison.items) {
      assert.ok(html.includes(escapeHtml(item.takeaway)));
      assert.equal(item.versions.length, 3);
      for (const version of item.versions) {
        const original = (await publicFile(version.href)).toString('utf8');
        for (const excerpt of version.excerpts) {
          assert.ok(original.includes(excerpt), version.href + ': ' + excerpt);
          assert.ok(html.includes(escapeHtml(excerpt)));
        }
        assert.ok(html.includes('href="../' + version.href + '.html"'));
      }
    }
  }
  const workbuddy = lessons.find(item => item.id === 'workbuddy-first');
  assert.equal(workbuddy.sections.length, 6);
  assert.equal(workbuddy.sections.findIndex(section => section.resultEditor), 5);
});

test('完整产物预览声明 UTF-8，保留原文件全文，只生成登记过的公开文件', async () => {
  assert.equal(artifactPreviews.size, 6);
  for (const [path, artifact] of artifactPreviews) {
    const text = (await publicFile(artifact.href)).toString('utf8');
    const html = await renderArtifactPreview(path);
    assert.ok(html.includes('<meta charset="UTF-8">'));
    assert.ok(html.includes('<pre>' + escapeHtml(text) + '</pre>'));
    const root = '../'.repeat(artifact.href.split('/').length - 1);
    assert.ok(html.includes('href="' + root + '#/learn/' + artifact.lessonId + '?section=section-' + artifact.section + '"'));
    assert.ok(html.includes('download="' + artifact.href.split('/').pop() + '"'));
    assert.doesNotMatch(html, /<script\b/);
  }
  assert.equal(await renderArtifactPreview('../../package.json'), null);
  assert.equal(await renderArtifactPreview('practice/missing.txt.html'), null);
});
