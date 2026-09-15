import React from 'react';
import { PageHeading, ToolMark } from '../components/Shared.jsx';
import { Icon } from '../components/Icon.jsx';
import { tools } from '../data/index.js';
import '../styles-start.css';

const choices = [
  { id: 'doubao', label: '网页使用 · 无需安装', title: '用豆包，做一份清单', description: '从一段通知开始，练习提问、追问与核对。', steps: ['打开豆包网页并登录', '粘贴材料，核对回答', '把清单保存为 TXT'], result: '一份带原文依据的待办清单', href: '#/learn/doubao-notice?path=starter', time: '约 15 分钟', action: '用豆包开始' },
  { id: 'workbuddy', label: '桌面使用 · 先安装', title: '用 WorkBuddy，整理工作记录', description: '让腾讯的 AI 办公工具读取练习文件，生成一份周报。', steps: ['安装、登录，选择练习文件夹', '交代任务，查看执行过程', '打开实际文件，核对并修改'], result: '一个实际生成的周报文件', href: '#/learn/workbuddy-first', time: '约 25 分钟', action: '用 WorkBuddy 开始' },
];

export function Start() {
  return <div className="starter-choice-page"><a className="back-link" href="#/">返回首页</a><PageHeading title="选一个工具，完成第一次练习。" description="两种起点，选你现在更方便的一种。学会一个，再尝试另一个。"/>
    <section className="starter-choices" aria-label="选择入门工具">{choices.map(choice => <article className={'starter-choice choice-' + choice.id} key={choice.id}>
      <header><ToolMark tool={tools.find(tool => tool.id === choice.id)}/><span className="choice-platform">{choice.label}</span></header><h2>{choice.title}</h2><p>{choice.description}</p><ol>{choice.steps.map(step => <li key={step}>{step}</li>)}</ol><div className="choice-result"><small>你会带走</small><strong>{choice.result}</strong><span>{choice.time} · 本站练习材料免费</span></div><a className="button primary" href={choice.href}>{choice.action}<Icon name="arrow" size={18}/></a>
    </article>)}</section><div className="start-basics"><div><h2>还想先认识一下 AI？</h2><p>先学概念、软件与模型、第一次提问，再回来选工具。</p></div><a className="text-link" href="#/path/starter">从基础路线开始<Icon name="arrow" size={17}/></a></div><p className="fine-print">工具账号、可用额度和系统要求以官网为准。本站将官方资料核对与账号内实测分开标明。</p>
  </div>;
}
