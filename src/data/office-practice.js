import { weeklyMaterial, writingMaterial, resourceLink } from './practice-resources.js';

export const writingPractice = {
  id: 'writing-revise', title: '把一段话改清楚，事实保持不变', description: '用一篇活动通知练习指出问题、限定改写和前后核对。',
  category: 'models', lessonType: 'project', platform: 'general', level: '入门', minutes: 20, tools: ['doubao', 'chatgpt', 'claude'], edited: '2026-09-15', color: 'lilac', cover: ['把一段话改清楚', '语气可以变，事实要保留'],
  goals: ['把模糊的修改要求变具体', '保留日期、地点和未确定事项', '保存改稿与核对记录'], prerequisite: '继续使用自己已有的网页对话工具。原稿、要求和参考结果已附在本课，无需换软件。',
  resultSaving: { material: writingMaterial, filename: 'AIGuide-我的通知改稿.txt', label: '我的改稿与核对记录', placeholder: '改写后的通知：\n\n保留了哪些事实：\n\n还需确认：' },
  sections: [
    { title: '先读原稿，圈出不能改的事实', paragraphs: ['“更专业一点”很难核对。先明确受众是社区居民，目标是120字以内的活动通知；日期、地点、报名截止与携带物品应保留。'], prompt: writingMaterial, promptLabel: '练习原稿', downloads: [resourceLink('writing-material.txt', '下载原稿与要求')] },
    { title: '第一轮只请它指出问题', paragraphs: ['新建对话，使用下面的完整提示词。第一轮观察修改建议是否针对原稿，不急着接受一篇全新文章。'], prompt: `请先阅读原稿，不要直接重写。\n列出3处表达问题，以及不能改动的事实。\n“震撼”“特别值得”等夸张表达可以删掉，时间和地点不能改。\n\n${writingMaterial}` },
    { title: '第二轮再限定范围改写', paragraphs: ['看完建议后，在同一对话继续。把需要保留的内容明确写出，避免模型为追求简洁删掉报名要求。'], prompt: '现在把原稿改成面向社区居民的简短通知，正文不超过120字。\n保留活动时间、地点、报名截止和携带书籍要求；不添加结束时间、报名网址、年份或联系人。\n正文后另列待确认信息，并解释删改了什么。', reference: { label: '人工参考改稿 · 不是 AI 实测输出', columns: ['部分', '示例'], rows: [['通知正文', '10月12日14:30，读书会将在社区图书馆二楼活动室举行。请于10月10日18:00前填写报名表，并在活动当天带一本想分享的书。主持人待确认。'], ['待确认信息', '活动年份、结束时间、报名表入口、主持人。'], ['修改说明', '删去夸张和重复表达，保留日期、地点与参加要求。']] } },
    { title: '对照原稿并保存', paragraphs: ['重点检查“10月10日18:00”没有变成活动时间，“10月12日14:30”没有变成报名截止。检查完再保存自己的版本。'], resultEditor: true, links: [{ href: '#/learn/claude-writing', label: '选学：Claude 网页逐段编辑' }] },
  ], exercises: ['列出原稿中的事实与表达问题', '完成一次有限改写并核对日期和地点', '保存改稿与待确认信息'], takeaway: '修改表达的同时，保留原文能够支持的事实。',
};

export const weeklyPractice = {
  title: '做一份能核对的周报，再保存成模板', description: '用附带的工作记录练习去重、分类、数字核对和周报保存。', edited: '2026-09-15', tools: ['doubao', 'chatgpt', 'claude'],
  prerequisite: '继续使用一个自己可用的对话应用。本课包含完整虚构记录，不需要安装工作流平台。',
  resultSaving: { material: weeklyMaterial, filename: 'AIGuide-我的周报与模板.txt', label: '我的周报与复用模板', placeholder: '本周周报：\n\n待确认信息：\n\n下次复用的提示词：\n\n核对清单：' },
  sections: [
    { title: '从一份完整记录开始', paragraphs: ['这份记录故意保留了一条重复数据、一个阻塞项和不能相加的数字。目标是整理真实状态，而不是把周报写得更像成绩。'], prompt: weeklyMaterial, promptLabel: '虚构工作记录', downloads: [resourceLink('weekly-records.txt', '下载本周工作记录')] },
    { title: '先分类，再生成正文', paragraphs: ['把输入 → 按编号去重 → 分类 → 核对 → 保存画成五步。先检查清单再写正文，发现错误时更容易定位。'], prompt: `请把以下记录整理成周报草稿。\n先输出来源编号、状态、事项、负责人、日期和数字依据，再按已完成、进行中、阻塞、下周计划生成简短周报。\nW2重复只保留一次；W5的3条属于W1的12条，不能相加。\n保留“8条完成、4条待核对”的进行中状态；没有日期就写待确认。\n不补造进度，不发布，不发送。\n\n${weeklyMaterial}` },
    { title: '用参考清单检查状态与数字', paragraphs: ['不要把“整理12条问题”写成“完成12条FAQ”，这两件事不是同一个交付物。W5是修改既有分类，也不是新增3条问题。'], reference: { label: '人工参考 · 分类依据，不是 AI 实测输出', columns: ['状态', '应包含的内容', '依据'], rows: [['已完成', '小林整理12条问题；修正其中3条分类', 'W1、W5，合计仍是12条问题'], ['进行中', '小陈的FAQ草稿完成8条，还有4条待核对', 'W2，只计一次'], ['阻塞', '截图更新等待设计稿，交付时间未定', 'W3'], ['下周计划', '小陈拟安排FAQ评审，具体日期待确认', 'W4']] }, checkpoint: '重复W2已去重，没有出现15条问题，也没有把FAQ写成全部完成。' },
    { title: '故意缺一次信息，检查如何处理', paragraphs: ['在同一对话追加下面的记录，观察是否承认缺少负责人和日期。稳定的模板必须能处理不完整输入。'], prompt: '追加记录W6：准备新版通知，负责人和日期未说明。\n请只补这一条，状态先标“待确认”，不要猜成已完成或下周计划；列出需要补充的问题。', list: ['输入为空：先提示补材料，不生成虚构周报。', '格式不对：要求修正格式后再继续。', '数字不一致：回到记录核对，不为了句子通顺改数字。', '超时后：先确认有没有结果，再决定是否重试。'] },
    { title: '保存周报、模板和核对清单', paragraphs: ['把已经检查的周报与提示词放在下面，并记录自己的检查清单。下周更换输入材料后仍需重新核对，今天成功不代表后续永远正确。'], resultEditor: true, links: [{ href: '#/project/weekly-workflow', label: '进入周报工作流项目' }] },
    { title: '再决定是否自动化', paragraphs: ['先手动跑通几次。如果输入稳定且重复频繁，再考虑脚本或工作流平台；记录来源、运行时间与失败情况。对外发送周报仍由你检查后决定。'], faq: [['要买自动化软件吗？', '这套练习在普通对话中即可完成。重复出现同一种任务，再按实际需要选择工具。'], ['AI 会自动保存到“我的成果”吗？', '不会。这里保存的是你粘贴并修改的内容；AIGuide没有读取第三方应用中的对话。']] },
  ],
};
