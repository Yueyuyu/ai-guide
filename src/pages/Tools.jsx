import React from 'react';
import { SourceReview } from '../components/SourceReview.jsx';
import { getProductReview } from '../data/source-review.js';
import { tools, lessons, platforms, kindNames, companyByToolId } from '../data/index.js';
import { productHref } from '../lib/discovery.js';
import { Icon } from '../components/Icon.jsx';
import { EmptyState, NotFound, ToolMark } from '../components/Shared.jsx';
import { LessonList } from '../components/LessonList.jsx';
export function ProductConnections({ tool }) {
  if (!tool.related.length) return null;
  return <section className="related-products"><h2>相关入口，分开学习</h2><div className="product-rows">{tool.related.map(id => { const item = tools.find(t => t.id === id); return item && <a href={productHref(item)} key={id}><ToolMark tool={item} size="small"/><div><strong>{item.short}</strong><small>{kindNames[item.kind]}</small></div><Icon name="chevron"/></a>; })}</div></section>;
}
export function ToolDetail({ id, route }) {
  const tool = tools.find(item => item.id === id);
  if (!tool) return <NotFound/>;
  const company = companyByToolId[id];
  const platform = route.params.get('platform') || tool.platforms[0];
  const specific = lessons.filter(lesson => lesson.productId === id && lesson.platform === platform);
  const general = lessons.filter(lesson => lesson.platform === 'general' && lesson.tools.includes(id));
  const siblings = tool.related.map(id => tools.find(t => t.id === id)).filter(t => t?.kind === tool.kind);
  return <><a className="back-link" href={'#/company/' + company.id}>工具教程 / {company.name}</a><header className="product-heading"><ToolMark tool={tool}/><div><span className="tag">{kindNames[tool.kind]}</span><h1>{tool.name}</h1></div></header><p className="page-lead">{tool.summary}</p>
    <div className="platform-picker"><span>使用入口</span>{tool.platforms.map(p => <a key={p} aria-current={platform === p ? 'page' : undefined} href={'#/tool/' + id + '?platform=' + p}>{platforms.find(item => item.id === p)?.name}</a>)}{siblings.map(t => <a key={t.id} href={productHref(t)}>{t.short}</a>)}</div>
    {platform === 'desktop' && <div className="notice"><Icon name="desktop"/><div><strong>可在手机阅读，实操需要电脑。</strong>{tool.draft && <p>产品步骤与版本条件待核对；先阅读准备清单。</p>}</div></div>}
    <div className="product-detail-grid"><div><h2 className="section-title">开始前先准备</h2><div className="soft-panel"><p>{specific[0]?.prerequisite || '当前入口暂时没有对应教程。可以选择上方的其他使用入口。'}</p>{specific[0] && <a href={'#/learn/' + specific[0].id} className="button primary">查看准备教程<Icon name="arrow"/></a>}</div><h2 className="section-title">按步骤学习</h2>{specific.length ? <LessonList items={specific}/> : <EmptyState title="这个入口暂时没有教程" description="各端步骤不同，请选择已有的使用入口。" href={'#/tool/' + id} action="返回已有入口"/>}</div><aside className="route-summary"><h2>认识这个入口</h2><p>{tool.distinction}</p><a className="text-link" href={tool.entry} target="_blank" rel="noreferrer">{tool.draft ? '查看豆包官方信息' : '查看产品官方入口'}<Icon name="external"/></a></aside></div>
    <SourceReview review={getProductReview(id)}/><ProductConnections tool={tool}/>{general.length > 0 && <section><h2 className="section-title">还可以补充的通用方法</h2><LessonList items={general}/></section>}
  </>;
}
