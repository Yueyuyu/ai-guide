export const rankingCounts = ['10', '20', 'all'];
export const resolveRankingCount = value => rankingCounts.includes(value) ? value : 'all';

export function rankingChartScale(metric) {
  // 刻度由完整指标决定，切换前 10 / 20 名不会重新拉伸柱子。
  const maximum = metric.unit === '%' ? 100 : Math.max(10, Math.ceil(Math.max(...metric.rows.map(row => row.score)) / 10) * 10);
  const step = metric.unit === '%' ? 25 : maximum <= 20 ? maximum / 4 : maximum % 20 === 0 ? 20 : 10;
  const ticks = Array.from({ length: Math.round(maximum / step) + 1 }, (_, index) => index * step);
  return { maximum, ticks };
}

export function visibleRankingRows(rows, count) {
  const resolved = resolveRankingCount(count);
  // 第 10 / 20 名若有并列，保留该名次的全部配置。
  return resolved === 'all' ? rows : rows.filter(row => row.rank <= Number(resolved));
}
