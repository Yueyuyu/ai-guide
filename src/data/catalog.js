export const categories = [
  { id: 'all', name: '全部教程', icon: 'grid' },
  { id: 'basics', name: '零基础入门', icon: 'cap' },
  { id: 'models', name: '软件使用', icon: 'box' },
  { id: 'coding', name: 'AI 编程', icon: 'code' },
  { id: 'automation', name: '自动化', icon: 'workflow' },
];

export { tools, platforms, kindNames, officialSources } from './products.js';

export const paths = [
  { id: 'starter', title: 'AI 入门路线', subtitle: '从理解 AI，到用网页完成并保存第一份待办清单。', audience: '适合第一次接触 AI 的你', icon: 'cap', color: 'blue', sequence: ['ai-first', 'choose-model', 'prompt-template', 'choose-tool', 'doubao-notice', 'research-first'], outcome: '保存一份包含原通知、待办事项和待确认信息的练习成果。' },
  { id: 'network', title: '网络准备：从安装到验证', subtitle: '用 Clash Party 管理自己的订阅，确认网络可用，也学会恢复。', audience: '需要准备海外工具访问环境', icon: 'globe', color: 'blue', sequence: ['network-prepare'], outcome: '一份不含订阅凭据的网络检查记录。', preparation: 'Windows 电脑、官方安装包和自己的兼容订阅。已经能使用目标服务时可以跳过。' },
  { id: 'builder', title: '用 ChatGPT，做一个网页', subtitle: '先准备网络与账号，再在 ChatGPT 桌面版的 Codex 入口完成创建、修改与验收。', audience: '已有 AI 使用基础，想做出作品', icon: 'code', color: 'lilac', sequence: ['network-prepare', 'choose-model', 'codex-web', 'codex-iterate', 'website-check'], outcome: '完成一个本地网页，保存运行说明与验收记录。', preparation: '准备电脑，先检查官方服务访问，再安装 ChatGPT 桌面应用、登录并选择独立练习文件夹。已能正常使用服务时可直接进入网页实操。', electives: ['cursor-debug', 'codex-cloud-start', 'codex-cli-start'], projectId: 'personal-page' },
  { id: 'office', title: '给日常工作按下加速键', subtitle: '沿用你会使用的网页工具，完成资料整理、改稿与周报。', audience: '适合办公与内容创作', icon: 'file', color: 'blue', sequence: ['prompt-template', 'research-first', 'writing-revise', 'workflow-basics'], outcome: '保存研究笔记、通知改稿和可复用的周报模板。', preparation: '准备一个可用的网页对话工具。每项实操均附虚构材料，可以沿用豆包、ChatGPT或Claude中的一个；不用每课换软件。', electives: ['kimi-documents', 'claude-writing', 'chatgpt-files', 'doubao-work-start'], projectId: 'weekly-workflow' },
  { id: 'developer', title: '从会用 AI 到接入 AI', subtitle: '先理解调用链，再在本地检查输出，最后选择具体厂商接口。', audience: '适合有编程基础', icon: 'terminal', color: 'lilac', sequence: ['choose-model', 'api-first', 'api-output-check'], outcome: '保存一份包含业务字段、输出校验和失败处理的接入方案。', preparation: '了解基础编程与JSON。路线中的响应练习台可直接使用；真实接口调用需另行准备服务端、厂商账号、模型权限与费用。', electives: ['claude-code-repo', 'cli-workflow', 'qwen-code-start'] },
];

export const projects = [
  { id: 'personal-page', number: '01', title: '做一个自己的个人主页', description: '按完整需求单做出简介、项目与联系说明，完成一次修改并验收。', color: 'peach', cover: '我的第一个网页', time: '建议 1–2 小时', lessons: ['codex-web', 'codex-iterate', 'website-check'], deliverables: ['可在本地打开的页面', '桌面与手机检查清单', '一次修改前后的对比'], brief: '创建一个个人介绍网页，包含简介、三个项目和联系说明。\n使用附带的虚构练习信息。\n先列出实施计划和文件范围。\n完成后提供运行方式，并检查手机布局、链接与键盘操作。' },
  { id: 'research-note', number: '02', title: '把资料变成一份研究笔记', description: '给零散资料建立索引，让每条结论都能回到原文。', color: 'sage', cover: '读懂一份资料', time: '建议 45–90 分钟', lessons: ['kimi-documents', 'gemini-research'], deliverables: ['资料来源表', '结论与出处对应表', '尚未确认的问题清单'], brief: '根据我提供的资料整理研究笔记。\n每条事实保留来源标题、日期与原文位置。\n将事实、作者观点和你的推断分开。\n未找到证据的地方明确写“资料未提供”，不要补造引用。' },
  { id: 'weekly-workflow', number: '03', title: '搭建一套周报整理工作流', description: '让 AI 处理分类和初稿，让你保留核对与发布的决定。', color: 'ink', cover: '轻松整理周报', time: '建议 1 小时', lessons: ['qwen-structured', 'workflow-basics'], deliverables: ['输入记录模板', '周报生成提示词', '数字和事项核对表'], brief: '把本周工作记录整理为周报草稿。\n按已完成、进行中、阻塞、下周计划分类。\n保留原始日期、负责人和数字，不扩大成绩。\n缺少的信息集中列为待补充，不自动发布或发送。' },
];
