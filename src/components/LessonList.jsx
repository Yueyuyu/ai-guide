import React from 'react';
import { tools } from '../data/index.js';
import { typeName, learnHref } from '../lib/discovery.js';
import { ToolMark, SaveButton, PlatformBadge } from './Shared.jsx';
import { CourseArt } from './GuideArt.jsx';
import { Icon } from './Icon.jsx';
export function LessonList({ items, pathId }) {
  return <div className="lesson-list">{items.map(lesson => {
    const tool = tools.find(t => t.id === lesson.productId);
    const kind = ({ 'ai-first': 'brain', 'choose-model': 'layers', 'prompt-template': 'chat' })[lesson.id];
    return <article className="lesson-row" key={lesson.id}><a className={'lesson-thumb tone-' + lesson.color} href={learnHref(lesson.id, pathId)} tabIndex={-1} aria-hidden="true">{kind ? <CourseArt kind={kind} compact/> : tool ? <ToolMark tool={tool}/> : <Icon name={lesson.platform === 'api' ? 'code' : 'file'} size={36}/>}</a><div className="lesson-row-body"><h3><a href={learnHref(lesson.id, pathId)}>{lesson.title}</a></h3><p>{lesson.description}</p><div className="tags"><span>{typeName(lesson)}</span><PlatformBadge platform={lesson.platform}/>{lesson.draft && <span>步骤待核对</span>}</div></div><SaveButton lesson={lesson}/><a className="lesson-read" href={learnHref(lesson.id, pathId)}><span>开始阅读</span><Icon name="arrow"/></a></article>;
  })}</div>;
}
