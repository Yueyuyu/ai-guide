import { weeklyMaterial, resourceLink } from './practice-resources.js';

const docs = 'https://www.workbuddy.cn/docs/workbuddy/';
const installSource = docs + 'From-Beginner-to-Expert-Guide/Installation-Win-Guide';
const taskSource = docs + 'From-Beginner-to-Expert-Guide/Function-Description/Task-Bar';
const resultsSource = docs + 'Results';
const screenshot = (file, width, height, title, alt, sourceUrl) => ({
  src: 'tutorials/workbuddy-first/' + file + '.png', width, height, title, alt, sourceUrl,
  caption: '官方文档示例 · 2026-09-16 核对 · 非本课实测',
});

export const workbuddyPractice = {
  id: 'workbuddy-first', productId: 'workbuddy', platform: 'desktop', lessonType: 'operation',
  title: 'WorkBuddy 入门：把工作记录整理成一个真实文件',
  description: '跟着图片选文件夹、生成周报，再打开文件核对。',
  category: 'automation', level: '入门', minutes: 25, tools: ['workbuddy'], color: 'sage', edited: '2026-09-16',
  cover: ['让工作记录有条理', '选择文件夹 · 生成 · 核对'],
  goals: ['安装并登录', '生成周报文件', '核对并保存'],
  prerequisite: 'Windows 10 及以上、可用的 WorkBuddy 账号与额度、一个空的练习文件夹。手机可以阅读。',
  resultSaving: { material: weeklyMaterial, filename: 'AIGuide-WorkBuddy练习记录.txt', label: '我的 WorkBuddy 练习记录', placeholder: '练习目录：\n生成的文件名：\n是否在电脑上打开：\n重复记录如何处理：\n数字和状态是否正确：\n未完成或卡住的步骤：' },
  sections: [
    {
      title: '安装并登录',
      paragraphs: ['使用 Windows 桌面版。图为官方示例，账号内生成尚未实测。'],
      actionSteps: ['从下方官网下载 Windows 安装包，打开安装向导。', '阅读协议，自行决定是否接受；选择安装位置与桌面快捷方式，完成安装。', '启动后点击图中的“登录”，在官网完成登录，再返回客户端。'],
      screenshot: screenshot('login', 1820, 1220, 'WorkBuddy：客户端登录', 'WorkBuddy 客户端欢迎页，下方黑色登录按钮由官方高亮。', installSource),
      supplement: { title: '安装条件与中文设置', paragraphs: ['Windows 官方指南要求 Windows 10 及以上，不支持 Windows 7、8、8.1。官网“在线使用”与本课桌面版的入口不同。', '账号与验证码只在官方页面填写。界面不是中文时，从左下角头像进入“语言”。使用前查看账号额度和付费说明。'] },
      links: [{ label: '官网下载', href: 'https://www.workbuddy.cn/', external: true }, { label: '完整安装图解', href: installSource, external: true }],
      checkpoint: '已登录客户端，能看到任务输入框。',
    },
    {
      title: '选好练习文件夹', paragraphs: ['在“文档”里新建 workbuddy-weekly，把下方材料下载到其中。'],
      downloads: [{ ...resourceLink('weekly-records.txt', '下载练习材料'), filename: 'weekly-records.txt' }],
      actionSteps: ['点击输入框下方“选择工作空间”。', '点击“打开本地工作空间”，选择 workbuddy-weekly 文件夹。', '发送下方核对语句，确认它能看到 weekly-records.txt。'],
      screenshot: screenshot('workspace-menu', 520, 734, 'WorkBuddy：选择工作空间', '官方截图：选择工作空间菜单中的“打开本地工作空间”入口。', taskSource),
      prompt: '暂不修改文件。请报告当前工作目录，并列出其中的文件名。', promptLabel: '先核对目录',
      checkpoint: '路径正确，文件列表里有 weekly-records.txt。',
    },
    {
      title: '发送要求，确认后生成', paragraphs: ['这次只生成一份 TXT 周报，使用默认权限即可。'],
      actionSteps: ['点输入框左侧“＋”→“模式”→开启“计划 Plan”。', '粘贴下方任务要求并发送。', '确认计划只读取原文、创建 weekly-summary.txt，再点“开始执行”。'],
      screenshot: screenshot('task-mode', 1672, 893, 'WorkBuddy：计划模式', '官方截图：加号菜单中的模式选项，右侧是计划 Plan 与仅问答 Ask 开关。', taskSource),
      prompt: '读取 weekly-records.txt，在当前目录生成 weekly-summary.txt。\n按“已完成、进行中、阻塞、下周计划”分组，保留记录编号。\nW2 去重；W5 的 3 条包含在 W1 的 12 条中，不相加；8 条 FAQ 草稿仍为进行中。\n未定日期写“待确认”，不联网补充事实。\n只创建结果文件，不改原文、不安装、不上传或发送材料；同名文件已存在时先告知，不覆盖。\n先给计划，等我确认后执行。完成后给出文件的完整路径。',
      promptLabel: '复制到 WorkBuddy',
      supplement: { title: '计划、默认、仅问答，有什么不同？', paragraphs: ['计划（Plan）：先给方案，确认后执行。默认（Agent）：可以直接执行任务。仅问答（Ask）：只回答，不执行；要生成文件时不要使用仅问答。', '出现安装依赖、覆盖旧文件或扩大访问范围的请求时，先暂停并核对计划。此练习无需开启完全访问权限。'] },
      checkpoint: '已确认计划，工具开始创建指定文件。',
    },
    {
      title: '打开文件，检查四件事', paragraphs: ['图中是官方的其他任务，只看“工作空间文件”的位置。'],
      actionSteps: ['在右侧切到“工作空间文件”，找到 weekly-summary.txt。', '再回到电脑的 workbuddy-weekly 文件夹，双击打开周报。', '按下面四项核对；只有聊天回复不算完成。'],
      screenshot: screenshot('files', 1923, 1282, 'WorkBuddy：查看结果文件', '官方示例：界面右侧的工作空间文件树。本课应查找 weekly-summary.txt。', resultsSource),
      list: ['W2 只出现一次。', '总数仍是 12 条，不能算成 15 条。', '8 条 FAQ 草稿是进行中；截图等设计稿是阻塞。', 'FAQ 评审是计划，未知日期写“待确认”。'],
      faq: [['只有回答，没有文件？', '确认没有开启“仅问答”。在同一任务中要求实际创建 weekly-summary.txt，并报告完整路径，再到电脑文件夹核对。'], ['额度不足或执行失败？', '保留进度和不含私人信息的报错。可以先完成材料核对，不必为这次练习立即购买套餐。']],
      checkpoint: '能在电脑上打开周报，数字与状态和原文一致。',
    },
    {
      title: '修正后，再看一次变更', paragraphs: ['继续原任务，指出错误的记录编号；没有错误时，补一份“待确认事项”。'],
      actionSteps: ['发送下方修正要求。', '在右侧查看“变更”，确认只改结果文件。', '重新打开周报核对，原始 weekly-records.txt 保持不变。'],
      screenshot: screenshot('changes', 1938, 1271, 'WorkBuddy：检查文件变更', '官方示例：右侧变更视图显示修改过的文件，本课应检查 weekly-summary.txt。', resultsSource),
      prompt: '对照 weekly-records.txt，只修正 weekly-summary.txt 中的错误、重复项和无依据内容。原始记录保持不变。末尾列出“待确认事项”，不补造日期。完成后说明修改位置。',
      checkpoint: '重开周报后，问题已修正，原始记录未改写。',
    },
    {
      title: '保存自己的练习记录', paragraphs: ['周报留在电脑文件夹。这里仅保存练习记录，不会上传或打包 WorkBuddy 的文件。未做的步骤写“未完成”。'],
      resultEditor: true,
      links: [{ label: '再试试豆包网页版', href: '#/learn/doubao-notice?path=starter' }, { label: '反馈使用体验', href: '#/feedback?track=workbuddy' }],
      checkpoint: '原文、周报、练习记录均已保留。',
    },
  ],
  exercises: ['在 WorkBuddy 中选择正确的练习文件夹', '生成并在电脑上打开 weekly-summary.txt', '核对重复项、数字与状态，保存练习记录'],
  takeaway: '让 AI 交付一个能找到、能打开、能核对的实际文件。',
};
