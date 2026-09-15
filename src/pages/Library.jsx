import React, { useRef, useState } from 'react';
import { lessonById, paths } from '../data/index.js';
import { useLearning } from '../lib/hooks.jsx';
import { getPathProgress, normalizeLearning } from '../lib/learning.js';
import { learnHref, resultHref } from '../lib/discovery.js';
import { Icon } from '../components/Icon.jsx';
import { EmptyState, PageHeading, Progress } from '../components/Shared.jsx';
import { LessonList } from '../components/LessonList.jsx';
import { BackupDialog } from '../components/BackupDialog.jsx';
import { Modal } from '../components/Modal.jsx';
export function Library({ route }) {
  const { learning, importLearning, notify } = useLearning();
  const tab = ['history', 'saved', 'completed', 'drafts'].includes(route.params.get('tab')) ? route.params.get('tab') : 'history';
  const setTab = value => { window.location.hash = '#/library?tab=' + value; };
  const [exportOpen, setExportOpen] = useState(false);
  const [incoming, setIncoming] = useState(null);
  const fileInput = useRef(null);
  const tabs = [['history', '最近阅读'], ['saved', '收藏'], ['completed', '已完成'], ['drafts', '我的成果']];
  const draftIds = Object.keys(learning.drafts);
  const count = id => id === 'drafts' ? draftIds.length : learning[id].length;
  const currentId = learning.history.find(id => !learning.completed.includes(id)) || learning.history[0];
  const current = lessonById[currentId];
  const path = paths.find(p => p.id === learning.contexts?.[currentId]);
  const progress = path ? getPathProgress(path, learning) : null;
  const list = (tab === 'drafts' ? draftIds : learning[tab]).map(id => lessonById[id]).filter(Boolean);
  const importProgress = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error('请选择小于 1MB 的学习记录。');
      const value = JSON.parse(await file.text());
      if (!value || value.version !== 1 || !Array.isArray(value.saved) || !Array.isArray(value.completed) || !Array.isArray(value.history) || !value.exercises || typeof value.exercises !== 'object' || Array.isArray(value.exercises)) throw new Error('文件格式不正确，请选择 AIGuide 导出的学习记录。');
      setIncoming(normalizeLearning(value));
    } catch (error) { notify(error instanceof SyntaxError ? '无法读取 JSON，现有记录未改变。' : error.message); }
    e.target.value = '';
  };
  const handleTabKey = e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const index = tabs.findIndex(([key]) => key === tab);
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next][0]); document.getElementById('tab-' + tabs[next][0])?.focus();
  };
  return <><PageHeading title={current ? '接着上次，继续学。' : '我的学习'} description={current ? '从上次的位置，继续往前一步。' : '第一课，从这里开始。'}/>
    {current ? <section className="soft-panel learning-current"><span className="tag">{path?.title || '继续阅读'}</span><h2>{current.title}</h2>{progress && <><p>已完成 {progress.done} / {progress.total} 课</p><Progress value={progress.percent} label="当前路线进度"/></>}<a href={learnHref(current.id, path?.id)} className="button primary">继续学习<Icon name="arrow"/></a></section> : <div className="soft-panel learning-current"><h2>AI 入门路线</h2><p>从认识 AI、软件与模型，到第一次提问。开始阅读后，这里会帮你记住位置。</p><a href={learnHref('ai-first', 'starter')} className="button primary">开始第 1 课<Icon name="arrow"/></a><a className="button secondary" href="#/paths">浏览全部路线</a></div>}
    <div className="library-tabs" role="tablist" aria-label="学习记录类型">{tabs.map(([id, label]) => <button key={id} id={'tab-' + id} role="tab" type="button" aria-selected={tab === id} aria-controls="library-panel" tabIndex={tab === id ? 0 : -1} onKeyDown={handleTabKey} onClick={() => setTab(id)}>{label}{count(id) > 0 && <span>{count(id)}</span>}</button>)}</div><div id="library-panel" role="tabpanel" aria-labelledby={'tab-' + tab}>{list.length ? tab === 'drafts' ? <div className="result-library"><p className="muted">这些是你在教程里填写的成果，保存在当前浏览器。继续编辑可下载单份TXT，导出记录可备份全部草稿。</p>{list.map(lesson => <article className="result-library-card" key={lesson.id}><span className="tag">{learning.completed.includes(lesson.id) ? '课程已自查完成' : '成果草稿'}</span><h2>{lesson.resultSaving.label || '我的整理结果'}</h2><p className="muted">{lesson.title}</p><p className="result-excerpt">{learning.drafts[lesson.id].slice(0, 180)}{learning.drafts[lesson.id].length > 180 ? '…' : ''}</p><a className="text-link" href={resultHref(lesson, learning.contexts[lesson.id])}>继续编辑与下载<Icon name="arrow" size={16}/></a></article>)}</div> : <LessonList items={list}/> : <EmptyState icon={tab === 'saved' ? 'bookmark' : 'file'} title={tab === 'drafts' ? '让第一份成果，留在这里。' : tab === 'saved' ? '把想学的内容，先放在这里。' : tab === 'completed' ? '完成一课，再回来看你的积累。' : '还没有阅读记录'} description={tab === 'drafts' ? '在实操课填写自己的结果后，这里会自动收录；支持继续编辑和下载。' : tab === 'saved' ? '点击教程上的收藏图标，就能随时回来阅读。' : '从入门路线开始，完成练习后可以标记为已完成。'} href={tab === 'drafts' ? '#/learn/doubao-notice?path=starter' : '#/path/starter'} action={tab === 'drafts' ? '做第一份待办清单' : '查看入门路线'}/>}</div>
    <div className="record-tools"><div><h3>学习记录</h3><p>仅保存在当前浏览器</p></div><button className="button secondary" type="button" onClick={() => fileInput.current?.click()}><Icon name="upload"/>导入记录</button><button className="button secondary" type="button" disabled={!learning.history.length && !learning.saved.length && !learning.completed.length && !draftIds.length && !Object.keys(learning.projectChecks).length} onClick={() => setExportOpen(true)}><Icon name="download"/>导出记录</button><input ref={fileInput} className="sr-only" tabIndex={-1} type="file" accept="application/json,.json" aria-label="导入学习记录文件" onChange={importProgress}/></div>
    <BackupDialog open={exportOpen} onClose={() => setExportOpen(false)}/><Modal open={!!incoming} onClose={() => setIncoming(null)} title="检查导入的学习记录">{incoming && <><p>已识别 {incoming.saved.length} 篇收藏、{incoming.completed.length} 篇完成记录和 {incoming.history.length} 篇阅读记录、{Object.keys(incoming.drafts).length} 份成果草稿。无效 ID 和不合法进度不会导入。</p><div className="soft-panel"><h3>与当前记录合并</h3><p>保留现有收藏和进度；重复条目合并。同一课程已有的成果草稿优先保留，不会被导入内容覆盖。</p></div><footer><button type="button" className="button secondary" onClick={() => setIncoming(null)}>取消</button><button type="button" className="button primary" onClick={() => { importLearning(incoming); setIncoming(null); notify('已合并导入的学习记录。'); }}>合并导入</button></footer></>}</Modal>
  </>;
}
