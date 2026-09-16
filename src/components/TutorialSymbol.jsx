import React from 'react';
import { tutorialSymbols } from '../data/tutorial-presentation.js';

export function TutorialSymbol({ name, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tutorialSymbols[name] || tutorialSymbols.arrow}/></svg>;
}
