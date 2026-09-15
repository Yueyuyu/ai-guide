export const rankingSources = [
  { id: 'aa', name: 'Artificial Analysis', url: 'https://artificialanalysis.ai/leaderboards/models' },
  { id: 'arena', name: 'Arena', url: 'https://arena.ai/leaderboard/text' },
];

export const rankingPurposes = [
  { id: 'intelligence', title: '综合能力', legacy: '综合能力' },
  { id: 'coding', title: '编程', legacy: '编程' },
  { id: 'chinese', title: '中文表达', legacy: '中文表达' },
  { id: 'image', title: '图像', legacy: '图像' },
  { id: 'video', title: '视频', legacy: '视频' },
];

export const resolvePurpose = value => rankingPurposes.find(p => p.id === value || p.legacy === value)?.id || 'intelligence';
const validTime = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
export const dateTime = value => value == null ? '来源未披露' : validTime(value) ? new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Shanghai' }).format(new Date(value)) : '日期无效';

// 在下载和浏览器两端校验，拒绝把错误页、空值或重复条目当作有效榜单。
export function validateRankingSnapshot(value) {
  if (value?.schemaVersion !== 1 || value.sourceId !== 'aa' || !validTime(value.retrievedAt) || !Array.isArray(value.metrics) || !value.metrics.length || value.sourceUrl !== rankingSources[0].url || !/^[a-f0-9]{64}$/.test(value.sourceHash || '')) throw new Error('榜单文件格式不正确');
  if (value.sourceUpdatedAt !== null && !validTime(value.sourceUpdatedAt)) throw new Error('评测日期格式不正确');
  if (typeof value.selection !== 'string' || typeof value.sourceDateNote !== 'string') throw new Error('缺少筛选与日期说明');
  const metricIds = new Set();
  for (const metric of value.metrics) {
    if (!['intelligence', 'coding'].includes(metric.id) || metricIds.has(metric.id) || typeof metric.name !== 'string' || typeof metric.description !== 'string' || !metric.methodologyUrl?.startsWith('https://artificialanalysis.ai/methodology/') || metric.unit !== (metric.id === 'coding' ? '%' : '分') || !Array.isArray(metric.rows) || !metric.rows.length) throw new Error('榜单指标不完整');
    metricIds.add(metric.id);
    const ids = new Set();
    let previousScore = Infinity, previousRank = 0;
    metric.rows.forEach((row, index) => {
      if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(row.id) || ids.has(row.id) || typeof row.name !== 'string' || !row.name || typeof row.creator !== 'string' || !row.creator || !Number.isFinite(row.score) || row.score < 0 || row.score > 100 || row.score > previousScore || row.sourceUrl !== 'https://artificialanalysis.ai/models/' + row.id) throw new Error('模型条目不合法');
      const rank = row.score === previousScore ? previousRank : index + 1;
      if (row.rank !== rank) throw new Error('名次与分数不一致');
      ids.add(row.id); previousScore = row.score; previousRank = rank;
    });
  }
  return value;
}

export function rankRows(rows) {
  const sorted = [...rows].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  let rank = 0;
  return sorted.map((row, i) => {
    if (i === 0 || row.score !== sorted[i - 1].score) rank = i + 1;
    return { ...row, rank };
  });
}

export const familyByCreator = {
  OpenAI: 'gpt-models', Anthropic: 'claude-models', Google: 'gemini-models', DeepSeek: 'deepseek-models', Alibaba: 'qwen-models', 'Z AI': 'glm-models', 'Z.AI': 'glm-models', Kimi: 'kimi-models', Moonshot: 'kimi-models', MiniMax: 'minimax', 'ByteDance Seed': 'doubao-models', ByteDance: 'doubao-models', SpaceXAI: 'grok-models', xAI: 'grok-models',
};
