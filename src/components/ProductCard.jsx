import React from 'react';
import { kindNames, lessons } from '../data/index.js';
import { Icon } from './Icon.jsx';
import { ToolMark, PlatformBadge } from './Shared.jsx';

export function ProductCard({ tool }) {
  const lessonCount = lessons.filter(lesson => lesson.productId === tool.id).length;
  return <article className="tool-card">
    <div className="tool-card-top"><ToolMark tool={tool}/><span className="muted">{lessonCount} 篇教程</span></div>
    <a href={`#/tool/${tool.id}`}><h3>{tool.name}<Icon name="arrow" size={19}/></h3></a>
    <span className="tool-maker">{kindNames[tool.kind]}</span>
    <div className="tool-platforms">{tool.platforms.map(id => <PlatformBadge platform={id} key={id}/>)}</div>
    <p>{tool.summary}</p>
    <div className="tool-tags">{tool.use.map(tag => <span key={tag}>{tag}</span>)}</div>
    <a className="text-link" href={`#/tool/${tool.id}`}>查看这个入口的教程<Icon name="chevron" size={15}/></a>
  </article>;
}
