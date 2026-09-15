const DAY = 86400000;
export const REVIEW_INTERVAL_DAYS = 30;

export function ageInDays(value, now = Date.now()) {
  const timestamp = Date.parse(value);
  const reference = typeof now === 'number' ? now : Date.parse(now);
  if (!Number.isFinite(timestamp) || !Number.isFinite(reference) || timestamp > reference) return null;
  return Math.floor((reference - timestamp) / DAY);
}

export function reviewFreshness(review, now = Date.now()) {
  const sources = (review?.sources || []).filter(source => source.status === 'reviewed');
  // 最近核对其中一份资料，不能把其他旧资料一起刷新为“最新”。
  const ages = sources.length ? sources.map(source => ageInDays(source.reviewedAt || source.retrievedAt, now)) : [ageInDays(review?.checkedAt, now)];
  const age = ages.some(value => value === null) ? null : Math.max(...ages);
  return { age, stale: age !== null && age >= REVIEW_INTERVAL_DAYS, interval: REVIEW_INTERVAL_DAYS };
}

export const correctionTypes = ['步骤或按钮对不上', '链接无法打开', '内容或日期有误', '说明不够清楚'];
export function correctionRecord({ lesson, type, section, description, now = new Date().toISOString() }) {
  if (!lesson || !correctionTypes.includes(type) || typeof description !== 'string' || !description.trim() || description.length > 4000 || !Number.isFinite(Date.parse(now))) return null;
  const location = lesson.sections.some(item => item.title === section) ? section : '整篇教程';
  return `AIGuide 教程问题记录\n\n教程：${lesson.title}\n站内地址：#/learn/${lesson.id}\n章节：${location}\n问题类型：${type}\n教程整理日期：${lesson.edited}\n记录时间：${now}\n\n【读者记录】\n${description.trim()}\n\n本文件由读者在本地生成，尚未发送给网站维护者。分享前请移除账号、验证码、密钥或私人对话。\n`;
}
