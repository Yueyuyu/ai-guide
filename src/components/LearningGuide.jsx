import React, { useId, useState } from 'react';
import { learningSetups } from '../data/learning-guidance.js';
import { Icon } from './Icon.jsx';
import { PromptBlock } from './Shared.jsx';
import '../styles-guidance.css';

export function ReadinessPanel({ setupId, children }) {
  const setup = learningSetups[setupId];
  const [checked, setChecked] = useState([]);
  if (!setup) return null;
  return <section className="readiness-panel" aria-label="开始前准备">
    <p className="guide-eyebrow">开始前 · 先确认这几件事</p><h2>{setup.title}</h2>
    <dl className="readiness-facts">{setup.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <details className="readiness-checks"><summary>我已经准备好了吗？<Icon name="down" size={16}/></summary>
      <div>{setup.checks.map((check, index) => <label key={check}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}/><span>{check}</span></label>)}</div>
      <p role="status">{checked.length === setup.checks.length ? '准备项已自查，可以尝试第一步；能否实际运行仍需在产品中确认。' : `${checked.length} / ${setup.checks.length} 项已自查。尚未准备好，也可以先阅读材料。`}</p>
      <small>这是本页准备自查，刷新后重置，不计入课程完成记录。</small>
    </details>
    <div className="guide-actions">{children}{setup.entry && <a className="text-link" href={setup.entry.href} target="_blank" rel="noreferrer">{setup.entry.label}<Icon name="external" size={16}/></a>}</div>
    <details className="readiness-fallback"><summary>暂时不满足条件</summary><p>{setup.fallback}</p>{setup.fallbackLink && <a className="text-link" href={setup.fallbackLink.href}>{setup.fallbackLink.label}<Icon name="arrow" size={16}/></a>}</details>
  </section>;
}

export function LessonFlow({ steps }) {
  return <figure className="lesson-flow"><ol>{steps.map(([place, action], index) => <li key={place + action}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{place}</strong><p>{action}</p></div></li>)}</ol><figcaption>本站操作示意 · 按顺序完成，不是软件截图</figcaption></figure>;
}

export function Troubleshooter({ items, onGo }) {
  const [selected, setSelected] = useState('');
  const selectId = useId();
  const issue = items.find(item => item.id === selected);
  return <div className="lesson-troubleshooter">
    <label htmlFor={selectId}>你卡在哪一步？</label><select id={selectId} value={selected} onChange={event => setSelected(event.target.value)}><option value="">选择当前遇到的情况</option>{items.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select>
    <div aria-live="polite">{issue ? <div className="trouble-answer"><h3>{issue.title}</h3><ol>{issue.steps.map(step => <li key={step}>{step}</li>)}</ol>{issue.prompt && <PromptBlock text={issue.prompt} label="可复制的求助提示"/>}<button type="button" className="button secondary" onClick={() => onGo('section-' + issue.section)}>回到相关步骤<Icon name="arrow" size={16}/></button></div> : <p className="fine-print">选中后会显示处理办法和返回对应步骤的入口。</p>}</div>
  </div>;
}
