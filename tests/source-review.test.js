import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { lessons, tools } from '../src/data/index.js';
import registry from '../src/data/source-review.json' with { type: 'json' };
import brands from '../src/data/ranking-brands.json' with { type: 'json' };

test('每个产品和教程都有明确核对范围，入口参考不能冒充已核对正文', () => {
  assert.deepEqual(new Set(Object.keys(registry.products)), new Set(tools.map(t => t.id)));
  for (const lesson of lessons) {
    const review = lesson.review;
    assert.ok(review.scope && review.limit && Number.isFinite(Date.parse(review.checkedAt)), lesson.id);
    assert.equal(review.status === 'practice', !lesson.productId && !registry.lessons?.[lesson.id], lesson.id);
    if (review.status === 'documented') assert.ok(review.sources.length && review.sources.every(s => s.status === 'reviewed'), lesson.id);
    for (const source of review.sources) {
      assert.ok(source && source.url.startsWith('https://'), lesson.id);
      if (source.status === 'reviewed') {
        assert.match(source.contentSha256, /^[a-f0-9]{64}$/);
        assert.ok(Date.parse(source.retrievedAt) <= Date.parse(review.checkedAt));
      }
    }
  }
});

test('榜单品牌资产与所记录的来源文件一致，使用原始文件而非主题重绘', async () => {
  for (const [creator, asset] of Object.entries(brands)) {
    assert.match(asset.sourceUrl, /^https:\/\/artificialanalysis.ai\/img\/logos\//, creator);
    const file = await readFile(new URL('../public/brands/rankings/' + asset.file, import.meta.url));
    assert.equal(createHash('sha256').update(file).digest('hex'), asset.sha256, creator);
  }
});

test('WorkBuddy 教学截图保留官方原图、尺寸与来源哈希，不冒充练习产物', async () => {
  const manifest = JSON.parse(await readFile(new URL('../public/tutorials/workbuddy-first/images.json', import.meta.url), 'utf8'));
  const lesson = lessons.find(item => item.id === 'workbuddy-first');
  const screenshots = lesson.sections.filter(section => section.screenshot).map(section => section.screenshot);
  assert.equal(screenshots.length, manifest.length);
  for (const item of manifest) {
    const bytes = await readFile(new URL('../public/tutorials/workbuddy-first/' + item.file, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    const screenshot = screenshots.find(image => image.src.endsWith('/' + item.file));
    assert.equal(bytes.readUInt32BE(16), screenshot.width);
    assert.equal(bytes.readUInt32BE(20), screenshot.height);
    assert.equal(screenshot.sourceUrl, item.pageUrl);
    assert.match(screenshot.caption, /官方.*非本课实测/u);
  }
  const source = registry.sources['workbuddy-task-bar'];
  const bytes = await readFile(new URL('../public/' + source.contentFile, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), source.contentSha256);
  assert.equal(source.sourceUpdatedAt, null);
  assert.match(lesson.review.limit, /尚未.*实测/u);
});
