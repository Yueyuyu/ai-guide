import React, { useEffect, useRef, useState } from 'react';
import { lessonById } from '../data/index.js';
import { useLearning } from '../lib/hooks.jsx';
import { learnHref, readingContext, typeName } from '../lib/discovery.js';
import { Icon } from '../components/Icon.jsx';
import { NotFound, SaveButton } from '../components/Shared.jsx';
import { LessonEntry } from '../components/LessonEntry.jsx';
import { RelationshipDiagram } from '../components/GuideArt.jsx';
import { SourceReview } from '../components/SourceReview.jsx';
import { reviewLabels, reviewDate } from '../data/source-review.js';
import { Modal } from '../components/Modal.jsx';
import { LessonSection } from '../components/LessonSection.jsx';
import { LessonFlow, ReadinessPanel, Troubleshooter } from '../components/LearningGuide.jsx';
import { LessonFeedback } from '../components/LessonFeedback.jsx';
import '../styles-practice.css';
import '../styles-lesson.css';

export function Reader({ id, pathId, startSection }) {
  const lesson = Object.hasOwn(lessonById, id) ? lessonById[id] : undefined;
  const { learning, dispatch, notify } = useLearning();
  const context = readingContext(id, pathId);
  const validStart = lesson && ['goals', 'practice', 'sources', ...(lesson.guide?.help ? ['help'] : []), ...lesson.sections.map((_, index) => 'section-' + index)].includes(startSection);
  const savedSection = useRef(validStart ? startSection : learning.locations?.[id]);
  const [active, setActive] = useState(savedSection.current || 'goals');
  const [zoom, setZoom] = useState(false);
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState(false);
  const mobileToc = useRef(null);
  useEffect(() => { if (lesson) dispatch({ type: 'visit', id, pathId: context.path?.id }); }, [id, lesson, context.path?.id, dispatch]);
  useEffect(() => {
    if (!lesson) return;
    const frame = requestAnimationFrame(() => {
      if (savedSection.current) document.getElementById(savedSection.current)?.scrollIntoView({ block: 'start' });
    });
    const observer = new IntersectionObserver(entries => {
      const entry = entries.find(e => e.isIntersecting);
      if (entry) { setActive(entry.target.id); dispatch({ type: 'location', id, section: entry.target.id }); }
    }, { rootMargin: '-100px 0px -55% 0px' });
    document.querySelectorAll('.article-section').forEach(section => observer.observe(section));
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [id, lesson, dispatch]);
  if (!lesson) return <NotFound/>;
  const checked = learning.exercises[id] || [];
  const completed = learning.completed.includes(id);
  const allChecked = checked.length === lesson.exercises.length;
  const toc = [{ id: 'goals', title: '这一课学什么' }, ...lesson.sections.map((s, i) => ({ id: 'section-' + i, title: s.title })), ...(lesson.guide?.help ? [{ id: 'help', title: '遇到问题，找到下一步' }] : []), { id: 'practice', title: '练习与核对' }, { id: 'sources', title: '继续了解' }];
  const go = section => {
    // 先收起目录再计算章节位置，否则目录折叠会把目标标题推到屏幕上方。
    if (mobileToc.current) mobileToc.current.open = false;
    document.getElementById(section)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    document.getElementById(section)?.focus({ preventScroll: true });
    setActive(section);
  };
  const contents = <nav aria-label="本篇目录">{toc.map(item => <button key={item.id} type="button" className={active === item.id ? 'active' : ''} onClick={() => go(item.id)}>{item.title}</button>)}</nav>;
  const nextHref = context.next ? learnHref(context.next.id, context.path.id) : context.path ? '#/path/' + context.path.id : '#/tutorials';
  const resultSection = 'section-' + lesson.sections.findIndex(section => section.resultEditor);
  return <div className="reader-layout"><article className="reader">
    <nav className="breadcrumb" aria-label="面包屑"><a href={context.path ? '#/path/' + context.path.id : '#/tutorials'}>{context.path?.title || '全部教程'}</a><span>/</span><span>{context.path ? '第 ' + String(context.index + 1).padStart(2, '0') + ' 课' : typeName(lesson)}</span></nav>
    <h1>{lesson.title}</h1><p className="article-description">{lesson.description}</p><div className="article-actions"><span>{typeName(lesson)}</span><a className="review-badge" href="#sources" onClick={e => { e.preventDefault(); go('sources'); }}>{reviewLabels[lesson.review.status]} · {reviewDate(lesson.review.checkedAt)}</a><SaveButton lesson={lesson} text/>{completed && <span className="tag">已完成</span>}</div>
    <details ref={mobileToc} className="mobile-toc"><summary>本篇目录<Icon name="down"/></summary>{contents}</details>
    <section className="lesson-brief article-section" id="goals" tabIndex={-1}><span>约 {lesson.minutes} 分钟</span><p>{lesson.goals.join(' → ')}</p></section>
    {lesson.productId && !lesson.guide?.setup && <details className="lesson-supplement"><summary>本课使用的工具与官方入口<Icon name="down" size={16}/></summary><LessonEntry lesson={lesson}/></details>}
    {lesson.draft && <div className="notice warning"><Icon name="file"/><p>本篇为准备与练习清单，产品具体按钮、版本与账号条件待实测核对。</p></div>}
    <details className="lesson-supplement reader-preparation"><summary>开始前准备 · 设备、账号与费用<Icon name="down" size={16}/></summary>{lesson.guide?.setup ? <ReadinessPanel setupId={lesson.guide.setup}/> : <p>{lesson.prerequisite}</p>}</details>
    {lesson.guide && <>
      <details className="lesson-supplement"><summary>查看流程与实测范围<Icon name="down" size={16}/></summary><p className="lesson-evidence">{lesson.guide.evidence}</p><LessonFlow steps={lesson.guide.flow}/></details>
      <div className="reader-quick-actions">
        <button className="text-link" type="button" onClick={() => go('help')}>遇到问题<Icon name="arrow" size={16}/></button>
        <button className="text-link" type="button" onClick={() => go(resultSection)}>保存我的成果<Icon name="arrow" size={16}/></button>
      </div>
    </>}
    {lesson.sections.map((section, index) => <LessonSection key={section.title} section={section} index={index} lesson={lesson} onZoom={() => setZoom(true)}/>)}
    {lesson.guide?.help && <section id="help" tabIndex={-1} className="article-section lesson-help-section"><h2>遇到问题，找到下一步</h2><Troubleshooter items={lesson.guide.help} onGo={go}/></section>}
    {id === 'choose-model' && <section className="quiz-box"><h2>做一个小判断</h2><p>你打开 ChatGPT 网页并输入问题，此时正在操作的是？</p><fieldset><legend className="sr-only">选择答案</legend>{[['app', '应用软件'], ['model', '模型本身']].map(([value, label]) => <label key={value}><input type="radio" name="software-question" checked={answer === value} onChange={() => { setAnswer(value); setExplanation(false); }}/>{label}</label>)}</fieldset><button type="button" className="button secondary" onClick={() => setExplanation(true)}>查看解析</button>{explanation && <p className="quiz-feedback" role="status">{!answer ? '请先选择一个答案。' : answer === 'app' ? '答对了。你直接操作的是 ChatGPT 应用，模型在背后处理输入。' : '再想一想：你看到并操作的是应用界面，模型为它提供能力。'}</p>}</section>}
    <aside className="takeaway"><strong>带走这一点</strong><p>{lesson.takeaway}</p></aside>
    <section id="practice" className="article-section practice-box"><h2>练习与核对</h2><p>{lesson.resultSaving ? '按自己的实际操作勾选。读完参考答案、粘贴文字或点击下载，都不等于已完成实操。' : '用自己的话解释一遍，做完一项再勾选一项。'}</p><div className="exercise-list">{lesson.exercises.map((item, index) => <label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={() => dispatch({ type: 'exercise', id, index })}/><span>{item}</span></label>)}</div><div className="practice-actions"><span role="status">{checked.length} / {lesson.exercises.length} 项已核对</span><button type="button" className={'button ' + (completed ? 'secondary' : 'primary')} disabled={!allChecked && !completed} onClick={() => { dispatch({ type: 'complete', id }); notify(completed ? '已撤销完成标记' : '已完成这一课，可以继续学习。'); }}>{completed ? '撤销完成标记' : '标记为已完成'}<Icon name="check"/></button></div></section>
    <section id="sources" className="article-section sources-section"><h2>资料与核对记录</h2><SourceReview review={lesson.review}/><p className="article-note">教程内容整理：{lesson.edited}。教程中的提示与练习由本站整理；资料核对不等于账号内实操通过。</p><a className="text-link" href={import.meta.env.BASE_URL + 'read/' + lesson.id + '.html'}>打开独立阅读页<Icon name="arrow" size={16}/></a><LessonFeedback lesson={lesson}/></section>
    <a className="next-lesson" href={nextHref}><span><small>{context.next ? '下一课' : context.path ? '回到学习路线' : '接着探索'}</small><strong>{context.next?.title || context.path?.title || '查看全部教程'}</strong></span><Icon name="arrow" size={25}/></a>
    </article><aside className="reader-toc"><h2>本篇目录</h2>{contents}<div className="toc-foot"><a className="text-link" href={context.path ? '#/path/' + context.path.id : '#/tutorials'}>{context.path ? '返回路线目录' : '返回全部教程'}<Icon name="arrow"/></a><p>阅读位置保存在当前浏览器。</p></div></aside>
    <Modal open={zoom} onClose={() => setZoom(false)} title="公司、软件与模型" className="diagram-dialog"><RelationshipDiagram/><p className="fine-print">公司开发产品与模型，模型为软件提供能力。此图为关系示意。</p></Modal>
  </div>;
}
