import test from 'node:test';
import assert from 'node:assert/strict';
import { rankingChartScale, visibleRankingRows, resolveRankingCount } from '../src/lib/ranking-chart.js';

test('图表刻度从零覆盖完整分数，百分比使用固定尺度，保留原始精度', () => {
  const metric = { unit: '分', rows: [{ rank: 1, score: 53.3737509623252 }, { rank: 2, score: 53.1840337538944 }, { rank: 21, score: 0 }] };
  const before = structuredClone(metric);
  const scale = rankingChartScale(metric);
  assert.equal(scale.ticks[0], 0);
  assert.equal(scale.maximum, 60);
  assert.equal(scale.ticks.at(-1), scale.maximum);
  assert.equal(rankingChartScale({ ...metric, unit: '%' }).maximum, 100);
  assert.ok(rankingChartScale({ unit: '分', rows: [{ rank: 1, score: 0 }] }).maximum > 0);
  assert.equal(visibleRankingRows(metric.rows, '10')[0].score, metric.rows[0].score);
  assert.deepEqual(metric, before);
});

test('前10名保留边界并列，全部保留完整榜单，非法URL范围恢复默认', () => {
  const rows = [{ rank: 1 }, { rank: 10 }, { rank: 10 }, { rank: 12 }, { rank: 20 }, { rank: 21 }];
  assert.deepEqual(visibleRankingRows(rows, '10').map(row => row.rank), [1, 10, 10]);
  assert.equal(visibleRankingRows(rows, '20').length, 5);
  assert.equal(visibleRankingRows(rows, 'all').length, 6);
  for (const value of [null, '-1', '1000000', 'NaN', 'ALL']) assert.equal(resolveRankingCount(value), 'all');
});
