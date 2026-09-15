import React from 'react';
import { projects, lessonById } from '../data/index.js';
import { projectStages } from '../data/project-stages.js';
import { projectResources } from '../data/practice-resources.js';
import { resultHref } from '../lib/discovery.js';
import { useLearning } from '../lib/hooks.jsx';
import { Icon } from '../components/Icon.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { NotFound, PageHeading, PromptBlock, Progress } from '../components/Shared.jsx';

export function Projects() {
  return <><PageHeading title="学一点，就做一点。" description="用一个小项目，把学过的东西连起来。"/><div className="project-list">{['research-note', 'personal-page', 'weekly-workflow'].map(id => { const project = projects.find(p => p.id === id); return <article className="project-card" key={id}><a className={'project-cover tone-' + project.color} href={'#/project/' + id}><span>实战项目 · 4 个阶段</span><em>{project.cover}</em><CourseArt kind={id === 'personal-page' ? 'code' : 'file'}/><small>成果示意</small></a><div className="project-body"><h2><a href={'#/project/' + id}>{project.title}</a></h2><p>{project.description}</p><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul><a href={'#/project/' + id} className="button primary">查看项目<Icon name="arrow"/></a></div></article>; })}</div></>;
}
export function ProjectDetail({ id }) {
  const project = projects.find(item => item.id === id);
  const { learning, dispatch, notify } = useLearning();
  if (!project) return <NotFound/>;
  const stages = projectStages[id];
  const completed = learning.projectCompleted?.[id] || [];
  const checked = learning.projectChecks?.[id] || [];
  const firstOpen = stages.findIndex((_, i) => !completed.includes(i));
  const done = completed.length === stages.length;
  const resources = projectResources[id];
  return <><a href="#/projects" className="back-link">实战项目 / {project.title}</a><PageHeading title={project.title} description={project.description}/>
    <section className="project-resources soft-panel"><div><h2>材料已经备好，从这里开始。</h2><p>使用附带的虚构材料练习；按阶段完成后，回到教程保存自己的成果与检查记录。</p></div><div className="lesson-resource-links">{resources.links.map(link => <a key={link.href} className="button secondary" href={import.meta.env.BASE_URL + link.href} download={link.filename}><Icon name="download" size={16}/>{link.label}</a>)}{resources.preview && <a className="text-link" href={import.meta.env.BASE_URL + resources.preview} target="_blank" rel="noreferrer">查看人工参考作品<Icon name="external" size={16}/></a>}</div><a className="text-link" href={resultHref(lessonById[resources.lesson], resources.path)}>填写与保存项目成果<Icon name="arrow" size={16}/></a></section>
    {done && <div className="notice"><Icon name="check"/><div><h2>{id === 'research-note' ? '第一份研究笔记，完成了。' : '这个项目，完成了。'}</h2><p>根据你的自查记录，全部阶段已完成。请把成果保存在自己的文件中。</p></div></div>}
    <div className="project-progress"><strong>{done ? '已完成全部阶段' : '按阶段完成这件事'}</strong><span>{completed.length} / {stages.length} 阶段</span></div><Progress value={completed.length / stages.length * 100} label="项目阶段进度"/>
    <div className="project-detail-grid"><section>{stages.map((stage, index) => <details className="project-stage" key={stage.title} open={index === firstOpen ? true : undefined}><summary><span className={'step-number ' + (completed.includes(index) ? 'done' : '')}>{completed.includes(index) ? <Icon name="check"/> : index + 1}</span>{stage.title}<Icon name="down"/></summary><div className="project-stage-body"><p>{stage.text}</p>{stage.checks.map((check, i) => <label key={check}><input type="checkbox" checked={checked.includes(index * 2 + i)} onChange={() => dispatch({ type: 'project-check', id, index: index * 2 + i })}/><span>{check}</span></label>)}<p className="fine-print">这是自己的成果检查，勾选不会替你生成或验证文件。</p><a className="text-link" href={'#/learn/' + stage.lesson}>需要帮助？查看对应教程<Icon name="arrow"/></a><div><button className={'button ' + (completed.includes(index) ? 'secondary' : 'primary')} type="button" disabled={!completed.includes(index) && !stage.checks.every((_, i) => checked.includes(index * 2 + i))} onClick={() => { dispatch({ type: 'project-complete', id, index }); notify(completed.includes(index) ? '已撤销本阶段完成标记' : '本阶段已完成，进度已保存。'); }}>{completed.includes(index) ? '撤销本阶段完成' : '标记本阶段完成'}<Icon name="check"/></button></div></div></details>)}</section><aside className="route-summary"><h2>检查你的三份成果</h2><ul className="check-list">{project.deliverables.map(item => <li key={item}><Icon name="file"/>{item}</li>)}</ul><p>学习记录保存在当前浏览器；成果文件请自己保存。</p><a href={'#/path/' + resources.path} className="text-link">回到路线，继续学习<Icon name="arrow"/></a></aside></div><details className="soft-panel"><summary>查看项目任务说明</summary><PromptBlock text={project.brief} label="项目任务说明"/></details><a href="#/projects" className="text-link">再做一个实战项目<Icon name="arrow"/></a></>;
}
