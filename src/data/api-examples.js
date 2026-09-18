import { apiExamples } from '../lib/api-output.js';

export const apiPracticeNotice = '小林周五前整理报名表，活动地点未定。';
export const apiAppRequest = JSON.stringify({ notice: apiPracticeNotice }, null, 2);

// 这是本站业务对象的教学样例，不是任何厂商的原始响应，也不是调用记录。
export const apiExampleCases = [
  { id: 'valid', label: '有效数据', value: apiExamples.valid, result: '结构符合约定', check: '负责人是小林、时间是周五前；地点仍待确认。' },
  { id: 'missing', label: '缺少字段', value: apiExamples.missing, result: '结构不符合约定', check: '缺少 due 字段。本例原文有“周五前”，应补回；原文没给时间时才填 null。' },
  { id: 'inaccurate', label: '事实有误', value: apiExamples.inaccurate, result: '结构符合约定，但事实有误', check: '“小陈”是合法文本，所以通过格式检查；原文负责人是“小林”，仍需纠正。' },
];
