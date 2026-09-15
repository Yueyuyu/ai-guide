export const projectStages = {
  'research-note': [
    { title: '准备编号资料', text: '给每份材料编号，记录标题和来源，形成可以重新打开的来源表。', checks: ['每份材料都有编号', '来源可以重新打开'], lesson: 'research-first' },
    { title: '明确整理问题', text: '写出本次要回答的问题与材料范围，让结果有明确的边界。', checks: ['问题具体到可以核对', '说明了使用哪些材料'], lesson: 'prompt-template' },
    { title: '整理结论与依据', text: '将结论、材料编号和原文摘录放在一起；没有证据的内容单独列出。', checks: ['每条结论附有出处', '推断与事实已分开'], lesson: 'research-first' },
    { title: '核对并保存', text: '逐条回到原文核对，把来源表、结论出处表与待确认清单保存在自己的文件中。', checks: ['数字、日期和引用与原文一致', '三份成果已保存在自己的文件中'], lesson: 'research-first' },
  ],
  'personal-page': [
    { title: '写清页面需求', text: '列出简介、项目和联系方式三个板块，用示例信息明确布局。', checks: ['页面板块和内容明确', '使用练习信息'], lesson: 'prompt-template' },
    { title: '准备项目环境', text: '确认工具和账号入口，创建独立练习目录，再开始编程任务。', checks: ['当前工作目录正确', '已了解所用工具的运行条件'], lesson: 'codex-web' },
    { title: '实现并修改页面', text: '先检查页面能否打开，再按具体问题修改并保留修改记录。', checks: ['页面能在本地打开', '至少完成一次明确的修改'], lesson: 'codex-iterate' },
    { title: '检查不同屏幕', text: '在桌面和手机检查内容、链接和键盘操作，保存运行方式。', checks: ['手机和桌面均无内容遮挡', '链接、按钮与运行说明已核对'], lesson: 'website-check' },
  ],
  'weekly-workflow': [
    { title: '整理输入记录', text: '保留本周事项、原始日期和负责人，不在材料阶段扩大成果。', checks: ['事项保留原始日期', '每条记录都能回到来源'], lesson: 'workflow-basics' },
    { title: '约定分类与输出', text: '区分已完成、进行中、阻塞和下周计划，并定义缺失字段的处理方式。', checks: ['四种工作状态已明确', '缺失信息有处理规则'], lesson: 'workflow-basics' },
    { title: '生成并核对草稿', text: '先查看结构化清单，再对照原始记录修改周报草稿。', checks: ['计划没有写成已完成', '数字与负责人逐项核对'], lesson: 'workflow-basics' },
    { title: '保存可复用流程', text: '保存模板、提示词和核对表。发布由你检查后决定。', checks: ['三份成果已保存', '保留了人工核对与发布环节'], lesson: 'workflow-basics' },
  ],
};
