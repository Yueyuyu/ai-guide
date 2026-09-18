import { apiContract, resourceLink } from './practice-resources.js';

export const apiPractice = {
  id: 'api-output-check', title: '先验证输出，再让应用使用它', description: '在本地练习台检查正常数据、缺失字段和内容错误，设计失败处理。', category: 'automation', lessonType: 'api', platform: 'general', level: '进阶', minutes: 25, tools: ['gpt-models', 'claude-models', 'glm-models'], color: 'lilac', cover: ['检查模型返回值', '格式正确，不等于事实正确'], edited: '2026-09-18',
  goals: ['把业务要求写成数据约束', '区分格式错误与事实错误', '保存服务端处理方案'], prerequisite: '先读API调用链课程，了解JSON对象与数组。本练习在当前页面完成，不需要API Key或模型账户。',
  resultSaving: { material: apiContract, filename: 'AIGuide-我的API校验方案.txt', label: '我的接口校验方案', placeholder: '业务字段与限制：\n结构错误处理：\n事实核对方式：\n认证、限流和超时处理：\n尚未实测的调用：' },
  sections: [
    {
      title: '先约定业务数据', paragraphs: ['本课检查从模型文本中提取的业务对象；先看图中的字段，再展开完整约定。'],
      visual: { title: '一条通知，整理成两组数据', items: [
        { title: 'tasks：任务', text: 'title：事项\nowner：负责人\ndue：时间', icon: 'file' },
        { title: 'questions：问题', text: '原文没有明确的信息\n留作待确认', icon: 'message' },
      ], note: '本站教学结构，不是厂商原始响应。' },
      prompt: apiContract, promptLabel: '完整业务约定', promptPreview: 'tasks 与 questions 都是数组。\n负责人或时间未知时，保留字段并填 null。',
      downloads: [resourceLink('api-contract.txt', '下载接口数据约定')],
      supplement: { title: 'null 与漏字段有什么区别？', paragraphs: ['null 表示已检查，但原文没给信息；漏字段表示对象没有按约定交付。tasks 可以为空，但不能把它当作已经创建了任务。'] },
    },
    {
      title: '亲手试三种返回结果', paragraphs: ['依次填入一个示例，点“检查这份数据”，再对照原通知。'],
      actionSteps: ['有效数据：确认结构通过。', '缺少字段：找到缺失的 due。', '事实有误：结构虽通过，负责人仍需从小陈改回小林。'],
      apiLab: true, checkpoint: '能解释：文本格式正确，不能证明负责人正确。',
    },
    {
      title: '把校验放在服务端', paragraphs: ['服务端先检查，合格后再进入业务；这个前端练习台只用于学习。'],
      visual: { title: '写入业务前，过三道检查', items: [
        { title: '解析 JSON', text: '解析失败就停止', icon: 'code' },
        { title: '检查结构', text: '字段、类型、条数与长度', icon: 'file' },
        { title: '核对事实', text: '对照原文，再决定使用', icon: 'check' },
      ] },
      faq: [
        ['JSON 或字段错误？', '停止业务写入，保留脱敏错误，修正后再检查。'],
        ['认证、额度或超时错误？', '401 核对认证；429 按文档区分限流与额度；超时先核对任务状态，避免重复操作。'],
        ['结构正确，但内容有误？', '对照原文纠正负责人、时间与引用，不能只凭格式通过就发布。'],
      ],
    },
    { title: '保存接入与校验方案', paragraphs: ['写出你的应用需要哪些字段、如何处理失败、哪些事实还要核对。选择具体厂商后，再依据该厂商的当前文档接入服务，记录实际调用结果。'], resultEditor: true, links: [{ href: '#/model/gpt-models', label: '选学：OpenAI 模型接口' }, { href: '#/model/claude-models', label: '选学：Claude 模型接口' }, { href: '#/model/doubao-models', label: '选学：豆包模型接口' }] },
  ], exercises: ['分别检查有效、缺字段和事实有误三种数据', '解释结构校验无法覆盖的事实问题', '保存失败处理与服务端校验方案'], takeaway: '收到模型文本只是中间一步，业务数据需要经过明确校验。',
};
