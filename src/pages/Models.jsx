import React from 'react';
import { SourceReview } from '../components/SourceReview.jsx';
import { getProductReview } from '../data/source-review.js';
import { tools, lessons, companyByToolId } from '../data/index.js';
import { productHref } from '../lib/discovery.js';
import { PageHeading, ToolMark, NotFound, PromptBlock } from '../components/Shared.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { LessonList } from '../components/LessonList.jsx';
import { Icon } from '../components/Icon.jsx';
const modelTools = tools.filter(t => t.kind === 'model');
export function Models() {
  return <><PageHeading title="先认识模型，再学会选择。" description="弄清它是什么、能做什么，再找到适合你的使用入口。"/><section className="soft-panel horizontal-panel model-start"><CourseArt kind="layers" compact/><div><h2>第一次了解模型？从这里开始。</h2><p>先分清公司、软件和模型。</p><a className="button primary" href="#/learn/choose-model">学习基础概念<Icon name="arrow"/></a></div></section>
    <h2 className="section-title">先弄懂三个问题</h2><div className="question-list">{[['模型和软件，有什么区别？', 'choose-model'], ['一个模型，应该看哪些信息？', 'api-first'], ['怎样选择适合自己的模型？', 'compare-models']].map(([title, id], index) => <a href={'#/learn/' + id} key={id}><span className="step-number">0{index + 1}</span><strong>{title}</strong><Icon name="arrow"/></a>)}</div>
    <h2 className="section-title">带着任务，去了解模型</h2><div className="task-links">{[['整理与写作', 'file', 'research-first'], ['编程与改代码', 'code', 'codex-web'], ['比较表现与成本', 'grid', 'compare-models']].map(([name, icon, id]) => <a key={id + name} href={'#/learn/' + id}><Icon name={icon} size={30}/><h3>{name}</h3><span>了解选择与核对方法<Icon name="arrow" size={16}/></span></a>)}</div>
    <h2 className="section-title">认识不同公司的模型系列</h2><div className="product-rows outlined">{modelTools.map(tool => <a key={tool.id} href={productHref(tool)}><ToolMark tool={tool}/><div><strong>{tool.name}</strong><small>{tool.maker}</small></div><p>{tool.task}</p><span className="text-link">进入学习<Icon name="arrow"/></span></a>)}</div><div className="soft-panel horizontal-panel"><div><h2>想比较模型表现？</h2><p>按任务看评测，先了解来源与条件。</p></div><a href="#/ranking" className="text-link">查看模型排名<Icon name="arrow"/></a></div></>;
}
export function ModelDetail({ id }) {
  const tool = tools.find(t => t.id === id && t.kind === 'model');
  if (!tool) return <NotFound/>;
  const app = tool.related.map(id => tools.find(t => t.id === id)).find(t => t?.kind === 'app');
  const company = companyByToolId[id];
  const specific = lessons.filter(l => l.productId === id);
  const example = specific[0]?.sections.find(section => section.prompt || section.code);
  return <><a href="#/models" className="back-link">模型指南 / {tool.short}</a><header className="product-heading"><ToolMark tool={tool}/><div><span className="tag">模型系列</span><h1>{tool.name}</h1><a className="text-link" href={'#/company/' + company.id}>所属公司：{company.name}</a></div></header><p className="page-lead">{tool.summary}</p>
    {app && <div className="soft-panel horizontal-panel"><ToolMark tool={app}/><div><h2>想先用起来？从应用教程开始。</h2><p>{app.name} · 先选择实际使用的入口。</p></div><a href={productHref(app)} className="button primary">查看应用教程<Icon name="arrow"/></a></div>}
    <div className="model-task-grid"><section><h2>先从这些任务认识它</h2><p>{tool.task}</p><ul className="check-list">{tool.use.map(task => <li key={task}><Icon name="check"/>{task}</li>)}</ul><p>核对结果是否符合原文、任务要求与输出格式。具体能力取决于版本与输入条件。</p></section><aside className="soft-panel"><h2>分清模型和入口</h2><p>{tool.distinction}</p><a href={tool.docs} target="_blank" rel="noreferrer" className="text-link">查看官方模型说明<Icon name="external"/></a></aside></div>
    <h2 className="section-title">认识版本，比只记住名字更重要</h2><div className="task-links">{[['系列', '一组相关的模型'], ['具体版本', '确认实际使用的是哪一个'], ['运行设置', '部分设置会影响输出']].map(([title, text]) => <div key={title}><Icon name="box"/><h3>{title}</h3><p>{text}</p></div>)}</div>
    {example && <section><h2 className="section-title">先看这个模型的学习示例</h2><p>{example.title}</p><PromptBlock label={example.promptLabel || example.language || '任务提示示例'} text={example.prompt || example.code}/><p className="muted">节选自对应教程，仅供学习。运行条件和核对范围请先阅读完整正文。</p><a className="text-link" href={'#/learn/' + specific[0].id}>阅读完整教程<Icon name="arrow" size={16}/></a></section>}
    <SourceReview review={getProductReview(id)}/><h2 className="section-title">这个模型的接入与学习内容</h2><LessonList items={specific}/><div className="soft-panel horizontal-panel"><div><h2>准备开发接入？</h2><p>应用会员与 API 使用条件需要分别核对。</p></div><a className="text-link" href="#/learn/api-first">查看 API 入门教程<Icon name="arrow"/></a></div></>;
}
