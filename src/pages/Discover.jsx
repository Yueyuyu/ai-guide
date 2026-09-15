import React from 'react';
import { Icon } from '../components/Icon.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { learnHref } from '../lib/discovery.js';
import { ToolMark } from '../components/Shared.jsx';
import { tools } from '../data/index.js';
import '../styles-start.css';
import '../styles-feedback.css';
export const firstCourses = [
  { id: 'ai-first', title: '认识 AI', subtitle: 'AI 能做什么', description: '了解 AI 的基本概念、发展现状和常见应用场景。', art: 'brain', tone: 'blue' },
  { id: 'choose-model', title: '软件与模型', subtitle: 'ChatGPT 和 GPT 有何不同', description: '搞清楚应用和模型的区别，以及它们是如何协作的。', art: 'layers', tone: 'lilac' },
  { id: 'prompt-template', title: '第一次提问', subtitle: '把问题说清楚', description: '学习有效的提问方法，获得更符合预期的答案。', art: 'chat', tone: 'sage' },
];
export function Discover() {
  return <><section className="home-intro"><div className="home-eyebrow"><i/>AI 入门指南</div><h1>从这里，学会 AI。</h1><p>从认识 AI 到熟练使用工具，一步一步学清楚。</p></section>
    <section className="audience-paths" aria-label="按使用基础选择起点">
      <a className="audience-card audience-beginner" href="#/start"><div className="audience-top"><span className="audience-badge">第一次使用 AI</span><span className="audience-note">推荐起点</span></div><h2>从一份小任务开始</h2><p>选豆包或 WorkBuddy，跟着步骤完成第一份成果。</p><div className="audience-products">{['doubao', 'workbuddy'].map(id => <span key={id}><ToolMark tool={tools.find(tool => tool.id === id)} size="small"/>{id === 'doubao' ? '豆包' : 'WorkBuddy'}</span>)}</div><div className="audience-action">选择我的入门工具<Icon name="arrow" size={20}/></div></a>
      <a className="audience-card audience-builder" href="#/path/builder"><div className="audience-top"><span className="audience-badge">已有基础</span><span className="audience-note">想做出作品</span></div><h2>用 ChatGPT，做一个网页</h2><p>先检查网络与账号，再创建、修改，亲手验收网页。</p><div className="audience-products"><span><ToolMark tool={tools.find(tool => tool.id === 'chatgpt-desktop')} size="small"/>ChatGPT 桌面版</span><span className="audience-product-note">使用 Codex 编程入口</span></div><div className="audience-action">开始我的网页练习<Icon name="arrow" size={20}/></div></a>
    </section>
    <section className="starter-section" aria-label="从入门路线开始"><div className="starter-lead"><span>建议从这里开始</span><h2>AI 入门路线</h2><p>从网页开始，整理并保存第一份待办清单。</p><a className="button primary" href="#/path/starter">开始入门路线<Icon name="arrow"/></a><small>6 节课 · 实操附练习材料</small></div>
    <div className="first-courses">{firstCourses.map((course, index) => <a className={'first-course tone-' + course.tone} key={course.id} href={learnHref(course.id, 'starter')}><div className="course-copy"><span className="course-number">0{index + 1}</span><h3>{course.title}</h3><p>{course.subtitle}</p></div><CourseArt kind={course.art}/><p className="course-description">{course.description}</p><Icon className="course-mobile-arrow" name="chevron"/></a>)}</div></section>
    <div className="home-trial"><span>公开试用版 · 操作依据与未实测范围在每课标明</span><a href="#/feedback">试过以后，告诉我们哪里卡住了 →</a></div>
  </>;
}
