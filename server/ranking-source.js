import { createHash } from 'node:crypto';
import { rankRows, validateRankingSnapshot } from '../src/lib/rankings.js';

export const SOURCE_URL = 'https://artificialanalysis.ai/leaderboards/models';
const METHOD_URL = 'https://artificialanalysis.ai/methodology/intelligence-benchmarking';

export function parseArtificialAnalysis(html, retrievedAt) {
  if (typeof html !== 'string' || html.length > 12_000_000 || !html.includes('Artificial Analysis')) throw new Error('来源未返回有效榜单页面');
  // 只解码公开页面的 JSON 载荷，不执行来源提供的脚本。
  const flight = [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)].map(match => JSON.parse(match[1])).join('');
  const tables = [];
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value) && value[0] && typeof value[0] === 'object' && Object.hasOwn(value[0], 'intelligenceIndex')) { tables.push(value); return; }
    for (const child of Object.values(value)) if (typeof child === 'object') visit(child);
  }
  for (const line of flight.split('\n')) {
    const payload = line.slice(line.indexOf(':') + 1);
    let value;
    try { value = JSON.parse(payload); } catch { continue; }
    visit(value);
  }
  if (tables.length !== 1 || tables[0].length < 10) throw new Error('榜单结构发生变化，保留上次有效数据');
  const version = flight.match(/Intelligence Index v(\d+\.\d+)/)?.[1];
  if (version !== '4.3') throw new Error('评测版本发生变化，需要核对新方法后更新');
  const ids = new Set();
  for (const row of tables[0]) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(row.slug) || ids.has(row.slug) || typeof row.deprecated !== 'boolean') throw new Error('来源存在重复或不完整模型条目');
    ids.add(row.slug);
  }
  const active = tables[0].filter(row => row.deprecated === false);
  const toRow = (row, score) => ({ id: row.slug, name: row.name, shortName: row.shortName || row.name, creator: row.modelCreatorName, score, sourceUrl: 'https://artificialanalysis.ai/models/' + row.slug });
  const intelligence = active.filter(row => row.intelligenceIndexIsEstimated === false && Number.isFinite(row.intelligenceIndex)).map(row => toRow(row, row.intelligenceIndex));
  const coding = active.filter(row => Number.isFinite(row.terminalbenchV40)).map(row => toRow(row, row.terminalbenchV40 * 100));
  if (intelligence.length < 10 || coding.length < 5) throw new Error('来源有效评测不足，拒绝替换已有快照');
  return validateRankingSnapshot({
    schemaVersion: 1, sourceId: 'aa', sourceUrl: SOURCE_URL, sourceHash: createHash('sha256').update(html).digest('hex'), retrievedAt,
    sourceUpdatedAt: null, sourceDateNote: '该公开页面未披露统一的评测更新日期；本站获取时间只代表这份快照的时间。模型发布日期不作为评测日期。',
    selection: '仅含来源标为未停用且有该项数值的模型配置；综合榜排除估算分。按来源原始精度降序排序，完全同分并列。',
    metrics: [
      { id: 'intelligence', name: 'Artificial Analysis Intelligence Index v4.3', unit: '分', methodologyUrl: METHOD_URL, description: '以英文文本任务为主的综合评测，涵盖智能体、编程、科学推理和通用能力；不代表中文、图像或视频表现。', rows: rankRows(intelligence) },
      { id: 'coding', name: 'Terminal-Bench v4.0 · Artificial Analysis', unit: '%', methodologyUrl: METHOD_URL + '#intelligence-index-evaluation-suite', description: '终端任务通过率（pass@1），按来源公开的 Terminal-Bench v4.0 数值排序；不能替代所有编程场景的体验。', rows: rankRows(coding) },
    ],
  });
}

export async function fetchRankings(fetcher = fetch) {
  const response = await fetcher(SOURCE_URL, { signal: AbortSignal.timeout(25000), headers: { Accept: 'text/html', 'User-Agent': 'AIGuide/0.1 (+public leaderboard attribution)' } });
  if (!response.ok) throw new Error('评测来源暂时无法读取（HTTP ' + response.status + '）');
  if (response.url && new URL(response.url).hostname !== 'artificialanalysis.ai') throw new Error('来源跳转到未预期页面');
  if (Number(response.headers.get('content-length')) > 12_000_000) throw new Error('来源页面超过大小限制');
  let html = '', bytes = 0;
  const decoder = new TextDecoder();
  for await (const chunk of response.body) {
    bytes += chunk.length;
    if (bytes > 12_000_000) throw new Error('来源页面超过大小限制');
    html += decoder.decode(chunk, { stream: true });
  }
  html += decoder.decode();
  return parseArtificialAnalysis(html, new Date().toISOString());
}
