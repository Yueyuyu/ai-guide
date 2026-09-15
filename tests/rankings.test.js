import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, basename } from 'node:path';
import fixture from './fixtures/aa-sample.json' with { type: 'json' };
import { parseArtificialAnalysis, fetchRankings } from '../server/ranking-source.js';
import { refreshSnapshot, readSnapshot } from '../server/ranking-store.js';
import { rankRows, validateRankingSnapshot, dateTime } from '../src/lib/rankings.js';

async function cleanTestDirectory(directory) {
  const target = await realpath(directory);
  assert.equal(dirname(target), await realpath(tmpdir()));
  assert.ok(basename(target).startsWith('aiguide-ranking-'));
  await rm(target, { recursive: true, force: true });
}
const stamp = '2026-09-14T08:56:37.590Z';
const transport = (rows = fixture.rows, version = '4.3') => 'Artificial Analysis<script>self.__next_f.push([1,' + JSON.stringify('a:' + JSON.stringify({ title: 'Intelligence Index v' + version, rows }) + '\n') + '])</script>';
const snapshot = () => parseArtificialAnalysis(transport(), stamp);

test('公开载荷按指标独立筛选；估算、停用和空分不进入相应榜单', () => {
  const parsed = snapshot();
  const actual = parsed.metrics.find(m => m.id === 'intelligence').rows;
  const expected = fixture.rows.filter(r => !r.deprecated && r.intelligenceIndexIsEstimated === false && Number.isFinite(r.intelligenceIndex));
  assert.deepEqual(new Set(actual.map(r => r.id)), new Set(expected.map(r => r.slug)));
  const coding = parsed.metrics.find(m => m.id === 'coding').rows;
  for (const row of coding) assert.equal(row.score, fixture.rows.find(r => r.slug === row.id).terminalbenchV40 * 100);
  assert.equal(parsed.sourceUpdatedAt, null);
  assert.equal(parsed.retrievedAt, stamp);
  const zero = structuredClone(fixture.rows);
  Object.assign(zero[0], { intelligenceIndex: 0, terminalbenchV40: null });
  const zeroParsed = parseArtificialAnalysis(transport(zero), stamp);
  assert.equal(zeroParsed.metrics[0].rows.find(r => r.id === zero[0].slug).score, 0);
  assert.equal(zeroParsed.metrics[1].rows.some(r => r.id === zero[0].slug), false);
});

test('保留原始精度排序，只对真正同分并列，允许来源中的小数点模型 ID', () => {
  const rows = [{ id: 'a', score: 53.184 }, { id: 'b', score: 53.183 }, { id: 'c', score: 53.183 }, { id: 'd', score: 50 }];
  assert.deepEqual(rankRows(rows).map(r => r.rank), [1, 2, 2, 4]);
  const dotted = structuredClone(fixture.rows);
  dotted[0].slug = 'test-model.0';
  assert.ok(parseArtificialAnalysis(transport(dotted), stamp).metrics[0].rows.some(r => r.id === 'test-model.0'));
});

test('拒绝错误页、变化的评测版本、重复模型和过小数据集', () => {
  assert.throws(() => parseArtificialAnalysis('<html>Forbidden</html>', stamp));
  assert.throws(() => parseArtificialAnalysis(transport(fixture.rows, '5.0'), stamp), /评测版本/);
  assert.throws(() => parseArtificialAnalysis(transport([...fixture.rows, fixture.rows[0]]), stamp), /重复/);
  assert.throws(() => parseArtificialAnalysis(transport(fixture.rows.slice(0, 2)), stamp));
});

test('快照校验拒绝不合法的来源、日期、指标、分数及名次', () => {
  for (const mutate of [
    s => { s.retrievedAt = '2026-02-30T00:00:00.000Z'; },
    s => { s.sourceUpdatedAt = '2026-09-14'; },
    s => { s.sourceUrl = 'https://example.com/'; },
    s => { s.metrics[0].id = 'chinese'; },
    s => { s.metrics[0].unit = '%'; },
    s => { s.metrics[0].methodologyUrl = 'https://artificialanalysis.ai.evil.test/'; },
    s => { s.metrics[0].rows[0].score = null; },
    s => { s.metrics[0].rows[0].rank = 0; },
    s => { s.metrics[0].rows[0].sourceUrl = 'javascript:alert(1)'; },
  ]) { const value = snapshot(); mutate(value); assert.throws(() => validateRankingSnapshot(value)); }
  assert.equal(dateTime(null), '来源未披露');
  assert.equal(dateTime('bad-status-date'), '日期无效');
});

test('下载失败、非预期跳转与过大页面不会解析为有效快照', async () => {
  await assert.rejects(fetchRankings(async () => new Response('Forbidden', { status: 403 })), /HTTP 403/);
  await assert.rejects(fetchRankings(async () => ({ ok: true, url: 'https://example.com/' })), /跳转/);
  await assert.rejects(fetchRankings(async () => new Response('x', { headers: { 'content-length': '12000001' } })), /大小/);
  const result = await fetchRankings(async () => new Response(transport()));
  assert.equal(result.sourceUpdatedAt, null);
});

test('成功刷新保存历史；来源失败或数据无效时保留原快照的字节和日期', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'aiguide-ranking-test-'));
  try {
    const initial = snapshot();
    const success = await refreshSnapshot(directory, async () => initial);
    assert.equal(success.refresh.status, 'ok');
    const original = await readFile(join(directory, 'current.json'), 'utf8');
    assert.deepEqual(JSON.parse(await readFile(join(directory, 'history', stamp.replace(/[:.]/g, '-') + '.json'), 'utf8')), initial);
    const failed = await refreshSnapshot(directory, async () => { throw Error('HTTP 503'); });
    assert.equal(failed.refresh.status, 'error');
    assert.equal(failed.snapshot.retrievedAt, stamp);
    assert.equal(await readFile(join(directory, 'current.json'), 'utf8'), original);
    const invalid = await refreshSnapshot(directory, async () => ({ ...initial, metrics: [] }));
    assert.equal(invalid.refresh.status, 'error');
    assert.equal(await readFile(join(directory, 'current.json'), 'utf8'), original);
    assert.equal((await readSnapshot(directory)).retrievedAt, stamp);
    const updated = { ...initial, retrievedAt: '2026-09-14T09:25:00.097Z' };
    const second = await refreshSnapshot(directory, async () => updated);
    assert.equal(second.refresh.status, 'ok');
    assert.equal((await readSnapshot(directory)).retrievedAt, updated.retrievedAt);
  } finally { await cleanTestDirectory(directory); }
});

test('没有旧快照时刷新失败不会创造空榜单或成功日期', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'aiguide-ranking-empty-'));
  try {
    const result = await refreshSnapshot(directory, async () => { throw Error('offline'); });
    assert.equal(result.snapshot, null);
    assert.equal(result.refresh.status, 'error');
    await assert.rejects(readFile(join(directory, 'current.json')), { code: 'ENOENT' });
  } finally { await cleanTestDirectory(directory); }
});
