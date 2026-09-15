// 这份业务约束用于教学，不代替模型服务本身的响应协议。
export const apiExamples = {
  valid: '{\n  "tasks": [{ "title": "整理报名表", "owner": "小林", "due": "周五前" }],\n  "questions": ["活动地点"]\n}',
  missing: '{\n  "tasks": [{ "title": "整理报名表", "owner": "小林" }],\n  "questions": ["活动地点"]\n}',
  inaccurate: '{\n  "tasks": [{ "title": "整理报名表", "owner": "小陈", "due": "周五前" }],\n  "questions": ["活动地点"]\n}',
};
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 200;

export function validateTaskOutput(text) {
  if (typeof text !== 'string' || !text.trim()) return { valid: false, errors: ['请先输入一段 JSON。'] };
  if (text.length > 12000) return { valid: false, errors: ['响应超过12000字符，请缩小内容后再检查。'] };
  let data;
  try { data = JSON.parse(text); }
  catch { return { valid: false, errors: ['无法解析 JSON。检查双引号、逗号与括号，不要包含 Markdown 代码围栏。'] }; }
  if (!isObject(data)) return { valid: false, errors: ['最外层必须是包含 tasks 和 questions 的对象。'] };
  const errors = [];
  if (Object.keys(data).some(key => !['tasks', 'questions'].includes(key))) errors.push('最外层只允许 tasks 和 questions 两个字段。');
  if (!Array.isArray(data.tasks)) errors.push('tasks 必须是数组。');
  else if (data.tasks.length > 20) errors.push('tasks 最多包含20项。');
  else data.tasks.forEach((task, index) => {
    const prefix = `任务${index + 1}：`;
    if (!isObject(task)) { errors.push(prefix + '必须是对象。'); return; }
    if (Object.keys(task).some(key => !['title', 'owner', 'due'].includes(key))) errors.push(prefix + '只允许 title、owner、due。');
    if (!isText(task.title)) errors.push(prefix + 'title 必须是1至200字的非空文本。');
    for (const key of ['owner', 'due']) if (task[key] !== null && !isText(task[key])) errors.push(prefix + key + ' 必须是1至200字文本，缺失信息请明确填 null。');
  });
  if (!Array.isArray(data.questions)) errors.push('questions 必须是数组。');
  else if (data.questions.length > 20 || data.questions.some(value => !isText(value))) errors.push('questions 最多20项，每项为1至200字的非空文本。');
  return errors.length ? { valid: false, errors } : { valid: true, errors: [], taskCount: data.tasks.length, questionCount: data.questions.length };
}
