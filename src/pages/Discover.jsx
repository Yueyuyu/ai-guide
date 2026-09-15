import React from 'react';
import { Icon } from '../components/Icon.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { learnHref } from '../lib/discovery.js';
export const firstCourses = [
  { id: 'ai-first', title: '认识 AI', subtitle: 'AI 能做什么', description: '了解 AI 的基本概念、发展现状和常见应用场景。', art: 'brain', tone: 'blue' },
  { id: 'choose-model', title: '软件与模型', subtitle: 'ChatGPT 和 GPT 有何不同', description: '搞清楚应用和模型的区别，以及它们是如何协作的。', art: 'layers', tone: 'lilac' },
  { id: 'prompt-template', title: '第一次提问', subtitle: '把问题说清楚', description: '学习有效的提问方法，获得更符合预期的答案。', art: 'chat', tone: 'sage' },
];
export function Discover() {
  return <><section className="home-intro"><div className="home-eyebrow"><i/>AI 入门指南</div><h1>从这里，学会 AI。</h1><p>从认识 AI 到熟练使用工具，一步一步学清楚。</p></section>
    <section className="starter-section" aria-label="从入门路线开始"><div className="starter-lead"><span>建议从这里开始</span><h2>AI 入门路线</h2><p>从网页开始，整理并保存第一份待办清单。</p><a className="button primary" href="#/path/starter">开始入门路线<Icon name="arrow"/></a><small>6 节课 · 实操附练习材料</small></div>
    <div className="first-courses">{firstCourses.map((course, index) => <a className={'first-course tone-' + course.tone} key={course.id} href={learnHref(course.id, 'starter')}><div className="course-copy"><span className="course-number">0{index + 1}</span><h3>{course.title}</h3><p>{course.subtitle}</p></div><CourseArt kind={course.art}/><p className="course-description">{course.description}</p><Icon className="course-mobile-arrow" name="chevron"/></a>)}</div></section>
    <section className="home-secondary"><a href="#/path/builder"><span className="nav-art"><Icon name="code" size={32}/></span><div><strong>已有基础？ <b>用 Codex 做网页</b></strong><p>准备环境 · 创建作品 · 修改与验收</p></div><Icon name="arrow"/></a><a href="#/models"><span className="nav-art"><Icon name="layers" size={32}/></span><div><strong>想理解更多？ <b>了解模型基础</b></strong><p>模型能力、选择方法与使用场景</p></div><Icon name="arrow"/></a></section>
  </>;
}
