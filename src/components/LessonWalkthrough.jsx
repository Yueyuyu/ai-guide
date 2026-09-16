import React, { useState } from 'react';
import { TutorialImage } from './TutorialImage.jsx';
import { Icon } from './Icon.jsx';

// 子步骤不写学习记录，保留原课程章节与完成状态。
export function LessonWalkthrough({ steps, title }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return <div className="lesson-walkthrough" aria-label={title + '图文步骤'}>
    <ol className="walkthrough-tabs" aria-label="选择操作步骤">{steps.map((item, index) => <li key={item.title}><button type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{index + 1}</span>{item.title}</button></li>)}</ol>
    <div className="walkthrough-current">
      <p className="walkthrough-action"><strong>{active + 1} / {steps.length}</strong>{step.action}</p>
      <TutorialImage key={active} screenshot={step.screenshot} showNotes={false}/>
      <div className="walkthrough-bottom"><p className="walkthrough-check"><Icon name="check" size={18}/><span><strong>完成标准</strong>{step.checkpoint}</span></p>{steps.length > 1 && <div className="walkthrough-controls"><button type="button" className="button secondary" disabled={active === 0} onClick={() => setActive(active - 1)}>上一步</button><button type="button" className="button secondary" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>下一步</button></div>}</div>
    </div>
  </div>;
}
