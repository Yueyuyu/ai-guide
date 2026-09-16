import React from 'react';
import { Icon } from './Icon.jsx';
import { PromptBlock } from './Shared.jsx';
import { RelationshipDiagram } from './GuideArt.jsx';
import { TutorialImage } from './TutorialImage.jsx';
import { LessonPractice } from './LessonPractice.jsx';
import { LessonVisual } from './LessonVisual.jsx';
import { LessonWalkthrough } from './LessonWalkthrough.jsx';

export function LessonSection({ section, index, lesson, onZoom }) {
  const instructions = <div className="lesson-instructions">
    {section.paragraphs.map(p => <p key={p}>{p}</p>)}
    {section.downloads && <div className="lesson-resource-links">{section.downloads.map(item => <a key={item.href} href={import.meta.env.BASE_URL + item.href} download={item.filename} className="button secondary"><Icon name="download"/>{item.label}</a>)}</div>}
    {section.actionSteps && <ol className="lesson-action-steps">{section.actionSteps.map(step => <li key={step}>{step}</li>)}</ol>}
  </div>;
  return <section id={'section-' + index} tabIndex={-1} className="article-section prose-section">
    <h2><span>{index + 1}</span>{section.title}</h2>
    {section.screenshot ? <div className="lesson-visual-step">{instructions}<TutorialImage screenshot={section.screenshot} showNotes={!section.actionSteps}/></div> : section.visual ? <div className="lesson-diagram-step">{instructions}<LessonVisual visual={section.visual}/></div> : instructions}
    {section.walkthrough && <LessonWalkthrough steps={section.walkthrough} title={section.title}/>}
    {section.diagram && <figure><button type="button" className="diagram-button" onClick={onZoom} aria-label="放大公司、软件与模型关系示意"><RelationshipDiagram/></button><figcaption>关系示意 · 点击可放大</figcaption></figure>}
    {section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
    {section.prompt && <PromptBlock text={section.prompt} label={section.promptLabel} preview={section.promptPreview}/>}
    {section.code && <PromptBlock text={section.code} label={section.language}/>}
    <LessonPractice section={section} lesson={lesson}/>
    {section.supplement && <details className="lesson-supplement"><summary>{section.supplement.title || '补充说明'}<Icon name="down" size={16}/></summary>{section.supplement.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.supplement.list && <ul>{section.supplement.list.map(item => <li key={item}>{item}</li>)}</ul>}</details>}
    {section.checkpoint && <div className="step-check"><Icon name="check"/><p>{section.checkpoint}</p></div>}
  </section>;
}
