import React from 'react';
import '../styles-tutorial-visual.css';
import { copyText, useLearning } from '../lib/hooks.jsx';
import { visualSymbol } from '../data/tutorial-presentation.js';
import { TutorialSymbol } from './TutorialSymbol.jsx';

// 图解只表达步骤或核对关系，不伪装成真实产品界面。
export function LessonVisual({ visual }) {
  const { notify } = useLearning();
  return <figure className={'lesson-visual lesson-visual-' + (visual.kind || 'flow')}>
    <figcaption><strong>{visual.title}</strong><span>{visual.label || '步骤图解 · 非软件截图'}</span></figcaption>
    <ol className={'lesson-visual-items visual-count-' + visual.items.length}>{visual.items.map((item, index) => <li key={item.title}>
      <span className="visual-symbol" aria-hidden="true">{item.logo ? <img src={import.meta.env.BASE_URL + 'brands/' + item.logo} alt="" width="28" height="28"/> : <TutorialSymbol name={visualSymbol(item, visual, index)}/>}</span>
      <div className="visual-item-content"><strong><span className="visual-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.title}</strong>{item.text && <p>{item.text}</p>}{item.code && <><code>{item.code}</code><button className="visual-copy" type="button" onClick={() => copyText(item.code, notify)} aria-label={'复制命令：' + item.code}><TutorialSymbol name="terminal" size={14}/>复制命令</button></>}</div>
    </li>)}</ol>
    {visual.note && <p className="visual-note">{visual.note}</p>}
  </figure>;
}
