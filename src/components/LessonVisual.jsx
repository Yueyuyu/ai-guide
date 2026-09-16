import React from 'react';
import '../styles-tutorial-visual.css';
import { copyText, useLearning } from '../lib/hooks.jsx';

// 图解只表达步骤或核对关系，不伪装成真实产品界面。
export function LessonVisual({ visual }) {
  const { notify } = useLearning();
  return <figure className={'lesson-visual lesson-visual-' + (visual.kind || 'flow')}>
    <figcaption><span>{visual.label || '步骤图解 · 非软件截图'}</span><strong>{visual.title}</strong></figcaption>
    <ol className="lesson-visual-items">{visual.items.map((item, index) => <li key={item.title}>
      <span className="visual-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><strong>{item.title}</strong>{item.text && <p>{item.text}</p>}{item.code && <><code>{item.code}</code><button className="visual-copy" type="button" onClick={() => copyText(item.code, notify)} aria-label={'复制命令：' + item.code}>复制命令</button></>}</div>
    </li>)}</ol>
    {visual.note && <p className="visual-note">{visual.note}</p>}
  </figure>;
}
