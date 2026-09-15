import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { readStoredLearning, normalizeLearning, STORAGE_KEY, updateLearning, parseRoute } from './learning.js';

const LearningContext = createContext(null);

export function LearningProvider({ children }) {
  const [storageError, setStorageError] = useState('');
  const [initial] = useState(() => readStoredLearning({ getItem: key => localStorage.getItem(key) }));
  const [blocked, setBlocked] = useState(initial.blocked);
  const [learning, setLearning] = useState(initial.learning);
  const [toast, setToast] = useState('');
  useEffect(() => {
    if (blocked) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(learning)); setStorageError(''); }
    catch { setStorageError('浏览器暂时无法保存进度。离开前可在“我的学习”导出记录。'); }
  }, [learning, blocked]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3500); return () => clearTimeout(timer); }, [toast]);
  const dispatch = useCallback(action => setLearning(current => updateLearning(current, action)), []);
  const notify = useCallback(text => setToast(text), []);
  const recoverStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // 先保留可找回的原始副本；任一步失败都不解除写入保护。
      if (raw !== null) localStorage.setItem(STORAGE_KEY + '-recovery-' + Date.now(), raw);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learning));
      setBlocked(false);
      setStorageError('');
      notify('已保留原始数据副本，并恢复保存当前学习记录。');
    } catch { setStorageError('暂时无法恢复保存，请到“我的学习”导出本次记录。'); }
  };
  const importLearning = value => setLearning(current => {
    const incoming = normalizeLearning(value);
    const exercises = { ...current.exercises };
    for (const [id, items] of Object.entries(incoming.exercises)) exercises[id] = [...new Set([...(exercises[id] || []), ...items])];
    const projectChecks = { ...current.projectChecks }, projectCompleted = { ...current.projectCompleted };
    for (const [id, values] of Object.entries(incoming.projectChecks)) projectChecks[id] = [...new Set([...(projectChecks[id] || []), ...values])];
    for (const [id, values] of Object.entries(incoming.projectCompleted)) projectCompleted[id] = [...new Set([...(projectCompleted[id] || []), ...values])];
    return normalizeLearning({ version: 1, saved: [...current.saved, ...incoming.saved], completed: [...current.completed, ...incoming.completed], history: [...current.history, ...incoming.history], exercises, contexts: { ...incoming.contexts, ...current.contexts }, locations: { ...incoming.locations, ...current.locations }, projectChecks, projectCompleted, drafts: { ...incoming.drafts, ...current.drafts } });
  });
  return <LearningContext.Provider value={{ learning, dispatch, notify, importLearning }}>
    {blocked && <div className="storage-warning" role="alert">原有记录暂时无法读取，已保留原始数据。本次进度暂存于页面中，可到<a href="#/library">我的学习</a>导出。<button type="button" onClick={recoverStorage}>备份原始数据并恢复保存</button></div>}
    {storageError && <div className="storage-warning" role="alert">{storageError}</div>}
    {children}
    <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">{toast}</div>
  </LearningContext.Provider>;
}

export const useLearning = () => useContext(LearningContext);
export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const positions = useRef(new Map());
  const currentHash = useRef(window.location.hash);
  const lastScroll = useRef(window.scrollY);
  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const scroll = () => { lastScroll.current = window.scrollY; };
    const change = () => {
      positions.current.set(currentHash.current, lastScroll.current);
      currentHash.current = window.location.hash;
      setRoute(parseRoute(window.location.hash));
    };
    window.addEventListener('hashchange', change);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { history.scrollRestoration = previousRestoration; window.removeEventListener('hashchange', change); window.removeEventListener('scroll', scroll); };
  }, []);
  useLayoutEffect(() => {
    // 正文在挂载后恢复保存的章节，其余页面恢复完整查询对应的位置。
    const top = route.page === 'learn' ? 0 : positions.current.get(currentHash.current) || 0;
    window.scrollTo({ top, behavior: 'instant' });
    lastScroll.current = top;
  }, [route]);
  return route;
}

export async function copyText(text, notify, message = '已复制，可以粘贴使用') {
  try { await navigator.clipboard.writeText(text); notify(message); }
  catch { notify('复制未成功，请选中文本后手动复制。'); }
}
