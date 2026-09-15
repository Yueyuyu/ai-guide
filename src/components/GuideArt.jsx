import React from 'react';
import { Icon } from './Icon.jsx';

export function BrandLogo() {
  return <svg viewBox="0 0 42 40" width="36" height="36" aria-hidden="true"><defs><linearGradient id="book-blue" x2="0" y2="1"><stop stopColor="#75a8ff"/><stop offset="1" stopColor="#4783ff"/></linearGradient></defs><path fill="#2864ff" d="M3 8Q3 5 6 6L18 11V31L7 37Q3 39 3 35Z"/><path fill="url(#book-blue)" d="M23 6L33 1Q36 0 38 4V34Q38 39 34 37L23 31Z"/></svg>;
}
export function CourseArt({ kind = 'brain', compact = false }) {
  if (kind === 'layers') return <div className={'course-art layers-art ' + (compact ? 'compact-art' : '')} aria-hidden="true"><div>应用</div>{!compact && <small>像 ChatGPT 这样的软件</small>}<i/><div>模型</div>{!compact && <small>像 GPT 这样的 AI 模型</small>}</div>;
  if (kind === 'chat') return <svg className="course-art" viewBox="0 0 210 165" aria-hidden="true"><path fill="#e4e9f0" d="M23 28h103q17 0 17 18v53q0 16-17 16H43l-25 16V45q0-17 17-17Z"/><path stroke="#b5c1d1" strokeWidth="7" strokeLinecap="round" d="M38 51h76M38 67h60"/><path fill="#2864ff" d="M125 87h59q19 0 19 18v32l8 20-28-11h-58q-18 0-18-18v-23q0-18 18-18Z"/><g fill="white"><circle cx="135" cy="116" r="5"/><circle cx="154" cy="116" r="5"/><circle cx="173" cy="116" r="5"/></g></svg>;
  if (kind !== 'brain') return <div className={'course-art generic-art art-' + kind} aria-hidden="true"><Icon name={kind} size={80}/></div>;
  return <svg className="course-art" viewBox="0 0 210 180" fill="none" stroke="#83b4ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M68 171v-15H50q-8 0-8-8v-21l-12-4 12-21c0-34 21-63 58-63 36 0 61 25 61 56 0 20-8 34-23 47v29"/><path d="M80 69c-14-5-25 8-20 21-10 9-7 27 7 30 1 15 19 20 30 10 8 11 25 8 29-4 16-1 23-19 13-30 3-12-4-22-16-23-9-15-29-16-37-2"/><path d="M96 75v50m0-30c-20-10-25 12-9 17m10-22c12-17 27-2 18 10m-5 18c17 7 23-12 12-18M82 70c-3 12 9 14 14 12"/><path d="M103 25V10M159 44l11-12M174 81h17M50 40 40 29"/></svg>;
}
export function RelationshipDiagram() {
  return <div className="relation-diagram" role="img" aria-label="公司开发应用软件与模型；模型为软件提供能力"><div className="relation-company"><Icon name="grid" size={28}/><span><strong>公司</strong><small>开发与提供</small></span></div><div className="relation-branches"/><div className="relation-bottom"><div><Icon name="desktop" size={32}/><span><strong>应用软件</strong><small>提供操作界面</small></span></div><span className="relation-arrow"><small>提供能力</small>⟵</span><div><Icon name="box" size={32}/><span><strong>AI 模型</strong><small>处理输入、生成回答</small></span></div></div></div>;
}
