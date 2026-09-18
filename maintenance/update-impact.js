import { fingerprint, sourceIdentity } from './update-source.js';

export function validateWatchlist(sources, lessonById) {
  const seen = new Set();
  for (const source of sources) {
    if (!/^[a-z][a-z0-9-]+$/u.test(source.id) || seen.has(source.id)) throw new Error('重复或无效的来源 ID');
    seen.add(source.id);
    const url = new URL(source.url);
    if (url.protocol !== 'https:' || url.username || url.password || url.search) throw new Error(source.id + ' 需要无凭据、无查询参数的官方地址');
    if (!['html', 'markdown', 'github-release'].includes(source.format) || !source.steps.length || source.minChars < 1) throw new Error(source.id + ' 配置不完整');
    for (const step of source.steps) {
      if (!Number.isInteger(step.section) || !lessonById[step.lessonId]?.sections[step.section] || !step.keywords.length) throw new Error(source.id + ' 关联了无效章节');
    }
  }
}
export function compareText(before, after) {
  const oldLines = new Set(before.split('\n')), newLines = new Set(after.split('\n'));
  return { removed: [...oldLines].filter(line => !newLines.has(line)), added: [...newLines].filter(line => !oldLines.has(line)) };
}
export function assessImpact(source, before, after) {
  const diff = compareText(before, after);
  const changed = [...diff.added, ...diff.removed].join('\n').toLowerCase();
  const matched = source.steps.filter(step => step.keywords.some(word => changed.includes(word.toLowerCase())));
  return {
    kind: matched.length ? 'step-review' : 'scope-review',
    suggestedSteps: matched.length ? matched : source.steps,
    possibleSteps: source.steps,
    reason: matched.length ? '变化文字与这些步骤的关键词相关，需核对含义后决定是否修改。' : '无法自动定位；先检查关联范围，不能据此判断所有步骤都要重拍。',
    diff: { added: diff.added.slice(0, 15).map(line => line.slice(0, 900)), removed: diff.removed.slice(0, 15).map(line => line.slice(0, 900)), addedCount: diff.added.length, removedCount: diff.removed.length },
  };
}
export async function inspectUpdates(sources, state, { fetchSource, now = new Date().toISOString() }) {
  const next = structuredClone(state);
  const results = [];
  for (const source of sources) {
    const previous = next.sources[source.id] || {};
    const identity = sourceIdentity(source);
    let result;
    try {
      const { text, finalUrl } = await fetchSource(source);
      const current = { text, fingerprint: fingerprint(text), observedAt: now, finalUrl };
      if (previous.baseline && previous.identity !== identity) {
        // 提取规则或地址变了，不能将一次重新抓取冒充课程内容变化。
        next.sources[source.id] = { ...previous, lastCheckedAt: now, failures: (previous.failures || 0) + 1, lastStatus: 'unverified' };
        result = { id: source.id, status: 'unverified', reason: '地址或提取规则已变，请保留旧记录并建立独立的新来源 ID。' };
      } else if (!previous.baseline) {
        next.sources[source.id] = { identity, baseline: current, lastCheckedAt: now, failures: 0, lastStatus: 'baseline-created' };
        result = { id: source.id, status: 'baseline-created', reason: '首次建立技术比较基线，尚不能判断此前是否变化，也不代表教程已验证。' };
      } else if (previous.baseline.fingerprint === current.fingerprint) {
        next.sources[source.id] = { ...previous, candidate: null, lastCheckedAt: now, failures: 0, lastStatus: 'unchanged' };
        result = { id: source.id, status: 'unchanged', reason: '本次可读正文与比较基线一致；不证明账号内界面没有变化。' };
      } else {
        next.sources[source.id] = { ...previous, candidate: current, lastCheckedAt: now, failures: 0, lastStatus: 'changed' };
        result = { id: source.id, status: 'changed', fingerprint: current.fingerprint, ...assessImpact(source, previous.baseline.text, text) };
      }
    } catch (error) {
      next.sources[source.id] = { ...previous, failures: (previous.failures || 0) + 1, lastCheckedAt: now, lastStatus: 'unverified' };
      result = { id: source.id, status: 'unverified', reason: error.message === 'fetch failed' ? '网络连接未完成，保留上次有效记录。' : error.message };
    }
    result.title = source.title;
    result.url = source.url;
    result.failures = next.sources[source.id].failures;
    result.pendingCandidate = Boolean(next.sources[source.id].candidate);
    // 变化未处理时每周仍列入报告，但同一候选和同一连续故障不反复提醒。
    result.notify = result.status === 'changed' ? previous.candidate?.fingerprint !== result.fingerprint || (previous.failures || 0) >= 3
      : result.status === 'unverified' ? result.failures === 3
      : (previous.failures || 0) >= 3 || (result.status === 'unchanged' && Boolean(previous.candidate));
    results.push(result);
  }
  return { state: next, report: { schemaVersion: 1, checkedAt: now, results } };
}

export const decisions = ['no-impact', 'text-updated', 'images-updated', 'flow-updated'];
export function resolveUpdate(state, source, { expected, decision, note, steps = [], evidence = [], now = new Date().toISOString() }) {
  const pending = state.sources[source.id];
  if (!pending?.candidate || pending.lastStatus !== 'changed') throw new Error('没有可核对的最新变化；失败状态不能验收');
  if (pending.identity !== sourceIdentity(source)) throw new Error('来源配置已改变，请先重新检查');
  if (!expected || expected !== pending.candidate.fingerprint) throw new Error('报告已变化或未提供完整指纹，请重新核对');
  if (!decisions.includes(decision) || !note?.trim() || note.trim().length < 8) throw new Error('需要有效结论和具体核对说明');
  const allowed = new Set(source.steps.map(step => step.lessonId + ':section-' + step.section));
  if (steps.some(step => !allowed.has(step)) || new Set(steps).size !== steps.length) throw new Error('修改范围超出登记章节或存在重复');
  if (decision === 'no-impact' && steps.length) throw new Error('无需修改不能登记已修改章节');
  if (decision !== 'no-impact' && (!steps.length || !evidence.length)) throw new Error('已修改结论必须登记章节和证据文件');
  const next = structuredClone(state);
  next.reviews.push({ sourceId: source.id, fingerprint: expected, decision, note: note.trim(), steps, evidence, reviewedAt: now, previousFingerprint: pending.baseline.fingerprint });
  next.sources[source.id] = { ...pending, baseline: pending.candidate, candidate: null, lastStatus: 'reviewed', reviewedAt: now };
  return next;
}
