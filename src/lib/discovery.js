import { tools, lessons, paths, companies, lessonById } from '../data/index.js';

export const lessonTypes = [
  { id: 'all', name: '全部' }, { id: 'concept', name: '基础概念' }, { id: 'setup', name: '安装准备' },
  { id: 'operation', name: '软件操作' }, { id: 'api', name: '模型接入' }, { id: 'project', name: '项目实践' },
];
export function lessonType(lesson) {
  if (lesson.lessonType) return lesson.lessonType;
  if (lesson.platform === 'api' || lesson.id === 'api-first') return 'api';
  return lesson.productId ? 'operation' : lesson.category === 'basics' ? 'concept' : 'project';
}
export const typeName = lesson => lessonTypes.find(type => type.id === lessonType(lesson))?.name || '教程';
export const learnHref = (id, pathId) => '#/learn/' + encodeURIComponent(id) + (pathId ? '?path=' + encodeURIComponent(pathId) : '');
export function resultHref(lesson, pathId) {
  const href = learnHref(lesson.id, pathId);
  const index = lesson.sections.findIndex(section => section.resultEditor);
  return index < 0 ? href : href + (pathId ? '&' : '?') + 'section=section-' + index;
}
export const productHref = tool => (tool.kind === 'model' ? '#/model/' : '#/tool/') + tool.id;
export function readingContext(id, pathId) {
  const path = paths.find(item => item.id === pathId && item.sequence.includes(id));
  const sequence = path?.sequence || [];
  const index = sequence.indexOf(id);
  return { path, index, previous: lessonById[sequence[index - 1]], next: lessonById[sequence[index + 1]] };
}
export function searchContent(query) {
  const tokens = query.toLowerCase().trim().split(/\s+/u).filter(Boolean);
  const matches = values => tokens.length > 0 && tokens.every(token => values.join(' ').toLowerCase().includes(token));
  const products = tools.filter(tool => matches([tool.name, tool.maker, ...tool.use, ...(tool.aliases || []), companies.find(c => c.toolIds.includes(tool.id))?.name || '']));
  const foundLessons = lessons.filter(lesson => matches([lesson.title, lesson.description, ...lesson.tools.flatMap(id => { const tool = tools.find(t => t.id === id); return tool ? [tool.name, tool.maker, ...(tool.aliases || [])] : []; })]));
  const routes = paths.filter(path => matches([path.title, path.subtitle, ...path.sequence.map(id => lessonById[id]?.title || '')]));
  return { products: products.filter(t => t.kind !== 'model'), models: products.filter(t => t.kind === 'model'), lessons: foundLessons, paths: routes };
}
