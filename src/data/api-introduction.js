import { apiAppRequest } from './api-examples.js';
import { apiExamples } from '../lib/api-output.js';

export const apiIntroduction = {
  id: 'api-first', title: '模型 API 入门：看懂请求、响应与校验',
  description: '用一条通知看懂调用链，再分清服务响应、业务数据与失败处理。',
  category: 'automation', level: '进阶', minutes: 20,
  tools: ['glm-models', 'deepseek-models', 'qwen-models', 'minimax', 'gpt-models', 'claude-models', 'gemini-models'],
  color: 'lilac', cover: ['一次请求，怎样返回结果', '调用链 · 请求与响应 · 核对'], edited: '2026-09-18',
  goals: ['看懂调用链', '区分两层响应', '处理错误与核对数据'],
  prerequisite: '了解基本 JSON。本课使用本站教学示例，不需要密钥；真实接入时再准备服务端、厂商账号、模型权限与调用预算。',
  sections: [
    {
      title: '先看一遍调用链', paragraphs: ['沿着图看：通知从网页发出，服务端调用模型，再把检查后的结果交回网页。'],
      visual: { title: '一次请求，经过三个位置', items: [
        { title: '你的网页', text: '收集通知，显示结果', icon: 'desktop' },
        { title: '你的服务端', text: '保存密钥，检查输入和输出', icon: 'code' },
        { title: '模型 API', text: '处理输入，返回服务响应', icon: 'message' },
      ], note: '返回方向：模型 API → 服务端 → 网页。' },
      supplement: { title: '密钥与费用放在哪里理解？', paragraphs: ['普通服务端 API Key 由服务端环境变量读取，不写进网页 JavaScript、公开仓库或截图。厂商专门提供的临时凭据按其官方文档使用。', '对话应用订阅与 API 调用分别核对权益和计费，不能默认互通。'] },
      checkpoint: '能指出哪一层持有服务端密钥，哪一层负责显示结果。',
    },
    {
      title: '对照一份请求和响应', paragraphs: ['下面只展示“你的网页 ↔ 你的服务端”的业务约定。模型厂商的请求与原始响应另有格式。'],
      prompt: apiAppRequest, promptLabel: '网页发给自己服务端 · 教学请求体',
      code: apiExamples.valid, language: '服务端交回网页 · 教学业务对象',
      supplement: { title: '真正调用厂商时，要确认哪四项？', list: ['地址与端点：从所选厂商官方文档确认。', '认证：按文档设置请求头；密钥从服务端读取。', '模型 ID：使用当前账号有权限的准确标识。', '输入与输出：按该端点组织 messages 或 input，并按文档提取返回内容。'], paragraphs: ['这些 JSON 只用于看懂字段；本站没有提供对应业务接口，它们也不是厂商原始响应或实测记录。不要把某家厂商的端点与另一家的字段直接拼在一起。'] },
      checkpoint: '能找到输入的 notice，以及输出的 tasks、questions。',
    },
    {
      title: '收到结果，还要检查两层', paragraphs: ['先看接口有没有成功，再看业务数据能不能用；HTTP 200 不能代替内容核对。'],
      visual: { title: '服务响应和业务内容，是两层检查', kind: 'compare', items: [
        { title: '服务响应', text: '状态、错误、完成状态\n按文档提取返回内容', icon: 'network' },
        { title: '业务内容', text: 'JSON、必填字段、类型\n再对照原文核实人名和时间', icon: 'check' },
      ] },
      links: [{ label: '打开本地练习：试试三种返回结果', href: '#/learn/api-output-check?path=developer&section=section-1' }],
      checkpoint: '能解释：负责人写成“小陈”，即使格式通过也不能直接使用。',
    },
    {
      title: '遇到错误，先选下一步', paragraphs: ['先看错误类型，再决定是否重试。以下是常见处理方向，具体原因以厂商错误信息为准。'],
      faq: [
        ['401：认证失败', '核对服务地址、认证方式和密钥配置；修正配置前不反复重试。'],
        ['403：没有权限', '核对账号、模型和组织权限，以及服务给出的访问限制说明。'],
        ['429：限流或额度限制', '先分清请求过快还是额度不足；按文档和 Retry-After（若提供）处理，设置重试上限。'],
        ['超时：不知道是否完成', '记录为“结果未确认”；先核对已有结果或任务状态，避免重复写入、重复发送。'],
        ['请求成功，但内容不合格', '输出截断、JSON 错误或事实不符，都先停止业务写入，修正后再检查。'],
      ],
      supplement: { title: '开始真实接入前', list: ['设置输入长度、输出预算、超时和有限重试。', '只保留脱敏错误与必要的请求标识。', '记录实际调用日期、端点、模型与结果，不能把本课示例当作调用成功。'] },
    },
  ],
  exercises: ['指出网页、服务端、模型 API 各自负责什么', '区分教学业务对象与厂商原始响应', '为认证失败、超时和内容错误选出处理方式'],
  takeaway: '服务返回成功后，还要检查业务结构，并对照原文核对事实。',
};
