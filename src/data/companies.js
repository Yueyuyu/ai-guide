// 用明确的归属表合并公司，避免 Qwen / 阿里巴巴等不同厂商写法产生重复分组。
// 产品 ID 继续独立使用，保留原教程链接与学习记录。
export const companies = [
  {
    id: 'openai', name: 'OpenAI', brand: 'openai', products: 'ChatGPT · Codex · GPT',
    description: '用 ChatGPT 处理日常工作，用 Codex 编程，或了解 GPT 模型接入。',
    toolIds: ['chatgpt', 'chatgpt-desktop', 'codex', 'codex-cloud', 'codex-cli', 'gpt-models'],
  },
  {
    id: 'anthropic', name: 'Anthropic', brand: 'anthropic', logo: 'anthropic-company.svg', products: 'Claude · Cowork · Claude Code',
    description: '从 Claude 网页和桌面应用开始，再选择 Cowork 工作模式、Code 或模型 API。',
    toolIds: ['claude', 'claude-desktop', 'claude-cowork', 'claude-code', 'claude-models'],
  },
  {
    id: 'google', name: 'Google', brand: 'google', logo: 'google-company.png', products: 'Gemini · Gemini CLI',
    description: '了解 Gemini 网页应用、终端工具与模型 API 的不同入口。',
    toolIds: ['gemini', 'gemini-cli', 'gemini-models'], aliases: ['谷歌'],
  },
  {
    id: 'deepseek', name: 'DeepSeek', brand: 'deepseek', products: 'DeepSeek 应用与模型',
    description: '先在网页里练习问答与验算，再认识 DeepSeek 模型调用。',
    toolIds: ['deepseek', 'deepseek-models'], aliases: ['深度求索'],
  },
  {
    id: 'alibaba', name: '阿里巴巴', brand: 'alibaba', logo: 'alibaba-company.ico', products: 'Qwen · Qwen Code',
    description: '集中学习 Qwen Chat、Qwen Code，以及千问模型的使用方式。',
    toolIds: ['qwen', 'qwen-code', 'qwen-models'], aliases: ['阿里', 'Alibaba', '千问', '通义'],
  },
  {
    id: 'xai', name: 'xAI', brand: 'xai', products: 'Grok 应用与模型',
    description: '用 Grok 网页应用核对话题来源，或从 xAI 平台了解模型 API。',
    toolIds: ['grok', 'grok-models'],
  },
  {
    id: 'moonshot', name: '月之暗面', brand: 'moonshot', products: 'Kimi 应用与模型',
    description: '学习 Kimi 网页报告阅读，以及 Moonshot 模型的接入方式。',
    toolIds: ['kimi', 'kimi-models'], aliases: ['Moonshot'],
  },
  {
    id: 'zhipu', name: '智谱', brand: 'zhipu', products: '智谱清言 · GLM',
    description: '区分智谱清言应用与 GLM 模型，从日常对话走向程序接入。',
    toolIds: ['glm', 'glm-models'], aliases: ['Z.ai', 'Zhipu'],
  },
  {
    id: 'bytedance', name: '字节跳动', brand: 'doubao', logo: 'bytedance-company.svg', products: '豆包工作 · 豆包 · 模型',
    description: '学习豆包网页使用，以及火山方舟中的模型服务。',
    toolIds: ['doubao-work', 'doubao', 'doubao-models'], aliases: ['ByteDance'],
  },
  {
    id: 'minimax', name: 'MiniMax', brand: 'minimax', products: '文本与语音模型',
    description: '从开发平台认识文本、语音等模型服务与结果处理。',
    toolIds: ['minimax'], aliases: ['稀宇'],
  },
  {
    id: 'cursor', name: 'Cursor', brand: 'cursor', products: 'Cursor 编程编辑器',
    description: '在 Cursor 编辑器中学习代码问答、修改与调试。',
    toolIds: ['cursor'],
  },
  {
    id: 'github', name: 'GitHub', brand: 'githubcopilot', logo: 'github-company.png', products: 'GitHub Copilot',
    description: '从 VS Code 中的 Copilot 开始学习代码补全与编辑器对话。',
    toolIds: ['copilot'],
  },
];

export const companyByToolId = Object.fromEntries(companies.flatMap(company => company.toolIds.map(id => [id, company])));
export const featuredCompanies = ['openai', 'anthropic', 'google', 'deepseek', 'alibaba', 'cursor'].map(id => companies.find(company => company.id === id));
