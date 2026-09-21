import { zcodeWorkflows } from './zcode-workflows.js';

export const zcodeManual = {
  scope: '已核对 ZCode 官方安装、文件管理、目标模式、Skill、Memory 与 FAQ。练习和起始 HTML 由本站编写，未在 ZCode 账号内执行；不将起始文件或验收目标当作产品生成结果。',
  sources: [
    ...zcodeWorkflows.sources,
    { id: 'install', title: 'ZCode：安装与首次启动', url: 'https://zcode.z.ai/cn/docs/install' },
    { id: 'files', title: 'ZCode：任务与文件管理', url: 'https://zcode.z.ai/cn/docs/task-management' },
    { id: 'overview', title: 'ZCode：产品与核心能力', url: 'https://zcode.z.ai/cn/docs/welcome' },
  ],
  sections: [
    { id: 'setup', title: '安装后，先确认模型连接', paragraphs: ['ZCode 是智谱的桌面编程工具，工作区用来确定本次任务所在的项目。应用安装完成和模型连接成功是两件事，先完成接入再开始文件任务。'], steps: ['从 ZCode 官网下载与你的系统和芯片匹配的安装包，完成安装。', '首次启动选择“开始使用 ZCode”；不需要迁移旧对话时可先跳过迁移。', '通过左下角“连接使用”按自己的情况连接 BigModel、Z.ai 或配置模型接入。', '核对账号权限、套餐或调用费用；不要把账号密钥写入练习文件。'], check: '应用可以发起任务，模型接入正常；不把安装完成当作已有可用额度。', sourceIds: ['install'] },
    { id: 'workspace', title: '打开练习工作区，先读后写', paragraphs: ['新建一个空的 hello-page 文件夹作为练习工作区。打开后先确认位置，再让 Agent 列出目录；如果里面已有文件，先弄清用途。'], steps: ['从工作区入口打开 hello-page；也可以在快捷入口中找到“打开文件夹”。', '创建任务，发送下面的只读请求。', '核对回复中的目录与实际选择一致，再进入下一步。'], prompt: '请列出当前工作目录及其中的文件，说明哪些文件已经存在。现在只做检查，不创建、不修改、不删除任何文件。', check: 'Agent 读到的是练习目录，现有文件没有变化。', sourceIds: ['install', 'files'] },
    { id: 'build', title: '生成一个范围明确的小网页', paragraphs: ['第一项任务不需要数据库、登录或部署。让 Agent 先交代文件计划，再完成一个静态页面，方便直接检查。以下是本站教学任务。'], prompt: '请先说明文件计划，等我确认后在当前练习目录创建一个“周末阅读角”网页。需要标题、三本虚构书籍卡片和页尾说明；所有文案为中文，不含真实联系方式。使用 HTML 和 CSS，无需后端、外部图片或在线字体。页面在手机宽度下也能阅读，不覆盖已有文件。完成后列出文件路径及打开方法。', steps: ['检查计划是否只涉及当前练习目录和必要文件，再确认执行。', '等待文件生成，核对实际创建的文件列表。', '如果任务中途失败，保留错误信息，让 Agent 从失败步骤继续。'], check: '至少能找到网页文件；结果是可打开的页面，而不只是对网页的文字描述。', sourceIds: ['overview'] },
    { id: 'inspect', title: '从文件树查看结果，再改一处', paragraphs: ['官方文件树支持单击预览文件，也支持双击或 Enter 用默认编辑器打开。需要 Agent 处理某个文件时，可以把文件拖入输入框，或用右键的“添加到聊天”。'], steps: ['点击工作区的文件树图标，找到刚生成的 HTML 和 CSS。', '预览代码，再按生成时提供的方法用浏览器打开网页。', '缩窄浏览器，检查卡片换行和文字是否溢出。', '引用相关文件，要求只修正一个问题，完成后重新检查。'], prompt: '请检查刚才网页的窄屏布局。如果三张卡片挤在同一行，请只修改必要的样式，让窄屏变成单列。保留标题、卡片文字和配色，列出修改文件以及实际执行的检查。', check: '窄屏能读完所有卡片；本次改动没有重写无关内容。', sourceIds: ['files'] },
    { id: 'organize', title: '把任务和项目整理好', paragraphs: ['任务列表可以按分组、工作区或时间线组织。围绕同一个网页继续修正时，保留已有任务的上下文；切换到另一项目时，先确认工作区。'], steps: ['用工作区视图找到 hello-page 下的任务。', '后续修改继续说明具体文件、要改的内容和完成标准。', '任务完成后保留文件；归档只是整理任务列表，不代替文件备份。', '熟悉基本流程后，再通过官方目录学习目标模式、Skill、MCP 和自动化。'], check: '能从任务列表找回练习，并明确对应的工作区和最终文件。', sourceIds: ['files', 'overview'] },
  ],
  extensions: zcodeWorkflows.sections,
  lessons: [],
};
