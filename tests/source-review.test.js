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
    assert.equal(review.status === 'practice', !lesson.productId, lesson.id);
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
