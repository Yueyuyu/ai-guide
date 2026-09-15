import registry from './source-review.json' with { type: 'json' };

export const reviewLabels = { documented: '关键步骤有官方依据', partial: '部分步骤待核对', practice: '本站通用练习' };
export const reviewDate = value => value ? new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium', timeZone: 'Asia/Shanghai' }).format(new Date(value)) : '未披露';
const withSources = review => ({ ...review, sources: review.sourceIds.map(id => registry.sources[id]) });
export function getProductReview(id) {
  return registry.products[id] ? withSources(registry.products[id]) : null;
}
export function getLessonReview(lesson) {
  if (registry.lessons?.[lesson.id]) return withSources(registry.lessons[lesson.id]);
  if (lesson.productId) return getProductReview(lesson.productId);
  const sourceIds = [...new Set(lesson.tools.flatMap(id => registry.products[id]?.sourceIds || []))].filter(id => registry.sources[id].status === 'reviewed');
  // 通用课引用更新后的来源时，来源核对时间不能仍早于资料的获取时间。
  const checkedAt = sourceIds.reduce((latest, id) => registry.sources[id].reviewedAt > latest ? registry.sources[id].reviewedAt : latest, registry.reviewedAt);
  return withSources({ status: 'practice', checkedAt, sourceIds, scope: '这是一篇本站编写的通用方法与练习，官方资料用于解释产品关系和使用条件；日期反映所引用来源的最近核对。', limit: '练习提示、预期结果与检查表不代表官方承诺，也不代表在所列软件中逐一实操通过。' });
}
