import React from 'react';
import { paths, lessonById } from '../data/index.js';
import { getPathProgress } from '../lib/learning.js';
import { learnHref } from '../lib/discovery.js';
import { useLearning } from '../lib/hooks.jsx';
import { Icon } from '../components/Icon.jsx';
import { CourseArt } from '../components/GuideArt.jsx';
import { NotFound, PageHeading, Progress } from '../components/Shared.jsx';
import { ReadinessPanel } from '../components/LearningGuide.jsx';
import { NetworkPreparationLink } from '../components/NetworkPreparationLink.jsx';
import { routeSetups } from '../data/learning-guidance.js';
import '../styles-practice.css';
const labels = { network: '网络准备', starter: 'AI 入门', office: '办公提效', builder: 'AI 编程', developer: '模型接入' };
export function Paths() {
  return <><PageHeading title="找到适合你的起点" description="按现在的基础，选一条路。"/><div className="path-starter-choice"><p><strong>第一次使用 AI：</strong>豆包网页、WorkBuddy 桌面，选一种方便的方式开始。</p><a className="text-link" href="#/start">选择入门工具<Icon name="arrow" size={17}/></a></div><div className="routes-grid">{['starter', 'builder', 'office', 'developer'].map(id => { const path = paths.find(p => p.id === id); return <article className={'route-card tone-' + path.color} key={id}><CourseArt kind={id === 'starter' ? 'brain' : path.icon}/><div><span className="tag">{id === 'starter' ? '推荐起点' : path.audience}</span><h2>{labels[id]}</h2><p>{path.subtitle}</p><p className="muted">{path.sequence.length} 节课 · {path.outcome}</p><a className={'button ' + (id === 'starter' ? 'primary' : 'secondary')} href={'#/path/' + id}>查看路线<Icon name="arrow"/></a></div></article>; })}</div><NetworkPreparationLink/><div className="soft-panel horizontal-panel"><div><h2>学一点，就做一点。</h2><p>用一个小项目，把学过的东西连起来。</p></div><a className="text-link" href="#/projects">查看实战项目<Icon name="arrow"/></a></div></>;
}
export function PathDetail({ id }) {
  const path = paths.find(item => item.id === id);
  const { learning } = useLearning();
  if (!path) return <NotFound/>;
  const progress = getPathProgress(path, learning);
  return <><a className="back-link" href="#/paths">学习路线 / {labels[id]}</a><PageHeading title={path.title} description={path.subtitle}/>
    <div className="route-detail-layout"><div>
      {id === 'starter' && <div className="path-starter-choice"><p>这条基础路线默认用豆包练习。想用 WorkBuddy 处理电脑文件，也有独立教程。</p><a className="text-link" href="#/start">选择豆包或 WorkBuddy<Icon name="arrow" size={16}/></a></div>}
      <ReadinessPanel key={id} setupId={routeSetups[id]}><a className="button primary" href={learnHref(progress.next, id)}>{progress.done === progress.total ? '重温这条路线' : progress.done ? '继续学习' : '从第 1 课开始'}<Icon name="arrow"/></a></ReadinessPanel>
      {['starter', 'builder'].includes(id) && <a className="starter-practice-link" href={learnHref(id === 'starter' ? 'doubao-notice' : 'codex-web', id)}>{id === 'starter' ? '已有基础？直接进入豆包网页实操' : '网络和应用已经准备好？直接进入 ChatGPT 网页实操'}<Icon name="arrow" size={16}/></a>}
      <h2 className="section-title">这条路线怎么学</h2><ol className="path-steps">{path.sequence.map((lessonId, i) => { const lesson = lessonById[lessonId]; const done = learning.completed.includes(lessonId); return <li key={lessonId}><span className={'step-number ' + (done ? 'done' : '')}>{done ? <Icon name="check"/> : String(i + 1).padStart(2, '0')}</span><div><h3><a href={learnHref(lessonId, id)}>{lesson.title}</a></h3><p>{lesson.description}</p>{lesson.platform === 'desktop' && <span className="tag">电脑实操</span>}{id === 'starter' && lesson.platform === 'web' && <span className="tag">网页实操 · 附练习材料</span>}</div><a className="icon-button" href={learnHref(lessonId, id)} aria-label={'学习：' + lesson.title}><Icon name="chevron"/></a></li>; })}</ol>
      {id === 'starter' && <section className="starter-elective"><h2>完成后，再按需要选学</h2><p>想处理电脑上的文档与文件，再学习桌面工作模式。这部分不计入六课入门进度。</p><a className="text-link" href={learnHref('doubao-work-start')}>豆包桌面工作模式：准备与首次使用<Icon name="arrow" size={16}/></a></section>}
      {path.electives && <details className="route-electives"><summary>其他工具与进阶选学<Icon name="down" size={16}/></summary><p>这些内容不计入主线进度，按需要选择即可。</p>{path.electives.map(lessonId => <a key={lessonId} className="text-link" href={learnHref(lessonId)}>{lessonById[lessonId].title}<Icon name="arrow" size={16}/></a>)}</details>}
    </div><aside className="route-summary"><h2>学完后，你会带走</h2><p>{path.outcome}</p><p>{progress.done} / {progress.total} 课已完成</p><Progress value={progress.percent} label="路线总进度"/><p>{id === 'starter' ? '手机可阅读；网页实操截图以电脑浏览器为例。成果可以下载成 TXT。' : '练习材料随课提供。记录可在“我的成果”中继续编辑和导出。'}</p><a className="text-link" href={id === 'network' ? '#/path/builder' : path.projectId ? '#/project/' + path.projectId : id === 'developer' ? '#/models' : '#/project/research-note'}>{id === 'network' ? '进入 ChatGPT 网页路线' : id === 'developer' ? '选择具体厂商接口' : '进入对应实战项目'}<Icon name="arrow"/></a></aside></div></>;
}
