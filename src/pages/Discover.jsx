import React from 'react';
import { Icon } from '../components/Icon.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { learnHref } from '../lib/discovery.js';
import '../styles-feedback.css';
export const firstCourses = [
  { id: 'ai-first', title: '认识 AI', subtitle: 'AI 能做什么', description: '了解 AI 的基本概念、发展现状和常见应用场景。', art: 'brain', tone: 'blue' },
  { id: 'choose-model', title: '软件与模型', subtitle: 'ChatGPT 和 GPT 有何不同', description: '搞清楚应用和模型的区别，以及它们是如何协作的。', art: 'layers', tone: 'lilac' },
  { id: 'prompt-template', title: '第一次提问', subtitle: '把问题说清楚', description: '学习有效的提问方法，获得更符合预期的答案。', art: 'chat', tone: 'sage' },
];
export function Discover() {
  return <><section className="home-intro"><div className="home-eyebrow"><i/>AI 入门指南</div><h1>从这里，学会 AI。</h1><p>从认识 AI 到熟练使用工具，一步一步学清楚。</p></section>
    <section className="mainline-links" aria-label="三条学习主线">
      <a href="#/learn/doubao-notice?path=starter"><small>第一次使用 AI · 推荐起点</small><h2>用豆包，做一份清单</h2><p>不用安装软件，15 分钟练习提问、核对与保存。</p></a>
      <a href="#/path/network"><small>需要准备访问环境</small><h2>先把网络准备好</h2><p>Clash Party 安装、自己的订阅、连接验证与恢复。</p></a>
      <a href="#/path/builder"><small>已有基础 · 想做出作品</small><h2>用 Codex，做一个网页</h2><p>准备目录，创建文件，继续修改，再亲手验收。</p></a>
    </section>
    <section className="starter-section" aria-label="从入门路线开始"><div className="starter-lead"><span>建议从这里开始</span><h2>AI 入门路线</h2><p>从网页开始，整理并保存第一份待办清单。</p><a className="button primary" href="#/path/starter">开始入门路线<Icon name="arrow"/></a><small>6 节课 · 实操附练习材料</small></div>
    <div className="first-courses">{firstCourses.map((course, index) => <a className={'first-course tone-' + course.tone} key={course.id} href={learnHref(course.id, 'starter')}><div className="course-copy"><span className="course-number">0{index + 1}</span><h3>{course.title}</h3><p>{course.subtitle}</p></div><CourseArt kind={course.art}/><p className="course-description">{course.description}</p><Icon className="course-mobile-arrow" name="chevron"/></a>)}</div></section>
    <div className="home-trial"><span>公开试用版 · 操作依据与未实测范围在每课标明</span><a href="#/feedback">试过以后，告诉我们哪里卡住了 →</a></div>
  </>;
}
