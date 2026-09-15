import { apiContract, resourceLink } from './practice-resources.js';

export const apiPractice = {
  id: 'api-output-check', title: '先验证输出，再让应用使用它', description: '在本地练习台检查正常数据、缺失字段和内容错误，设计失败处理。', category: 'automation', lessonType: 'api', platform: 'general', level: '进阶', minutes: 25, tools: ['gpt-models', 'claude-models', 'glm-models'], color: 'lilac', cover: ['检查模型返回值', '格式正确，不等于事实正确'], edited: '2026-09-15',
  goals: ['把业务要求写成数据约束', '区分格式错误与事实错误', '保存服务端处理方案'], prerequisite: '先读API调用链课程，了解JSON对象与数组。本练习在当前页面完成，不需要API Key或模型账户。',
  resultSaving: { material: apiContract, filename: 'AIGuide-我的API校验方案.txt', label: '我的接口校验方案', placeholder: '业务字段与限制：\n结构错误处理：\n事实核对方式：\n认证、限流和超时处理：\n尚未实测的调用：' },
  sections: [
    { title: '先约定业务数据', paragraphs: ['模型服务有自己的响应格式；你的应用也需要约定从文本中解析出的业务对象。这是两层检查。这里假设已经取出模型返回文本，只检查其中的任务对象。', 'owner、due缺失时显式写null；这比漏掉字段更方便调用方处理。空任务数组是合法数据，但不能当作创建了一个任务。'], prompt: apiContract, promptLabel: '本地练习的数据约定', downloads: [resourceLink('api-contract.txt', '下载接口数据约定')] },
    { title: '亲手试三种返回结果', paragraphs: ['先用有效数据检查一次；再填入缺少字段的数据，观察due缺失的提示。最后选择事实有误，看看结构校验为什么仍能通过。'], apiLab: true, checkpoint: '能够说明“小陈”符合文本格式，但与原通知的“小林”不一致。' },
    { title: '把校验放在服务端', paragraphs: ['真实产品中，服务端接收模型结果后先解析JSON，再检查类型、必填字段、条数和长度。通过后才交给后续业务使用。前端练习台只用于学习，不能替代服务端校验。', '结构校验无法证明某个负责人、时间或引用正确。对事实敏感的结果，继续保留原文和人工核对步骤。'], reference: { label: '本站处理方案示例 · 不代表接口实测结果', columns: ['情形', '下一步'], rows: [['JSON无法解析／字段缺失', '拒绝进入业务写入，保留脱敏错误，修正后再试'], ['认证失败（401）', '检查服务地址和认证配置，不盲目重试'], ['达到限额（429）', '按服务文档检查额度或等待，限制重试次数'], ['网络超时', '标记结果未确认；先核对是否已产生结果，避免重复操作'], ['结构正确但事实有误', '对照原文纠正；不能只凭格式通过就发布']] } },
    { title: '保存接入与校验方案', paragraphs: ['写出你的应用需要哪些字段、如何处理失败、哪些事实还要核对。选择具体厂商后，再依据该厂商的当前文档接入服务，记录实际调用结果。'], resultEditor: true, links: [{ href: '#/model/gpt-models', label: '选学：OpenAI 模型接口' }, { href: '#/model/claude-models', label: '选学：Claude 模型接口' }, { href: '#/model/doubao-models', label: '选学：豆包模型接口' }] },
  ], exercises: ['分别检查有效、缺字段和事实有误三种数据', '解释结构校验无法覆盖的事实问题', '保存失败处理与服务端校验方案'], takeaway: '收到模型文本只是中间一步，业务数据需要经过明确校验。',
};
