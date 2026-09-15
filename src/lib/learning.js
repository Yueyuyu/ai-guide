import { lessons, lessonById, categories, tools, platforms, paths } from '../data/index.js';
import { projectStages } from '../data/project-stages.js';
import { MAX_RESULT_LENGTH } from './practice-files.js';

export const STORAGE_KEY = 'zhixing-ai-learning-v1';
export const emptyLearning = () => ({ version: 1, saved: [], completed: [], exercises: {}, history: [], contexts: {}, locations: {}, projectChecks: {}, projectCompleted: {}, drafts: {} });

// 读取失败时保留原始存储；由用户选择恢复后，才允许再次写入。
export function readStoredLearning(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return { learning: emptyLearning(), blocked: false };
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !['saved', 'completed', 'history'].every(key => Array.isArray(value[key])) || !value.exercises || typeof value.exercises !== 'object' || Array.isArray(value.exercises)) throw new Error('invalid-learning');
    return { learning: normalizeLearning(value), blocked: false };
  } catch {
    return { learning: emptyLearning(), blocked: true };
  }
}

// 导入文件和本地存储均不可信，只保留当前目录存在的教程与合法进度。
export function normalizeLearning(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyLearning();
  const uniqueIds = source => Array.isArray(source) ? [...new Set(source.filter(id => typeof id === 'string' && Object.hasOwn(lessonById, id)))] : [];
  const exercises = {};
  for (const lesson of lessons) {
    const items = value.exercises?.[lesson.id];
    if (Array.isArray(items)) exercises[lesson.id] = [...new Set(items.filter(i => Number.isInteger(i) && i >= 0 && i < lesson.exercises.length))];
  }
  const contexts = {}, locations = {}, projectChecks = {}, projectCompleted = {}, drafts = {};
  for (const lesson of lessons) {
    const draft = value.drafts?.[lesson.id];
    if (lesson.resultSaving && typeof draft === 'string' && draft.trim() && draft.length <= MAX_RESULT_LENGTH) drafts[lesson.id] = draft;
    if (paths.some(path => path.id === value.contexts?.[lesson.id] && path.sequence.includes(lesson.id))) contexts[lesson.id] = value.contexts[lesson.id];
    const section = value.locations?.[lesson.id];
    if (['goals', 'practice', 'sources', ...(lesson.guide?.help ? ['help'] : []), ...lesson.sections.map((_, i) => 'section-' + i)].includes(section)) locations[lesson.id] = section;
  }
  for (const [id, stages] of Object.entries(projectStages)) {
    const checked = Array.isArray(value.projectChecks?.[id]) ? [...new Set(value.projectChecks[id].filter(i => Number.isInteger(i) && i >= 0 && i < stages.length * 2))] : [];
    const completed = Array.isArray(value.projectCompleted?.[id]) ? [...new Set(value.projectCompleted[id].filter(i => Number.isInteger(i) && i >= 0 && i < stages.length && checked.includes(i * 2) && checked.includes(i * 2 + 1)))] : [];
    if (checked.length) projectChecks[id] = checked;
    if (completed.length) projectCompleted[id] = completed;
  }
  return { version: 1, saved: uniqueIds(value.saved), completed: uniqueIds(value.completed).filter(id => exercises[id]?.length === lessonById[id].exercises.length), exercises, history: uniqueIds(value.history).slice(0, 30), contexts, locations, projectChecks, projectCompleted, drafts };
}

export function updateLearning(state, action) {
  const next = normalizeLearning(state);
  if (Object.hasOwn(projectStages, action.id) && ['project-check', 'project-complete'].includes(action.type)) {
    const checked = next.projectChecks[action.id] || [];
    const completed = next.projectCompleted[action.id] || [];
    if (action.type === 'project-check' && Number.isInteger(action.index) && action.index >= 0 && action.index < projectStages[action.id].length * 2) next.projectChecks[action.id] = checked.includes(action.index) ? checked.filter(i => i !== action.index) : [...checked, action.index];
    if (action.type === 'project-complete' && Number.isInteger(action.index) && action.index >= 0 && action.index < projectStages[action.id].length) {
      if (completed.includes(action.index)) next.projectCompleted[action.id] = completed.filter(i => i !== action.index);
      else if (checked.includes(action.index * 2) && checked.includes(action.index * 2 + 1)) next.projectCompleted[action.id] = [...completed, action.index];
    }
    return normalizeLearning(next);
  }
  if (!Object.hasOwn(lessonById, action.id)) return next;
  const { id } = action;
  if (action.type === 'draft' && lessonById[id].resultSaving && typeof action.text === 'string' && action.text.length <= MAX_RESULT_LENGTH) {
    if (action.text.trim()) next.drafts[id] = action.text;
    else delete next.drafts[id];
  }
  if (action.type === 'save') next.saved = next.saved.includes(id) ? next.saved.filter(x => x !== id) : [...next.saved, id];
  if (action.type === 'visit') {
    next.history = [id, ...next.history.filter(x => x !== id)].slice(0, 30);
    if (paths.some(path => path.id === action.pathId && path.sequence.includes(id))) next.contexts[id] = action.pathId;
  }
  if (action.type === 'location') {
    next.locations[id] = action.section;
    return normalizeLearning(next);
  }
  if (action.type === 'exercise' && Number.isInteger(action.index) && action.index >= 0 && action.index < lessonById[id].exercises.length) {
    const current = next.exercises[id] || [];
    next.exercises[id] = current.includes(action.index) ? current.filter(i => i !== action.index) : [...current, action.index];
    if (next.exercises[id].length !== lessonById[id].exercises.length) next.completed = next.completed.filter(x => x !== id);
  }
  if (action.type === 'complete') {
    if (next.completed.includes(id)) next.completed = next.completed.filter(x => x !== id);
    else if (next.exercises[id]?.length === lessonById[id].exercises.length) next.completed = [...next.completed, id];
  }
  return next;
}

export function filterLessons(all, { query = '', category = 'all', level = 'all', tool = 'all', platform = 'all' } = {}) {
  const tokens = query.trim().toLocaleLowerCase().split(/\s+/u).filter(Boolean);
  return all.filter(lesson => {
    const topicTerms = tools.filter(tool => lesson.tools.includes(tool.id)).flatMap(tool => [tool.name, tool.short, tool.maker, ...(tool.aliases || [])]);
    const haystack = [lesson.title, lesson.description, lesson.category, lesson.level, platforms.find(item => item.id === lesson.platform)?.name, categories.find(category => category.id === lesson.category)?.name, ...lesson.tools, ...topicTerms, ...lesson.goals].join(' ').toLocaleLowerCase();
    return (category === 'all' || lesson.category === category) && (level === 'all' || lesson.level === level) && (tool === 'all' || lesson.tools.includes(tool)) && (platform === 'all' || lesson.platform === platform) && tokens.every(token => haystack.includes(token));
  });
}

export function getPathProgress(path, state) {
  const done = path.sequence.filter(id => state.completed.includes(id)).length;
  return { done, total: path.sequence.length, percent: Math.round(done / path.sequence.length * 100), next: path.sequence.find(id => !state.completed.includes(id)) || path.sequence[0] };
}

export function parseRoute(hash) {
  const [path = '/', search = ''] = hash.replace(/^#/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  return { page: parts[0] || 'discover', id: parts[1] || '', params: new URLSearchParams(search), path };
}

export function catalogUrl(values = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) if (value && value !== 'all') params.set(key, value);
  return '#/tutorials' + (params.size ? '?' + params.toString() : '');
}
