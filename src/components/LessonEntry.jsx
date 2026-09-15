import React from 'react';
import { lessons, tools, kindNames } from '../data/index.js';
import { PlatformBadge, ToolMark } from './Shared.jsx';
import { Icon } from './Icon.jsx';

export function LessonEntry({ lesson }) {
  const tool = tools.find(item => item.id === lesson.productId);
  if (!tool) return <aside className="general-notice"><Icon name="cap"/><div><strong>这是一篇通用方法课</strong><p>适用于多种产品。安装、按钮和文件操作，请到对应软件的网页端或桌面端教程学习。</p><a href="#/tools">选择我使用的软件<Icon name="arrow" size={15}/></a></div></aside>;
  const alternatives = lessons.filter(item => item.id !== lesson.id && (item.productId === tool.id || tool.related.includes(item.productId)) && item.platform !== 'api');
  return <aside className="lesson-entry"><div className="entry-identity"><ToolMark tool={tool}/><div><strong>{tool.name}</strong><span>{kindNames[tool.kind]}<PlatformBadge platform={lesson.platform}/></span></div><a href={`#/tool/${tool.id}`} aria-label={`查看 ${tool.short} 专题`}><Icon name="arrow"/></a></div><p>{tool.distinction}</p><a className="entry-open" href={tool.entry} target="_blank" rel="noreferrer">{lesson.platform === 'api' ? '打开开发者官方入口' : lesson.platform === 'desktop' ? '查看官方安装与入口' : '打开本篇使用的官方入口'}<Icon name="external" size={15}/></a>{alternatives.length > 0 && <details className="entry-alternatives"><summary>我用的是另一个入口<Icon name="down" size={15}/></summary><div>{alternatives.map(item => <a href={`#/learn/${item.id}`} key={item.id}><PlatformBadge platform={item.platform}/>{item.title}<Icon name="chevron" size={14}/></a>)}</div></details>}</aside>;
}
