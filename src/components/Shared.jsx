import React, { useEffect, useState } from 'react';
import { platforms } from '../data/index.js';
import { useLearning, copyText } from '../lib/hooks.jsx';
import { catalogUrl } from '../lib/learning.js';

import { Icon } from './Icon.jsx';

export function SaveButton({ lesson, text = false }) {
  const { learning, dispatch, notify } = useLearning();
  const saved = learning.saved.includes(lesson.id);
  return <button type="button" className={`save-button ${saved ? 'saved' : ''} ${text ? 'with-text' : ''}`} aria-label={`${saved ? '取消收藏' : '收藏'}：${lesson.title}`} aria-pressed={saved} onClick={() => { dispatch({ type: 'save', id: lesson.id }); notify(saved ? '已取消收藏' : '已加入“我的学习”'); }}><Icon name="bookmark"/>{text && (saved ? '已收藏' : '收藏')}</button>;
}

export function SearchBox({ query = '', onSearch, compact = false, variant = 'default', inputId = 'tutorial-search', placeholder = '搜索教程、模型或你想解决的问题…' }) {
  const [value, setValue] = useState(query);
  useEffect(() => setValue(query), [query]);
  return <form role="search" aria-label={variant === 'header' ? '全站教程搜索' : '教程筛选搜索'} className={'search-box ' + (compact ? 'compact ' : '') + (variant === 'header' ? 'header-search' : '')} onSubmit={event => { event.preventDefault(); if (onSearch) onSearch(value.trim()); else window.location.hash = catalogUrl({ q: value.trim() }); }}>
    <Icon name="search" size={variant === 'header' ? 18 : 21}/><input id={inputId} type="search" aria-label={variant === 'header' ? '全站搜索教程' : '搜索教程'} placeholder={placeholder} value={value} onChange={event => setValue(event.target.value)}/>
    {value && <button type="button" className="search-submit" aria-label="清除关键词" onClick={() => { setValue(''); if (onSearch) onSearch(''); }}><Icon name="close" size={18}/></button>}<button type="submit" className="search-submit" aria-label="提交搜索"><Icon name="search"/></button>
  </form>;
}

export function PageHeading({ title, description, aside }) { return <header className="page-heading"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{aside}</header>; }
export function EmptyState({ title = '还没有找到相关教程', description = '换一个关键词，或调整筛选条件试试。', href = '#/tutorials', action = '浏览全部教程', icon = 'search', onAction }) { return <div className="empty-state"><Icon name={icon} size={36}/><h2>{title}</h2><p>{description}</p>{onAction ? <button type="button" className="button secondary" onClick={onAction}>{action}<Icon name="arrow" size={17}/></button> : <a className="button secondary" href={href}>{action}<Icon name="arrow" size={17}/></a>}</div>; }
export function PromptBlock({ text, label = '任务提示词', preview }) {
  const { notify } = useLearning();
  return <div className="prompt-block"><div className="prompt-toolbar"><span>{label}</span><button type="button" onClick={() => copyText(text, notify)}><Icon name="copy" size={15}/>{preview ? '复制完整内容' : '复制'}</button></div>
    {preview ? <><p className="prompt-preview">{preview}</p><details className="prompt-full"><summary>展开完整内容</summary><pre><code>{text}</code></pre></details></> : <pre><code>{text}</code></pre>}
  </div>;
}
function BrandMark({ brand, label, size, asset }) { return <span className={`tool-mark brand-${brand} mark-${size}`}><img src={import.meta.env.BASE_URL + 'brands/' + (asset || brand + '.svg')} alt={label} width="32" height="32"/></span>; }
export function ToolMark({ tool, size = 'normal' }) { return tool ? <BrandMark brand={tool.brand} asset={tool.logo} label={`${tool.maker} · ${tool.short} 图标`} size={size}/> : null; }
export function CompanyMark({ company, size = 'normal' }) { return <BrandMark brand={company.brand} asset={company.logo} label={`${company.name} · ${company.products} 品牌图标`} size={size}/>; }
export function PlatformBadge({ platform }) { const item = platforms.find(entry => entry.id === platform); return item && <span className="platform-badge"><Icon name={item.icon} size={13}/>{item.name}</span>; }
export function Progress({ value, label }) { return <div className="progress" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${value}%` }}/></div>; }
export function NotFound() { return <EmptyState title="这页暂时找不到" description="链接可能不完整，也可能是目录已经调整。可以从全部教程重新开始。" icon="file"/>; }
