import { weeklyMaterial, resourceLink } from './practice-resources.js';

export const workbuddyPractice = {
  id: 'workbuddy-first', productId: 'workbuddy', platform: 'desktop', lessonType: 'operation',
  title: 'WorkBuddy 入门：把工作记录整理成一个真实文件',
  description: '从安装、选择工作空间到生成周报，核对数字，再打开电脑上的实际文件。',
  category: 'automation', level: '入门', minutes: 25, tools: ['workbuddy'], color: 'sage', edited: '2026-09-15',
  cover: ['让工作记录有条理', '选择文件夹 · 生成 · 核对'],
  goals: ['安装并找到工作空间入口', '用明确要求生成周报文件', '核对原始记录与实际成果'],
  prerequisite: '本课按 Windows 10 及以上桌面版编写。需要能访问 WorkBuddy 官网、可用账号与额度，以及一个空的练习文件夹；手机可以阅读。',
  resultSaving: { material: weeklyMaterial, filename: 'AIGuide-WorkBuddy练习记录.txt', label: '我的 WorkBuddy 练习记录', placeholder: '练习目录：\n生成的文件名：\n是否在电脑上打开：\n重复记录如何处理：\n数字和状态是否正确：\n未完成或卡住的步骤：' },
  sections: [
    { title: '安装 WorkBuddy，完成登录', paragraphs: ['WorkBuddy 是腾讯的 AI 办公工具。这里使用能选择电脑工作文件夹的桌面版；官网的“在线使用”是另一个入口，本课不照搬它的按钮。', '安装、登录和任务界面已经核对官方文档。账号内生成、文件写入与导出尚未实测；下面的任务和检查标准由本站设计。'], actionSteps: ['打开 WorkBuddy 官网，点击“立即下载”，选择适合自己系统的安装包。Windows 官方指南要求 Windows 10 及以上。', '打开安装包，阅读协议后自行决定是否接受；按安装向导选择目录和桌面快捷方式，完成安装。', '启动 WorkBuddy，点击“登录”。在官网弹窗按自己可用的方式登录，完成后返回客户端。账号、验证码只在官方页面填写。', '若界面不是中文，可按官方指南从左下角头像进入“语言”。核对账号可用额度，再开始下面的小任务。'], links: [{ label: 'WorkBuddy 官方下载', href: 'https://www.workbuddy.cn/', external: true }, { label: 'Windows 官方安装说明', href: 'https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Installation-Win-Guide', external: true }], checkpoint: '我能打开桌面客户端、完成登录并看到任务输入区域。' },
    { title: '准备一个只放练习材料的文件夹', paragraphs: ['在“文档”中新建 AIGuide-practice，再建立 workbuddy-weekly 子文件夹。下载下面的虚构工作记录，放入这个文件夹；不需要使用自己的工作资料。'], downloads: [{ ...resourceLink('weekly-records.txt', '下载虚构工作记录'), filename: 'weekly-records.txt' }], actionSteps: ['打开新建的 workbuddy-weekly，确认里面有 weekly-records.txt。双击文件，看看是否能读到 W1、W2 等编号。', '回到 WorkBuddy 新建任务，点击输入框左下角“选择工作空间”，选择 workbuddy-weekly。', '先发送：“暂不修改文件，请报告当前工作目录，并列出其中的文件名。”核对路径和 weekly-records.txt，再继续。'], checkpoint: '工具看到的目录与我的练习文件夹一致，能找到原始记录。', links: [{ label: '官方说明：选择工作空间与补充材料', href: 'https://www.workbuddy.cn/docs/workbuddy/Create-Task', external: true }] },
    { title: '说明输出文件，让它先规划再执行', paragraphs: ['这次交付一个 TXT 周报，避免第一课就安装办公软件。请它保留原文件，只在当前目录创建一个新结果。若出现额外安装或覆盖请求，先核对是否属于本课要求。'], prompt: '请读取当前工作空间中的 weekly-records.txt，先说明计划，再生成 weekly-summary.txt。\n按“已完成、进行中、阻塞、下周计划”分组，每一条保留原记录编号。\n重复的 W2 只保留一次。W5 的 3 条属于 W1 的 12 条，不能相加；8 条 FAQ 是草稿，不写成全部完成。\n资料未写明的日期保留“待确认”。不要联网补充事实。\n仅创建 weekly-summary.txt，不修改原始记录、不安装依赖、不上传或发送材料。已有同名文件时先说明，不覆盖。\n完成后报告实际文件路径和打开方式；不要只在聊天里贴周报。', promptLabel: '可复制的任务要求', checkpoint: '工具开始按指定范围处理，交付物是一个明确命名的文件。' },
    { title: '打开产物，逐条核对原始记录', paragraphs: ['在右侧结果区查看“产物”或“工作空间文件”，打开 weekly-summary.txt。官方文档也提供“变更”视图，可以检查是否动了原始文件。再到自己的文件夹中双击结果，确认电脑上确实有这个文件。'], actionSteps: ['核对 W2 没有重复，8 条草稿仍在“进行中”。', '核对问题整理是 12 条，不能把其中修正分类的 3 条相加变成 15 条。', '核对截图等待设计稿仍是“阻塞”，FAQ 评审仍是“计划”，未定日期写“待确认”。', '检查原始 weekly-records.txt 仍在且没有被改写。只有聊天回复、找不到实际文件时，还不算完成。'], faq: [['只有聊天里的周报，没有文件？', '继续在同一任务中说明：请实际创建 weekly-summary.txt，并给出完整路径。再在电脑文件夹中核对。'], ['额度不够或任务失败？', '先保留已完成的内容和不含私人信息的报错。可以只完成阅读与材料核对，不为了这次练习立即购买套餐。']], links: [{ label: '官方说明：产物、工作空间文件与变更', href: 'https://www.workbuddy.cn/docs/workbuddy/Results', external: true }], checkpoint: '我已经在电脑上打开结果文件，并逐项核对数字、重复项和状态。' },
    { title: '在同一任务里修正，再检查一次', paragraphs: ['如果发现数字、状态或日期有误，指出对应记录编号，只让它修改结果文件。若都正确，也可以追加一个明确的小要求：在周报末尾集中列出“待确认事项”。'], prompt: '请对照 weekly-records.txt 检查 weekly-summary.txt。只修正结果文件中的无依据内容、重复项和错误状态，原始记录保持不变。末尾列出“待确认事项”，不要补造日期。完成后说明修改位置，我会重新打开文件核对。', checkpoint: '重新打开了修改后的文件，并检查原来发现的问题是否解决。' },
    { title: '留下自己的练习记录', paragraphs: ['周报文件在自己的电脑目录里。下面保存的是你的练习记录，不会自动上传或打包 WorkBuddy 生成的文件。请另行保留原始材料与周报，未做的步骤如实写“未完成”。'], resultEditor: true, links: [{ label: '再试试豆包网页版', href: '#/learn/doubao-notice?path=starter' }, { label: '反馈这次 WorkBuddy 使用体验', href: '#/feedback?track=workbuddy' }], checkpoint: '原始材料、实际周报和练习记录都已保留。' },
  ],
  exercises: ['在 WorkBuddy 中选择正确的练习文件夹', '生成并在电脑上打开 weekly-summary.txt', '核对重复项、数字与状态，保存练习记录'],
  takeaway: '让 AI 交付一个能找到、能打开、能核对的实际文件。',
};
