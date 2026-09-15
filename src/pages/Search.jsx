import React, { useEffect } from 'react';
import { searchContent, productHref } from '../lib/discovery.js';
import { PageHeading, SearchBox, EmptyState, ToolMark } from '../components/Shared.jsx';
import { LessonList } from '../components/LessonList.jsx';
import { Icon } from '../components/Icon.jsx';
export function Search({ route }) {
  const q = route.params.get('q') || '';
  const type = route.params.get('type') || 'all';
  const result = searchContent(q);
  const shown = key => type === 'all' || type === key;
  const total = Object.entries(result).filter(([key]) => shown(key)).reduce((n, [, items]) => n + items.length, 0);
  const url = patch => '#/search?' + new URLSearchParams({ q, type, ...patch });
  useEffect(() => { if (!q) document.getElementById('global-search')?.focus(); }, []);
  return <><PageHeading title={q ? '关于“' + q + '”的学习内容' : '搜索教程与工具'} description="先看内容类型，再进入适合你的页面。"/><SearchBox inputId="global-search" query={q} onSearch={value => { window.location.hash = url({ q: value }); }} placeholder="搜索公司、工具、模型或任务"/>
    <nav className="search-tabs" aria-label="搜索结果类型">{[['all', '全部'], ['lessons', '教程'], ['products', '工具'], ['models', '模型'], ['paths', '路线']].map(([id, name]) => <a key={id} href={url({ type: id })} aria-current={type === id ? 'page' : undefined}>{name}</a>)}</nav>
    {!q ? <EmptyState title="从一个名字，找到一条学法。" description="试试搜索 Claude、豆包或资料整理。" href="#/path/starter" action="还没想好？从入门路线开始"/> : !total ? <EmptyState title="没有找到匹配的内容" description={'当前关键词：' + q + '。可以换个词，或查看全部教程。'}/> : <>
      {['products'].map(key => shown(key) && result[key].length > 0 && <section className="search-group" key={key}><h2>{key === 'products' ? '工具与工作方式' : '模型'}</h2><div className="product-rows outlined">{result[key].map(tool => <a key={tool.id} href={productHref(tool)}><ToolMark tool={tool}/><div><strong>{tool.name}</strong><small>{tool.kind === 'model' ? '模型系列' : tool.kind === 'agent' ? '编程与任务工具' : '应用软件'}</small></div><span className="text-link">{key === 'models' ? '了解模型' : '进入学习'}<Icon name="arrow"/></span></a>)}</div></section>)}
      {shown('lessons') && result.lessons.length > 0 && <section className="search-group"><h2>相关教程</h2><LessonList items={result.lessons}/></section>}
      {['models'].map(key => shown(key) && result[key].length > 0 && <section className="search-group" key={key}><h2>{key === 'products' ? '工具与工作方式' : '模型'}</h2><div className="product-rows outlined">{result[key].map(tool => <a key={tool.id} href={productHref(tool)}><ToolMark tool={tool}/><div><strong>{tool.name}</strong><small>{tool.kind === 'model' ? '模型系列' : tool.kind === 'agent' ? '编程与任务工具' : '应用软件'}</small></div><span className="text-link">{key === 'models' ? '了解模型' : '进入学习'}<Icon name="arrow"/></span></a>)}</div></section>)}
      {shown('paths') && result.paths.length > 0 && <section className="search-group"><h2>学习路线</h2><div className="product-rows outlined">{result.paths.map(path => <a key={path.id} href={'#/path/' + path.id}><Icon name="route" size={28}/><div><strong>{path.title}</strong><small>{path.subtitle}</small></div><Icon name="arrow"/></a>)}</div></section>}
    </>}
  </>;
}
