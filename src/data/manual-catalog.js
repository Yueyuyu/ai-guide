// 目录单独加载，搜索和页面标题不需要提前下载所有手册正文。
export const manualCatalog = [
  { id: 'openai', name: 'OpenAI', title: 'OpenAI 使用手册', maker: 'OpenAI', logo: 'openai.svg', color: 'sage', description: '从清楚地提问，到修改图片、安排 Codex 编程任务。', audience: '日常使用与编程入门', tags: ['ChatGPT', 'Codex', '提示词', '图像生成', 'API'], officialUrl: 'https://learn.chatgpt.com/docs', officialLabel: 'OpenAI 官方使用指南', checkedAt: '2026-09-18' },
  { id: 'workbuddy', name: 'WorkBuddy', title: 'WorkBuddy 使用手册', maker: '腾讯', logo: 'workbuddy.svg', color: 'blue', description: '准备一个练习文件夹，让 AI 生成周报，再核对并修正。', audience: '办公与本地文件任务', tags: ['腾讯', '办公', '文件', '周报', 'Workbody'], officialUrl: 'https://www.workbuddy.cn/docs/workbuddy/Quickstart', officialLabel: 'WorkBuddy 官方指南', checkedAt: '2026-09-18' },
  { id: 'zcode', name: 'ZCode', title: 'ZCode 使用手册', maker: '智谱', logo: 'zhipu.svg', color: 'lilac', description: '连接模型、打开工作区，完成一个小网页并检查文件。', audience: '桌面 AI 编程入门', tags: ['智谱', 'Z Code', '工作区', '任务', 'GLM'], officialUrl: 'https://zcode.z.ai/cn/docs/welcome', officialLabel: 'ZCode 官方中文文档', checkedAt: '2026-09-18' },
  { id: 'claude-code', name: 'Claude Code', title: 'Claude Code 使用手册', maker: 'Anthropic', logo: 'claudecode.svg', color: 'peach', description: '在终端读懂项目，限定修改范围，用差异和检查结果验收。', audience: '有终端基础的开发者', tags: ['Claude', '终端', '代码', '上下文', 'CLAUDE.md'], officialUrl: 'https://code.claude.com/docs/zh-CN/overview', officialLabel: 'Claude Code 官方中文文档', checkedAt: '2026-09-18' },
];

export const manualById = Object.fromEntries(manualCatalog.map(manual => [manual.id, manual]));
export const manualSectionKinds = [
  { id: 'basics', label: '入门步骤' }, { id: 'feature', label: '功能用法' },
  { id: 'advanced', label: '进阶技巧' }, { id: 'faq', label: '常见问题' }, { id: 'case', label: '案例与练习' },
];
const manualTopics = {
  openai: ['文件', '预览', '批注', '项目', '交接', 'Last turn'],
  workbuddy: ['Agent', 'Ask', 'Plan', '计划模式', '仅问答', '产物', '变更', '诊断', '模板', '批量'],
  zcode: ['goal', '目标模式', 'Skill', '技能', 'Memory', '记忆', 'Loading', '手机布局'],
  'claude-code': ['Plan Mode', '计划模式', 'CLAUDE.md', 'context', 'compact', 'rewind', '上下文', '类型错误', '数量汇总'],
};
export const manualHref = (id, section) => '#/manuals/' + encodeURIComponent(id) + (section ? '?section=' + encodeURIComponent(section) : '');
export function manualResourceHref(link, { staticPage = false, base = './' } = {}) {
  if (link.lessonId) {
    return staticPage ? '../read/' + link.lessonId + '.html' + (link.section ? '#' + link.section : '')
      : '#/learn/' + link.lessonId + (link.section ? '?section=' + encodeURIComponent(link.section) : '');
  }
  return (staticPage ? '../' : base) + link.path;
}
export function searchManuals(query) {
  const tokens = query.toLowerCase().trim().split(/\s+/u).filter(Boolean);
  return tokens.length ? manualCatalog.filter(manual => tokens.every(token => [manual.name, manual.title, manual.maker, manual.description, ...manual.tags, ...manualTopics[manual.id], '常见问题 排错 进阶技巧 案例 练习'].join(' ').toLowerCase().includes(token))) : [];
}
