import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessonById } from '../src/data/index.js';
import { renderReadingPage, escapeHtml } from '../server/reading-pages.js';
import { personalBrief } from '../src/data/practice-resources.js';

test('主线保留旧章节与草稿位置，折叠预览不会丢失完整任务', () => {
  const expected = { 'network-prepare': [9, 7], 'codex-web': [5, 4], 'codex-iterate': [4, 3], 'website-check': [5, 4], 'workbuddy-first': [6, 5], 'doubao-notice': [7, 5] };
  for (const [id, [count, editor]] of Object.entries(expected)) {
    const lesson = lessonById[id];
    assert.equal(lesson.sections.length, count, id);
    assert.equal(lesson.sections.findIndex(section => section.resultEditor), editor, id);
  }
  const lesson = lessonById['codex-web'];
  const task = lesson.sections[2];
  assert.ok(task.promptPreview);
  assert.ok(task.prompt.includes(personalBrief));
  assert.equal(lesson.sections.filter(section => section.prompt?.includes(personalBrief)).length, 1);
  const html = renderReadingPage('codex-web');
  assert.ok(html.includes(escapeHtml(task.prompt)));
  assert.ok(html.includes('<summary>展开完整内容</summary>'));
  assert.ok(html.includes('id="section-2"'));
});

test('独立阅读保留图解与全部命令，示意不会冒充账号内运行结果', () => {
  for (const lesson of Object.values(lessonById)) {
    const html = renderReadingPage(lesson.id);
    for (const section of lesson.sections) {
      if (!section.visual) continue;
      const visual = section.visual;
      assert.ok(html.includes(escapeHtml(visual.title)), lesson.id);
      assert.ok(html.includes(escapeHtml(visual.label || '步骤图解 · 非软件截图')));
      for (const item of visual.items) {
        assert.ok(html.includes(escapeHtml(item.title)), lesson.id);
        if (item.code) assert.ok(html.includes('<code>' + escapeHtml(item.code) + '</code>'));
      }
    }
  }
  const qwen = renderReadingPage('qwen-structured');
  const section = lessonById['qwen-structured'].sections[2];
  assert.ok(qwen.includes(escapeHtml(section.prompt)));
  assert.ok(qwen.includes(escapeHtml(section.code)), '有提示词的章节也应保留 JSON 输出示例');
});

test('新增官方图原样本地托管，文件哈希和文中来源一致', async () => {
  const entries = JSON.parse(await readFile(new URL('../public/tutorials/visual-guide/images.json', import.meta.url)));
  for (const item of entries) {
    const bytes = await readFile(new URL('../public/tutorials/visual-guide/' + item.file, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256, item.file);
    assert.equal(bytes.length, item.bytes);
    const images = Object.values(lessonById).flatMap(lesson => lesson.sections.flatMap(s => [s.screenshot, ...(s.walkthrough || []).map(step => step.screenshot)]).filter(Boolean)).filter(image => image.src === 'tutorials/visual-guide/' + item.file);
    assert.ok(images.length > 0, item.file);
    for (const image of images) {
      assert.equal(image.sourceUrl, item.pageUrl);
      assert.equal(image.width, item.width);
      assert.equal(image.height, item.height);
      assert.match(image.caption, /非本课实测/u);
    }
  }
});
