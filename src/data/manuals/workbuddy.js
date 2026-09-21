import { workbuddyWorkflows } from './workbuddy-workflows.js';

export const workbuddyManual = {
  scope: '已核对 WorkBuddy 官方快速开始、工作模式、结果查看、技巧与 FAQ。案例复用本站 2026-09-16 的周报实测；前五节简化练习和本轮新增模式等操作未单独实测，原课程证据保留原有验证范围。',
  sources: [{ id: 'start', title: 'WorkBuddy：快速开始', url: 'https://www.workbuddy.cn/docs/workbuddy/Quickstart' }, ...workbuddyWorkflows.sources],
  sections: [
    { id: 'prepare', title: '准备桌面应用和练习目录', paragraphs: ['WorkBuddy 可以在授权的电脑文件夹中处理材料、生成文件。本课使用桌面版，目标是一份能实际打开的周报。首次使用先从官网下载对应系统版本，安装并登录；费用和可用额度以自己的账号为准。'], steps: ['新建一个只放练习材料的文件夹，例如 weekly-practice。', '在文件夹中新建 notes.txt，保存下面的虚构记录。', '在 WorkBuddy 中打开这个本地文件夹，确认界面显示的是练习目录。'], promptLabel: '虚构练习材料 · 保存为 notes.txt', prompt: '以下为虚构工作记录，仅用于练习。\n本周：完成帮助页初稿，共6条问题。\n本周：帮助页初稿完成，共6条问题。（同一事项的重复记录）\n本周：导出功能正在测试，还未完成验收。\n下周计划：补充3条常见问题。\n待确认：导出功能的验收负责人。', check: 'notes.txt 已保存并能打开；当前工作目录中只有练习文件。', sourceIds: ['start'] },
    { id: 'plan', title: '先让它读材料，说明计划', paragraphs: ['先确认它能读到正确文件，再让它写结果。用文字明确“先计划、等确认”是一种任务约定，不等同于已经启用了某个专用模式。'], prompt: '请只读取当前目录的 notes.txt，先列出准备如何整理周报，暂时不要创建或修改文件。指出重复记录、进行中事项和待确认信息。等我确认后，再生成 weekly-report.txt。', check: '计划识别出重复的帮助页记录；没有把“正在测试”写成“验收完成”。', sourceIds: ['start'] },
    { id: 'create', title: '确认计划，生成实际文件', paragraphs: ['确认计划后再要求创建新文件。写清文件名，可以避免只收到聊天中的一段文本，却找不到交付物。'], prompt: '按刚才的计划生成 weekly-report.txt，放在当前练习目录。分成“已完成、进行中、下周计划、待确认”四部分。合并重复事项，不把6条累计为12条；保持下周计划的3条不计入本周成果。保留“虚构练习材料”的说明，不修改 notes.txt。', steps: ['等待任务结束，查看结果区的产物或文件列表。', '打开 weekly-report.txt，确认正文确实存在。', '核对它的保存位置和文件名，保留原始 notes.txt 以便比较。'], check: '目录中同时有原材料和周报；周报四个部分齐全。', sourceIds: ['start'] },
    { id: 'review', title: '按事实修正，不只润色语气', paragraphs: ['重点检查重复项、时间范围和状态。语言流畅不代表事实准确；优先处理把计划写成成果、把测试写成上线之类的错误。'], steps: ['已完成部分应只有帮助页初稿的6条问题，不应合计为12条。', '导出功能保持“测试中、尚未验收”；负责人保持待确认。', '如果结果有错，指出原文依据，要求只改相关位置。'], prompt: '请对照 notes.txt 复查 weekly-report.txt。只修正重复计数、事项状态和本周／下周归属；没有依据的负责人保持待确认。修改后列出你修正的位置，不改变原始材料。', check: '修正版与原材料一致，且能指出具体修改了什么。', sourceIds: ['start'] },
    { id: 'save', title: '离开对话前，再打开一次成果', paragraphs: ['在应用中预览、写入目录、用系统编辑器打开，是三个不同的检查。完成文件任务时，至少要知道成果在哪里，以及离开当前对话后能否找回。'], steps: ['在系统文件管理器中进入练习目录，找到 weekly-report.txt。', '用自己的文本编辑器打开，检查中文、换行和完整正文。', '需要交付时复制一份到交付目录，保留原材料与修正版。', '想看真实操作图和真实初稿差异，可以继续下方的本站周报课。'], check: '不用依赖聊天记录，也能找到并打开最终周报。', sourceIds: ['start'] },
  ],
  extensions: workbuddyWorkflows.sections,
  lessons: [{ id: 'workbuddy-first', label: '跟做：带实拍和文件对照的周报课' }],
};
