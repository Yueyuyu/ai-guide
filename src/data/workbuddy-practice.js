import { weeklyMaterial, resourceLink } from './practice-resources.js';
import { photoStep } from './tutorial-captures.js';

const docs = 'https://www.workbuddy.cn/docs/workbuddy/';
const installSource = docs + 'From-Beginner-to-Expert-Guide/Installation-Win-Guide';
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
      paragraphs: ['使用 Windows 桌面版。安装登录沿用官方图；后续操作为 5.3.8 版实际周报练习。'],
      actionSteps: ['从下方官网下载 Windows 安装包，打开安装向导。', '阅读协议，自行决定是否接受；选择安装位置与桌面快捷方式，完成安装。', '启动后点击图中的“登录”，在官网完成登录，再返回客户端。'],
      screenshot: screenshot('login', 1820, 1220, 'WorkBuddy：客户端登录', 'WorkBuddy 客户端欢迎页，下方黑色登录按钮由官方高亮。', installSource),
      supplement: { title: '安装条件与中文设置', paragraphs: ['Windows 官方指南要求 Windows 10 及以上，不支持 Windows 7、8、8.1。官网“在线使用”与本课桌面版的入口不同。', '账号与验证码只在官方页面填写。界面不是中文时，从左下角头像进入“语言”。使用前查看账号额度和付费说明。'] },
      links: [{ label: '官网下载', href: 'https://www.workbuddy.cn/', external: true }, { label: '完整安装图解', href: installSource, external: true }],
      checkpoint: '已登录客户端，能看到任务输入框。',
    },
    {
      title: '选好练习文件夹', paragraphs: ['在“文档”里新建 workbuddy-weekly，把下方材料下载到其中。'],
      downloads: [{ ...resourceLink('weekly-records.txt', '下载练习材料'), filename: 'weekly-records.txt' }],
      walkthrough: [
        photoStep('workbuddy-workspace-menu', '打开文件夹', '点“选择工作空间”→“打开本地文件夹”，选择 workbuddy-weekly。', '文件夹选择窗口已关闭，回到任务输入框。'),
        photoStep('workbuddy-workspace-selected', '看目录名', '看输入框下方，确认显示 workbuddy-weekly。', '目录名称正确，保留默认权限。'),
        photoStep('workbuddy-check-prompt', '核对材料', '发送下方只读检查，核对返回的目录与文件名。', '回复中有 weekly-records.txt，路径是自己的练习目录。'),
      ],
      prompt: '暂不修改文件。请报告当前工作目录，并列出其中的文件名。', promptLabel: '先核对目录',
    },
    {
      title: '发送要求，确认后生成', paragraphs: ['这次只生成一份 TXT 周报，使用默认权限即可。'],
      walkthrough: [
        photoStep('workbuddy-plan', '先读计划', '发送下方完整任务，检查它的去重、数字和状态处理计划。', '计划保留 12 条总数、FAQ 进行中与评审计划，只新建结果文件。'),
        photoStep('workbuddy-confirm', '确认执行', '计划正确后发送：“执行上述计划，仅新建 weekly-summary.txt。”', '工具开始写文件；下一节打开实际产物核对。'),
      ],
      prompt: '读取 weekly-records.txt，在当前目录生成 weekly-summary.txt。\n按“已完成、进行中、阻塞、下周计划”分组，保留记录编号。\nW2 去重；W5 的 3 条包含在 W1 的 12 条中，不相加；8 条 FAQ 草稿仍为进行中。\n未定日期写“待确认”，不联网补充事实。\n只创建结果文件，不改原文、不安装、不上传或发送材料；同名文件已存在时先告知，不覆盖。\n先给计划，等我确认后执行。完成后给出文件的完整路径。',
      promptLabel: '复制到 WorkBuddy',
      promptPreview: '读取 weekly-records.txt，只新建 weekly-summary.txt。\n先给计划、等确认；完整要求包含去重与数字核对。',
      supplement: { title: '本次用的是什么模式？', paragraphs: ['本次保留默认模式，用任务文字要求“先给计划，等确认”。没有开启界面中的 Plan 开关。仅问答（Ask）不执行文件操作。', '此练习不需要安装依赖、完全访问权限或上传材料；遇到额外请求先核对用途。'] },
    },
    {
      title: '打开文件，检查四件事', paragraphs: ['这是本次实际生成的初稿，可下载对照。自己的文件也要打开检查。'],
      walkthrough: [photoStep('workbuddy-result', '打开实际文件', '打开 weekly-summary.txt 产物预览，点右上角文件夹图标定位文件。', '预览有四组内容，电脑目录里也确实有这个 TXT 文件。')],
      downloads: [{ href: 'practice/workbuddy-session/weekly-summary-before.txt', filename: 'weekly-summary-before.txt', label: '下载本次真实初稿' }],
      list: ['W2 只出现一次。', '总数仍是 12 条，不能算成 15 条。', '8 条 FAQ 草稿是进行中；截图等设计稿是阻塞。', 'FAQ 评审是计划，未知日期写“待确认”。'],
      faq: [['只有回答，没有文件？', '确认没有开启“仅问答”。在同一任务中要求实际创建 weekly-summary.txt，并报告完整路径，再到电脑文件夹核对。'], ['额度不足或执行失败？', '保留进度和不含私人信息的报错。可以先完成材料核对，不必为这次练习立即购买套餐。']],
    },
    {
      title: '修正后，再看一次变更', paragraphs: ['继续原任务，指出错误的记录编号；没有错误时，补一份“待确认事项”。'],
      walkthrough: [photoStep('workbuddy-revised', '复查修正版', '发送下方修正要求，重新打开周报，对照原文和初稿检查。', '保留“下周”安排，补齐待确认事项，原始记录未改写。')],
      downloads: [{ href: 'practice/workbuddy-session/weekly-summary.txt', filename: 'weekly-summary.txt', label: '下载本次真实修正版' }],
      supplement: { title: '这一次具体改了什么？', paragraphs: ['修正版补回“虚构练习材料”标识，W4 恢复“下周安排”，删除重复备注，单列 W3 交付时间与 W4 评审日期。已核对磁盘文件和原文哈希；未重新安装或登录，也未测试系统记事本。'] },
      prompt: '对照 weekly-records.txt，只修正 weekly-summary.txt 中的错误、重复项和无依据内容。原始记录保持不变。末尾列出“待确认事项”，不补造日期。完成后说明修改位置。',
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
