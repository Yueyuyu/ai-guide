export const MAX_RESULT_LENGTH = 12000;

export function practiceResultText(lesson, result) {
  if (!lesson.resultSaving || typeof result !== 'string' || !result.trim() || result.length > MAX_RESULT_LENGTH) return null;
  return `AIGuide · 我的练习成果\n课程：${lesson.title}\n\n【练习原文】\n${lesson.resultSaving.material}\n\n【${lesson.resultSaving.label || '我的整理结果'}】\n${result.trim()}\n\n提示：本文件保存的是读者填写的结果，本站没有自动验证其正确性。\n`;
}
