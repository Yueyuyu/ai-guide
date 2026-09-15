import React, { useEffect, useRef, useState } from 'react';
import { useLearning } from '../lib/hooks.jsx';
import { learnHref } from '../lib/discovery.js';
import { Icon } from './Icon.jsx';
import { BrandLogo } from './GuideArt.jsx';
import { Modal } from './Modal.jsx';

const nav = [{ page: 'paths', href: '#/paths', title: '学习路线', icon: 'route' }, { page: 'tools', href: '#/tools', title: '工具教程', icon: 'grid' }, { page: 'models', href: '#/models', title: '模型指南', icon: 'box' }];
export function Shell({ route, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const { learning } = useLearning();
  const current = learning.history.find(id => !learning.completed.includes(id)) || learning.history[0];
  const continueUrl = current ? learnHref(current, learning.contexts?.[current]) : '#/library';
  const active = ({ discover: 'paths', learn: 'paths', path: 'paths', company: 'tools', tool: 'tools', tutorials: 'tools', model: 'models', ranking: 'models' })[route.page] || route.page;
  useEffect(() => setMenuOpen(false), [route.path]);
  useEffect(() => {
    const key = event => {
      const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if (((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !editing)) {
        event.preventDefault(); setMenuOpen(false);
        const input = document.getElementById('global-search');
        if (input) input.focus(); else window.location.hash = '#/search';
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);
  return <>
    <a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>跳到主要内容</a>
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="#/" aria-label="AIGuide 首页"><BrandLogo/><strong>AIGuide</strong></a>
      <nav className="desktop-nav" aria-label="主导航">{nav.map(item => <a key={item.page} href={item.href} aria-current={active === item.page ? 'page' : undefined}>{item.title}</a>)}</nav>
      <div className="header-actions"><a className="icon-button" href="#/search" aria-label="搜索教程与工具"><Icon name="search"/></a><a className="continue-link" href={continueUrl}>继续学习<Icon name="arrow"/></a><button ref={menuButton} type="button" className="icon-button mobile-menu-button" aria-label="打开导航" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu"/></button></div>
    </div></header>
    <main id="main" tabIndex={-1} className={'main page-' + route.page}><div className="content">{children}</div></main>
    <footer className="site-footer"><span>先学会使用，再慢慢深入。</span><nav aria-label="页尾导航"><a href="#/tutorials">全部教程</a><a href="#/projects">实战项目</a><a href="#/library">我的学习</a><a href="#/feedback">试用与反馈</a><a href="#/about">关于与来源</a></nav><a href="#/">AIGuide</a></footer>
    <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="AIGuide" className="navigation-dialog"><small>学习导航</small><nav aria-label="手机主导航">{nav.map(item => <a key={item.page} href={item.href} onClick={() => setMenuOpen(false)}><Icon name={item.icon}/><strong>{item.title}</strong><Icon name="chevron"/></a>)}</nav><small>更多内容</small><nav aria-label="更多内容">{[['#/tutorials', '全部教程', 'file'], ['#/projects', '实战项目', 'code'], ['#/library', '我的学习', 'bookmark']].map(([href, title, icon]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><Icon name={icon}/>{title}<Icon name="chevron"/></a>)}</nav><div className="soft-panel"><h3>第一次来？</h3><p>从入门路线开始。</p><a href="#/path/starter" className="button primary" onClick={() => setMenuOpen(false)}>开始入门路线<Icon name="arrow"/></a></div></Modal>
  </>;
}
