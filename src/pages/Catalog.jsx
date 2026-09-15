import React, { useState } from 'react';
import { lessons, tools, companies, platforms } from '../data/index.js';
import { filterLessons, catalogUrl } from '../lib/learning.js';
import { lessonTypes, lessonType } from '../lib/discovery.js';
import { EmptyState, PageHeading, SearchBox } from '../components/Shared.jsx';
import { LessonList } from '../components/LessonList.jsx';
import { Modal } from '../components/Modal.jsx';
import { Icon } from '../components/Icon.jsx';

export function Catalog({ route }) {
  const query = route.params.get('q') || '';
  const applied = Object.fromEntries(['type', 'platform', 'tool', 'category', 'level'].map(key => [key, route.params.get(key) || 'all']));
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(applied);
  const apply = patch => { window.location.hash = catalogUrl({ q: query, ...applied, ...patch }); };
  const filtered = filterLessons(lessons, { query, ...applied }).filter(lesson => applied.type === 'all' || lessonType(lesson) === applied.type);
  const conditions = Object.entries(applied).filter(([, value]) => value !== 'all');
  const filterName = (key, value) => key === 'type' ? lessonTypes.find(x => x.id === value)?.name || value : key === 'platform' ? platforms.find(x => x.id === value)?.name || value : key === 'tool' ? tools.find(x => x.id === value)?.short || value : value;
  const reset = () => ({ type: 'all', platform: 'all', tool: 'all', category: 'all', level: 'all' });
  return <><PageHeading title="找到你的下一篇教程。" description="从一个具体问题开始，把 AI 一点点用起来。"/><SearchBox query={query} onSearch={q => apply({ q })} placeholder="搜索教程、产品或任务"/><p className="search-help">还不知道从哪开始？ <a href="#/path/starter">跟着入门路线学<Icon name="arrow" size={16}/></a></p>
    <div className="catalog-controls"><div className="type-tabs">{lessonTypes.map(item => <button type="button" key={item.id} aria-pressed={applied.type === item.id} onClick={() => apply({ type: item.id })}>{item.name}</button>)}</div><button type="button" className="button secondary" onClick={() => { setDraft(applied); setOpen(true); }}><Icon name="menu"/>筛选{conditions.length > 0 && ' · ' + conditions.length + ' 项'}</button></div>
    {conditions.length > 0 && <div className="active-filters">{conditions.map(([key, value]) => <button key={key} type="button" onClick={() => apply({ [key]: 'all' })} aria-label={'移除筛选：' + filterName(key, value)}>{filterName(key, value)}<Icon name="close" size={14}/></button>)}<button type="button" className="clear-filters" onClick={() => apply(reset())}>清除筛选</button></div>}
    <div className="list-caption"><span><Icon name="file" size={17}/>按学习顺序</span><span role="status">{filtered.length} 篇教程</span></div>
    {filtered.length ? <LessonList items={filtered}/> : <EmptyState title="没有找到匹配的内容" description={'当前关键词：' + (query || '未设置') + '。可以换个词，或减少筛选条件。'} action="清除筛选，重新查找" onAction={() => apply(reset())}/>}
    <div className="soft-panel horizontal-panel"><div><h2>换一种方式找内容</h2><p>按你的目标，选择更顺手的入口。</p></div><a href="#/paths" className="text-link">学习路线<Icon name="arrow"/></a><a href="#/tools" className="text-link">公司与工具<Icon name="arrow"/></a><a href="#/models" className="text-link">模型系列<Icon name="arrow"/></a></div>
    <Modal open={open} onClose={() => setOpen(false)} title="筛选教程" className="filter-dialog"><fieldset><legend>教程类型</legend><div className="filter-choices">{lessonTypes.map(item => <button key={item.id} type="button" aria-pressed={draft.type === item.id} onClick={() => setDraft({ ...draft, type: item.id })}>{item.name}{draft.type === item.id && <Icon name="check" size={16}/>}</button>)}</div></fieldset><fieldset><legend>使用入口</legend><div className="filter-choices">{[{ id: 'all', name: '全部' }, ...platforms].map(item => <button key={item.id} type="button" aria-pressed={draft.platform === item.id} onClick={() => setDraft({ ...draft, platform: item.id })}>{item.name}{draft.platform === item.id && <Icon name="check" size={16}/>}</button>)}</div></fieldset><label className="select-field">产品<select value={draft.tool} onChange={e => setDraft({ ...draft, tool: e.target.value })}><option value="all">全部产品</option>{companies.map(company => <optgroup key={company.id} label={company.name}>{company.toolIds.map(id => <option key={id} value={id}>{tools.find(t => t.id === id).short}</option>)}</optgroup>)}</select></label><p className="muted">选择后，点击应用筛选。</p><footer><button type="button" className="button secondary" onClick={() => setDraft(reset())}>重置</button><button type="button" className="button primary" onClick={() => { apply(draft); setOpen(false); }}>应用筛选</button></footer></Modal>
  </>;
}
