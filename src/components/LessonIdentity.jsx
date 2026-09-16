import React from 'react';
import { lessonIdentity } from '../data/tutorial-presentation.js';
import { TutorialSymbol } from './TutorialSymbol.jsx';

export function LessonIdentity({ lesson }) {
  const identity = lessonIdentity(lesson);
  if (!identity) return null;
  return <a className="lesson-product" href={identity.href} target="_blank" rel="noreferrer" aria-label={identity.name + ' 官方入口'}>
    <span className={'lesson-product-logo brand-' + identity.brand}><img src={import.meta.env.BASE_URL + 'brands/' + identity.logo} alt="" width="28" height="28"/></span>
    <strong>{identity.name}</strong><span className="lesson-product-platform">{identity.platform}</span><TutorialSymbol name="external" size={14}/>
  </a>;
}
