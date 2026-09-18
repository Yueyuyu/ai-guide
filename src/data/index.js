import { foundations } from './foundations.js';
import { modelLessons } from './model-lessons.js';
import { codingLessons } from './coding-lessons.js';
import { desktopLessons } from './desktop-lessons.js';
import { codingEntries } from './coding-entries.js';
import { moreAppLessons } from './more-app-lessons.js';
import { modelGuides } from './model-guides.js';
import { entryGuides, chineseCovers } from './entry-guides.js';
import { starterLessons, starterOverrides } from './starter-lessons.js';
import { getLessonReview } from './source-review.js';
import { researchPractice } from './research-practice.js';
import { writingPractice, weeklyPractice } from './office-practice.js';
import { codexPractice, websiteLessons } from './website-practice.js';
import { apiPractice } from './api-practice.js';
import { lessonGuidance } from './learning-guidance.js';
import { networkPreparation } from './network-preparation.js';
import { workbuddyPractice } from './workbuddy-practice.js';
export { categories, tools, paths, projects, platforms, kindNames, officialSources } from './catalog.js';
export { companies, companyByToolId, featuredCompanies } from './companies.js';

const practiceOverrides = { 'research-first': researchPractice, 'workflow-basics': weeklyPractice, 'codex-web': codexPractice };
export const lessons = [...foundations, ...starterLessons, ...modelLessons, ...codingLessons, ...desktopLessons, ...moreAppLessons, ...codingEntries, ...modelGuides, writingPractice, ...websiteLessons, apiPractice, networkPreparation, workbuddyPractice].map(lesson => {
  const guide = entryGuides[lesson.id];
  const { intro, ...details } = guide || {};
  const result = { platform: 'general', edited: '2026-09-07', ...lesson, ...details, cover: chineseCovers[lesson.id] || details.cover || lesson.cover, sections: intro ? [intro, ...lesson.sections] : lesson.sections };
  Object.assign(result, starterOverrides[lesson.id] || {});
  if (!lesson.edited && (starterOverrides[lesson.id] || starterLessons.some(item => item.id === lesson.id))) result.edited = '2026-09-14';
  Object.assign(result, practiceOverrides[lesson.id] || {});
  result.guide = lessonGuidance[lesson.id];
  result.review = getLessonReview(result);
  // 同一官网可以有多次核对记录；来源入口去重，完整证据仍保留在 review 中。
  result.sources = [...new Map(result.review.sources.map(({ title, url }) => [url, { title, url }])).values()];
  return result;
});
export const lessonById = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson]));
export const featuredLessons = ['chatgpt-files', 'claude-desktop-start', 'codex-web'].map(id => lessonById[id]);
