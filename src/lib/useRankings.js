import { useEffect, useRef, useState } from 'react';
import { validateRankingSnapshot } from './rankings.js';

export function useRankings() {
  const [snapshot, setSnapshot] = useState(null);
  const [busy, setBusy] = useState('load');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(null);
  const request = useRef(null);
  const base = import.meta.env.BASE_URL;
  async function load() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setBusy('load'); setError('');
    try {
      const response = await fetch(base + 'data/rankings/current.json', { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error('尚未读到有效榜单快照，可以重新读取或更新来源。');
      const next = validateRankingSnapshot(await response.json());
      if (controller.signal.aborted) return;
      setSnapshot(next);
      const status = await fetch(base + 'data/rankings/status.json', { cache: 'no-store', signal: controller.signal }).then(r => r.ok ? r.json() : null).catch(() => null);
      if (controller.signal.aborted) return;
      setAttempt(status);
      if (status?.status === 'error') setError('最近一次更新未成功，正在显示上次有效快照。');
    } catch (failure) { if (!controller.signal.aborted) setError(failure instanceof SyntaxError ? '榜单文件无法解析，未显示无效数据。' : failure.message); }
    finally { if (!controller.signal.aborted) setBusy(''); }
  }
  async function refresh() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setBusy('refresh'); setError('');
    setAttempt({ status: 'pending', attemptedAt: new Date().toISOString() });
    try {
      const response = await fetch(base + 'api/model-rankings/refresh', { method: 'POST', signal: controller.signal });
      if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('当前站点没有提供更新服务，保留已有快照；维护者可运行榜单更新脚本。');
      const result = await response.json();
      if (controller.signal.aborted) return;
      if (result.refresh) setAttempt(result.refresh);
      if (!response.ok || result.refresh?.status !== 'ok') throw new Error(result.refresh?.message || result.error || '本次更新未成功，保留已有快照。');
      setSnapshot(validateRankingSnapshot(result.snapshot));
    } catch (failure) {
      if (!controller.signal.aborted) {
        setError(failure.message || '无法更新，保留上次有效快照。');
        setAttempt(current => ({ ...current, status: 'error' }));
      }
    }
    finally { if (!controller.signal.aborted) setBusy(''); }
  }
  useEffect(() => { load(); return () => request.current?.abort(); }, []);
  return { snapshot, busy, error, attempt, load, refresh };
}
