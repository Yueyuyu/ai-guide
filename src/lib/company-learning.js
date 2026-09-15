import { companies, tools, lessons } from '../data/index.js';
import { productHref } from './discovery.js';

export const learningEntries = [
  { id: 'web', name: '网页版', icon: 'globe', hint: '打开浏览器，就能开始使用。' },
  { id: 'desktop', name: '桌面版', icon: 'desktop', hint: '在电脑上安装应用或编辑器，再跟着教程操作。' },
  { id: 'api', name: 'API', icon: 'code', hint: '面向开发接入，学习在程序里调用模型。' },
  { id: 'model', name: '模型', icon: 'box', hint: '了解模型的能力、版本与适用任务。' },
];

const companyLabels = {
  tencent: ['WorkBuddy 办公工作台'],
  openai: ['ChatGPT · Codex · GPT', 'OpenAI API'],
  anthropic: ['Claude · Cowork', 'Claude API'],
  google: ['Gemini', 'Gemini API'],
  deepseek: ['DeepSeek', 'DeepSeek API'],
  alibaba: ['千问 Qwen', '千问 API'],
  xai: ['Grok', 'Grok API'],
  moonshot: ['Kimi', 'Kimi API'],
  zhipu: ['智谱清言 · GLM', 'GLM API'],
  bytedance: ['豆包 · 豆包工作', '火山方舟 API'],
  minimax: ['文本与语音模型', 'MiniMax API'],
  cursor: ['AI 编程编辑器'],
  github: ['VS Code 中的 Copilot'],
};
const productLabels = { codex: 'Codex', 'codex-cloud': 'Codex', 'claude-cowork': 'Cowork' };
const shortLabel = tool => productLabels[tool.id] || tool.short.replace(/\s*(网页版|桌面版|模型)$/u, '');

export function resolveLearningEntry(params) {
  const entry = params.get('entry');
  if (entry === 'all' || learningEntries.some(item => item.id === entry)) return entry;
  // 旧链接仍能进入对应大类，新页面不再叠加两套筛选。
  if (params.get('kind') === 'model') return 'model';
  const platform = params.get('platform');
  if (['web', 'desktop', 'api'].includes(platform)) return platform;
  if (platform === 'editor') return 'desktop';
  return 'all';
}

export function companyLearningGroup(company) {
  const products = company.toolIds.map(id => tools.find(tool => tool.id === id));
  const [subtitle, apiLabel] = companyLabels[company.id] || [company.products];
  const sections = learningEntries.map(entry => ({ ...entry, links: products.flatMap(tool => {
    if (entry.id === 'model') return tool.kind === 'model' ? [{ id: tool.id, tool, label: shortLabel(tool), href: productHref(tool) }] : [];
    if (entry.id === 'api') {
      const lesson = lessons.find(item => item.productId === tool.id && item.platform === 'api');
      return lesson ? [{ id: lesson.id, tool, label: apiLabel || shortLabel(tool) + ' API', href: '#/learn/' + lesson.id }] : [];
    }
    // 编辑器属于电脑使用方式；终端教程只在公司详情的进阶区呈现。
    const platform = entry.id === 'desktop' && tool.platforms.includes('editor') ? 'editor' : entry.id;
    if (tool.kind === 'model' || !tool.platforms.includes(platform)) return [];
    return [{ id: tool.id + ':' + platform, tool, label: shortLabel(tool), href: productHref(tool) + '?platform=' + platform }];
  }) })).filter(section => section.links.length > 0);
  return { company, subtitle, sections, advanced: products.filter(tool => tool.platforms.includes('terminal')) };
}

export function filterLearningCompanies({ query = '', entry = 'all' } = {}) {
  const tokens = query.trim().toLowerCase().split(/\s+/u).filter(Boolean);
  return companies.map(companyLearningGroup).filter(group => {
    const products = group.company.toolIds.map(id => tools.find(tool => tool.id === id));
    const haystack = [group.company.name, ...(group.company.aliases || []), group.subtitle,
      ...products.flatMap(tool => [tool.name, ...(tool.aliases || []), ...tool.use]),
      ...group.sections.flatMap(section => [section.name, ...section.links.map(link => link.label)])].join(' ').toLowerCase();
    return tokens.every(token => haystack.includes(token));
  }).map(group => ({ ...group, sections: group.sections.filter(section => entry === 'all' || section.id === entry) }))
    .filter(group => group.sections.length > 0);
}
