import React from 'react';
import { companies } from '../data/index.js';
import { CompanyMark, ToolMark, NotFound } from '../components/Shared.jsx';
import { CompanyLearningEntries } from '../components/CompanyLearningCard.jsx';
import { Icon } from '../components/Icon.jsx';
import { productHref } from '../lib/discovery.js';
import { companyLearningGroup } from '../lib/company-learning.js';
import '../styles-tools.css';
export function CompanyDetail({ id }) {
  const company = companies.find(c => c.id === id);
  if (!company) return <NotFound/>;
  const group = companyLearningGroup(company);
  const hasWeb = group.sections.some(section => section.id === 'web');
  const hasDesktop = group.sections.some(section => section.id === 'desktop');
  return <div className="company-learning-page"><a href="#/tools" className="back-link">工具教程 / {company.name}</a>
    <header className="product-heading"><CompanyMark company={company}/><div><h1>{company.name}</h1><p>{group.subtitle}</p></div></header>
    <p className="page-lead">{hasWeb ? '从网页版开始体验，再按需要选择其他学习入口。' : hasDesktop ? '从桌面版教程开始，先准备电脑和安装环境。' : '从 API 接入教程开始，或先了解模型的能力与版本。'}</p>
    <div className="company-learning-layout"><div>
      <div className="company-learning-panel"><CompanyLearningEntries company={company} sections={group.sections} detailed/></div>
      {group.advanced.length > 0 && <details className="company-advanced"><summary>进阶编程教程<Icon name="down" size={18}/></summary><p>熟悉基础操作后，再学习终端中的编程工具。</p><div className="product-rows">{group.advanced.map(tool => <a key={tool.id} href={productHref(tool)}><ToolMark tool={tool} size="small"/><div><strong>{tool.short}</strong></div><Icon name="arrow" size={17}/></a>)}</div></details>}
    </div><aside className="route-summary"><h2>不知道从哪里开始？</h2>{hasWeb && <p>想先体验 AI，可以从网页版教程开始。</p>}{hasDesktop && <p>准备在电脑上使用，再选择桌面版。</p>}{group.sections.some(section => section.id === 'api') && <p>API 用于程序接入，模型页帮助你了解能力与版本。</p>}<a href="#/path/starter" className="text-link">进入新手学习路线<Icon name="arrow" size={16}/></a></aside></div>
  </div>;
}
