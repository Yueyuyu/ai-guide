import React, { useEffect } from 'react';
import { manuals, getManual } from '../data/manuals/index.js';
import { manualHref, manualResourceHref, manualSectionKinds } from '../data/manual-catalog.js';
import { Icon } from '../components/Icon.jsx';
import { PageHeading, EmptyState, PromptBlock } from '../components/Shared.jsx';
import '../styles-manuals.css';

function OfficialLink({ manual, className = 'button secondary' }) {
  return <a className={className} href={manual.officialUrl} target="_blank" rel="noreferrer" aria-label={'查看 ' + manual.name + ' 官方文档（新窗口）'}>查看官方文档<Icon name="external" size={16}/></a>;
}

function ManualMark({ manual }) {
  return <span className="manual-mark"><img src={import.meta.env.BASE_URL + 'brands/' + manual.logo} alt={manual.maker + ' 品牌图标'} width="36" height="36"/></span>;
}

function ManualIndex() {
  return <div className="manual-index">
    <p className="manual-eyebrow">AIGuide · 中文使用手册</p>
    <PageHeading title="在这里学会，再向官方深入。" description="选一个工具，从准备、第一次任务到检查结果。本站教程与官方文档，两个入口都为你保留。"/>
    <div className="manual-reading-modes"><span><Icon name="file" size={18}/><strong>本站教程</strong>中文步骤、任务示例与核对方法</span><span><Icon name="external" size={18}/><strong>官方文档</strong>原始说明与最新功能</span></div>
    <section className="manual-grid" aria-label="选择使用手册">{manuals.map(manual => <article className={'manual-card tone-' + manual.color} key={manual.id}>
      <header><ManualMark manual={manual}/><div><small>{manual.maker}</small><h2>{manual.name}</h2></div><span className="manual-count">{manual.sections.length} 节</span></header>
      <p>{manual.description}</p><p className="manual-audience">适合：{manual.audience}</p>
      <ul className="manual-card-topics">{manualSectionKinds.filter(kind => kind.id !== 'basics').map(kind => <li key={kind.id}><a href={manualHref(manual.id, manual.sections.find(section => section.kind === kind.id).id)}>{kind.label}<Icon name="arrow" size={13}/></a></li>)}</ul>
      <div className="manual-card-actions"><a className="button primary" href={manualHref(manual.id)} aria-label={'阅读 ' + manual.name + ' 本站教程'}>阅读本站教程<Icon name="arrow" size={17}/></a><OfficialLink manual={manual}/></div>
      <small className="manual-card-meta">本站原创整理 · 官方资料核对 {manual.checkedAt}</small>
    </article>)}</section>
    <p className="fine-print">本站手册是独立编写的中文教程，保留官方来源。资料核对与产品实测分别说明；账号权益、费用和最新界面请以官方文档为准。</p>
  </div>;
}

export function Manuals({ id, section }) {
  const manual = getManual(id);
  useEffect(() => {
    if (!manual) return;
    // Hash 用于页面路由，章节使用查询参数，刷新和后退仍能定位同一节。
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(manual.sections.some(item => item.id === section) ? 'manual-' + section : 'manual-title');
      target?.focus({ preventScroll: true });
      if (section) target?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [manual, section]);
  if (!id) return <ManualIndex/>;
  if (!manual) return <EmptyState title="没有找到这份使用手册" description="可以从手册目录选择 OpenAI、WorkBuddy、ZCode 或 Claude Code。" href="#/manuals" action="返回使用手册" icon="file"/>;
  return <div className="manual-detail">
    <a className="back-link" href="#/manuals">使用手册 / {manual.name}</a>
    <header className="manual-heading"><div><p className="manual-eyebrow">本站教程 · 原创整理</p><h1 id="manual-title" tabIndex={-1}>{manual.title}</h1><p>{manual.description}</p><small>官方资料核对：{manual.checkedAt} · {manual.sections.length} 节</small></div><ManualMark manual={manual}/></header>
    <div className="manual-detail-actions"><OfficialLink manual={manual}/><a className="text-link" href={import.meta.env.BASE_URL + 'manuals/' + manual.id + '.html'}>独立阅读版<Icon name="file" size={16}/></a></div>
    <nav className="manual-topic-nav" aria-label="按内容类型阅读">{manualSectionKinds.map(kind => <a key={kind.id} href={manualHref(manual.id, manual.sections.find(item => item.kind === kind.id).id)}>{kind.label}</a>)}</nav>
    <div className="manual-layout">
      <aside className="manual-sidebar"><details open><summary>本篇目录</summary><nav aria-label="手册章节">{manual.sections.map((item, index) => <a key={item.id} href={manualHref(manual.id, item.id)} aria-current={section === item.id ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</a>)}</nav></details><a className="manual-source-shortcut" href={manual.officialUrl} target="_blank" rel="noreferrer">{manual.officialLabel}<Icon name="external" size={14}/></a></aside>
      <article className="manual-body" aria-label={manual.title}>
        {section && !manual.sections.some(item => item.id === section) && <p className="manual-missing" role="status">未找到链接指定的章节，下面保留完整手册，可从目录重新选择。</p>}
        {manual.sections.map((item, index) => <section className="manual-section" id={'manual-' + item.id} tabIndex={-1} key={item.id}>
          <p className="manual-kind">{manualSectionKinds.find(kind => kind.id === item.kind).label}</p>
          <h2><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</h2>
          {item.paragraphs.map(text => <p key={text}>{text}</p>)}
          {item.caseStudy && <aside className="manual-case"><strong>{item.caseStudy.status === 'recorded' ? '已有实测记录' : '教学练习 · 待产品实测'}</strong><p>{item.caseStudy.scope}</p><p>{item.caseStudy.result}</p></aside>}
          {item.steps && <ol className="manual-steps">{item.steps.map(step => <li key={step}>{step}</li>)}</ol>}
          {item.prompt && <PromptBlock text={item.prompt} label={item.promptLabel || '本站示例任务 · 可复制使用'}/>}
          {item.faq && <div className="manual-faq">{item.faq.map(entry => <details key={entry.question}><summary>{entry.question}</summary><p>{entry.answer}</p></details>)}</div>}
          {item.links && <div className="manual-resources">{item.links.map(link => <a key={link.label} href={manualResourceHref(link, { base: import.meta.env.BASE_URL })} download={link.download} className="text-link">{link.label}<Icon name={link.download ? 'download' : 'arrow'} size={16}/></a>)}</div>}
          <div className="manual-check"><Icon name="check" size={18}/><div><strong>完成后检查</strong><p>{item.check}</p></div></div>
          <div className="manual-section-sources"><span>本节官方参考</span>{item.sourceIds.map(sourceId => { const source = manual.sources.find(source => source.id === sourceId); return <a href={source.url} key={sourceId} target="_blank" rel="noreferrer">{source.title}<Icon name="external" size={13}/></a>; })}</div>
        </section>)}
        {manual.lessons.length > 0 && <section className="manual-next"><h2>继续动手练习</h2>{manual.lessons.map(lesson => <a className="text-link" key={lesson.id} href={'#/learn/' + lesson.id}>{lesson.label}<Icon name="arrow" size={16}/></a>)}</section>}
        <section className="manual-evidence"><h2>来源与核对范围</h2><p>{manual.scope}</p><p>官方资料核对日期：{manual.checkedAt}。本文为本站整理，不是官方译本。示例任务与完成标准用于学习，不代表产品承诺。</p><ul>{manual.sources.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<Icon name="external" size={13}/></a></li>)}</ul></section>
        <a className="text-link" href="#/manuals">返回使用手册目录<Icon name="arrow" size={16}/></a>
      </article>
    </div>
  </div>;
}
