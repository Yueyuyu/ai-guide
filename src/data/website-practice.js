import { personalBrief, websiteChecklist, resourceLink } from './practice-resources.js';

export const codexPractice = {
  title: '用 ChatGPT 桌面版，创建第一个本地网页',
  description: '用一份完整需求单，创建无需安装依赖、能在本地打开的个人主页。', edited: '2026-09-15',
  prerequisite: '电脑浏览器能正常访问官方服务，拥有可用账号，并按官方下载页安装当前系统支持的桌面应用。先准备空的练习文件夹；尚不满足条件时可以阅读示例，或先学豆包网页路线。',
  exercises: ['在独立目录中创建页面', '实际打开页面并检查内容和链接', '检查手机宽度，并记录发现的问题或实际结果'],
  resultSaving: { material: personalBrief, filename: 'AIGuide-我的网页创建记录.txt', label: '我的创建记录', placeholder: '练习文件夹：\n生成了哪些文件：\n页面打开方式：\n检查到的问题：' },
  sections: [
    { title: '先检查网络，再安装 ChatGPT 并进入 Codex', paragraphs: ['先打开下方 ChatGPT 官方页面并检查账号能否正常登录。已经能使用就继续，不需要额外配置网络；无法访问时先完成网络准备教程。安装的软件现在叫 ChatGPT desktop app（ChatGPT 桌面版），应用里仍保留 Codex 编程入口。选择 Codex，再用 New chat（新建聊天）开始。本课的“网页”是本地作品，不是云端任务。', '先让工具说明当前工作目录，确保它看到的是这次练习文件夹。不要把桌面上的旧项目当作空白目录。服务访问、系统支持和账号权益以官方当前说明为准；仅安装成功不代表已经能执行任务。'], actionSteps: ['在电脑的“文档”中创建 AIGuide-practice 文件夹，再在其中创建空的 personal-page 文件夹。Windows 用文件资源管理器，Mac 用访达。', '先确认官方页面可打开，再从下方入口安装支持当前系统的 ChatGPT 桌面应用；打开后按官网提示登录。', 'Windows 直接使用原生桌面环境即可。本课不需要先装 WSL；开始前保留应用的审批与沙盒设置，逐次阅读涉及文件或命令的请求。', '使用应用中的打开文件夹入口，选择刚创建的 personal-page。选择 Codex，再用 New chat（新建聊天）开始任务。', '先发送：“不要修改文件，只报告当前完整工作目录和已有文件。”核对路径与自己的空目录一致，再继续下一步。'], links: [{ href: 'https://learn.chatgpt.com/docs/app', label: 'ChatGPT 官方桌面安装与入门', external: true }, { href: 'https://learn.chatgpt.com/docs/windows/windows-app', label: 'Windows 官方说明', external: true }, { href: '#/path/network', label: '服务还打不开？先做网络准备' }, { href: '#/path/starter', label: '还没准备好？先从网页入门' }], checkpoint: '账号可用，任务返回的完整路径与自己的练习目录一致。' },
    { title: '先看要做出什么', paragraphs: ['这次只做三个板块：简介、项目、联系说明。下面的参考作品由本站编写，帮助你理解验收目标；它不是Codex账号内生成结果，也不代表你已经完成课程。'], downloads: [resourceLink('personal-brief.txt', '下载完整需求单')], links: [{ href: 'practice/personal-page-reference.html', label: '打开参考作品（新标签页）', external: true }], prompt: personalBrief, promptLabel: '练习需求 · 虚构信息' },
    { title: '把完整任务交给 Codex', paragraphs: ['下面的提示词可以直接发送。明确只创建两个文件、无需安装依赖，让第一次练习的运行方式足够简单。'], prompt: `请在当前练习目录中完成这份需求。\n先检查目录，说明计划与文件范围，再开始创建。若已有同名文件，先说明内容，保留原文件。\n只生成index.html和README.md：样式写在HTML中，无构建步骤，无需npm或其他依赖。\n完成后给出两个文件的位置和双击HTML的打开方式；只报告实际完成的检查。\n\n${personalBrief}`, checkpoint: '目录内出现实际文件；聊天中的代码片段不等于文件已创建。' },
    { title: '打开实际文件，核对三个板块', paragraphs: ['在文件管理器里找到 index.html，双击用浏览器打开。核对页面上的林同学、三个项目和“暂不提供真实联系方式”，再点击导航看看是否到达相应板块。', '如果浏览器显示源码或文件名是 index.html.txt，检查文件扩展名与保存格式。如果有构建命令或缺失依赖，先让 Codex对照需求恢复为单文件静态页面。'], actionSteps: ['在 personal-page 目录确认 index.html 和 README.md 都存在，打开说明文件核对运行方式。', '右键 index.html，选择“打开方式”中的浏览器。Windows 可先在资源管理器的“查看”中显示文件扩展名，避免误把 .txt 当网页。', '逐项点“简介”“项目”“联系”导航，观察是否到达对应内容。', '缩窄浏览器，再检查文字是否可读。把没检查的地方如实写进下方创建记录，后面的验收课再补。'], checkpoint: '自己在浏览器看到了实际网页，三个板块和导航可逐项核对。', faq: [['出现命令请求，该怎么办？', '先阅读命令用途。本练习无需安装第三方依赖；如果工具提出安装，请它解释当前静态页面为什么需要，再对照需求调整。'], ['页面能打开，算已经上线了吗？', '这里只完成本地作品。公开访问需要另外选择部署服务、核对发布内容与域名。'], ['能直接拿参考作品当成我的结果吗？', '参考作品用于理解目标。实操应在自己的练习目录完成生成、修改和核对，保存实际检查记录。']] },
    { title: '保存创建记录，继续修改', checkpoint: '已经打开 index.html，保存了两个实际文件和创建记录；接下来沿用同一目录添加标签。', paragraphs: ['网页文件留在自己的电脑目录。下面仅保存创建过程、打开方法和待解决问题，不会上传或执行你的网页代码。下一课沿用这个目录和Codex，不需要换编辑器。'], resultEditor: true },
  ],
};

export const websiteLessons = [
  {
    id: 'codex-iterate', productId: 'codex', platform: 'desktop', lessonType: 'operation', title: '继续用 ChatGPT，完成一次明确修改', description: '在同一个网页上提出小范围改动，查看文件差异并复查。', category: 'coding', level: '入门', minutes: 25, tools: ['codex'], color: 'peach', cover: ['让网页再好一点', '说清范围，检查差异'], edited: '2026-09-15',
    goals: ['写出修改范围与完成标准', '检查实际文件差异', '对比修改前后的网页'], prerequisite: '完成上一课的本地网页，保留index.html和README.md。沿用同一Codex练习目录。',
    resultSaving: { material: '修改任务：给三个项目依次增加“阅读”“计划”“记录”标签，其余文字与板块保持原样。', filename: 'AIGuide-我的网页修改记录.txt', label: '我的修改记录', placeholder: '修改要求：\n修改了哪些文件：\n修改前后差异：\n实际复查结果：' },
    sections: [
      { title: '先留一份修改前的对照', paragraphs: ['在文件管理器里复制 index.html，将副本命名为 index-before-tags.html；原来的 index.html 继续作为要修改的文件。也可以使用已经配置好的版本控制。重新打开当前页面，记录原来三个项目的样子。', '本课做一个明确的新需求：为三个项目分别加上阅读、计划、记录标签。即使页面本身没有Bug，也能练习有限修改。'] },
      { title: '在同一任务里说明修改范围', paragraphs: ['让Codex先读当前文件，再修改目标区域。不要让它重新生成整个项目。'], prompt: '请阅读当前index.html，仅修改项目板块：\n读书清单增加“阅读”标签；活动计划增加“计划”标签；学习手记增加“记录”标签。\n标签在手机宽度不溢出。保留其他文案、导航、配色与布局。\n先说明改动位置；完成后列出实际修改文件和需要复查的地方，不安装依赖。' },
      { title: '查看差异并重新打开页面', paragraphs: ['在应用的修改查看区或文件对比工具中阅读差异，确认只是新增标签与相关样式。界面名称以当前版本为准；若没有差异视图，也可以对照自己保存的原文件。', '刷新本地浏览器，检查三个标签是否对应正确项目；缩窄窗口，确认换行后仍可阅读。若刷新没有变化，核对打开的文件路径是否与工具修改路径一致。'], list: ['有无意外删掉简介和联系说明？', '只添加了三种指定标签吗？', '修改后导航仍然到达原来的位置吗？'] },
      { title: '记录变化与复查结果', paragraphs: ['写清“改了什么”和“实际看到了什么”。没有检查的设备单独记录，下一课继续完成网页验收。'], resultEditor: true },
    ], exercises: ['给当前网页提交一项范围明确的修改', '对照实际文件检查变化范围', '刷新并核对三个标签与导航'], takeaway: '一次修改越具体，越容易判断它是否完成。',
  },
  {
    id: 'website-check', title: '把网页从“能打开”检查到“能使用”', description: '按桌面、手机、键盘与内容清单验收，保存自己的交付记录。', category: 'coding', lessonType: 'project', platform: 'general', level: '入门', minutes: 25, tools: ['codex', 'cursor'], color: 'sage', cover: ['完成第一个作品', '逐项核对，再交付'], edited: '2026-09-15',
    goals: ['检查内容和链接', '在不同宽度和键盘下复查', '保存运行说明与未测项'], prerequisite: '能在本地打开自己的网页。使用现有浏览器即可，不要求安装另一款编程工具。',
    resultSaving: { material: websiteChecklist, filename: 'AIGuide-我的网页验收记录.txt', label: '我的网页验收记录', placeholder: '文件与打开方法：\n已检查的宽度：\n内容与导航：\n键盘操作：\n发现的问题与复查：\n尚未检查：' },
    sections: [
      { title: '按需求单检查，而不是凭印象', paragraphs: ['打开自己生成的网页，逐项检查简介、三个项目与联系说明。用鼠标点击每个导航链接，确认位置正确，而不仅是按钮颜色发生变化。'], downloads: [resourceLink('website-checklist.txt', '下载网页验收清单')] },
      { title: '检查手机宽度与放大阅读', paragraphs: ['先拖窄浏览器窗口观察布局。需要准确宽度时，在Chromium浏览器中打开开发者工具，开启设备工具栏，分别设为390px和320px；如果尚不会操作，先记录“仅缩窄窗口观察”，不要写成真实手机已测试。', '回到桌面大小，使用浏览器放大功能检查文字仍能完整阅读。重点看长标题、项目标签和页尾是否超出边界。'], list: ['页面是否需要左右拖动才能看全文？', '文字、卡片是否互相遮住？', '页面放大后内容是否还能滚动读到？'] },
      { title: '再用键盘走一遍', paragraphs: ['先按Tab，在导航链接之间移动，观察焦点是否清楚可见；按Enter，检查链接能否操作。如果有自己的表单或按钮，再检查输入、错误提示与提交状态。', '本练习没有真实表单。不要为表现“功能完整”临时添加一个无法提交的联系表单。'] },
      { title: '把问题写成工具能复现的描述', paragraphs: ['找到问题后，在原Codex任务中提供宽度、步骤、实际表现和预期。修复后重做原来的操作，并检查相邻内容。'], prompt: '请修复我在当前网页发现的问题。\n环境与宽度：[填写实际环境]\n复现步骤：[填写操作]\n实际结果：[填写问题]\n预期结果：[填写目标]\n只修改相关区域，保留其他内容。完成后说明改动文件，并复查相同操作。', promptLabel: '问题描述模板 · 方括号处换成实际记录' },
      { title: '保存本地交付记录', checkpoint: '两个源文件与验收记录都已另行保存；未测设备如实记录，不把设备模拟写成真人手机体验。', paragraphs: ['确认index.html和README.md仍在练习目录，运行说明与实际打开方式一致。下面保存验收记录；页面源文件需要自己另行备份。'], resultEditor: true, links: [{ href: '#/project/personal-page', label: '完成个人主页项目自查' }, { href: '#/feedback?track=codex', label: '反馈 ChatGPT 网页练习的实际体验' }, { href: '#/learn/cursor-debug', label: '选学：用 Cursor 排查表单问题' }] },
    ], exercises: ['逐个检查内容与导航', '检查不同宽度和键盘操作并记录实际范围', '保存页面文件、运行说明与验收记录'], takeaway: '能复现、能核对、能交接，作品才方便继续完善。',
  },
];
