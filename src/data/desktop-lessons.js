import { officialSources as sources } from './products.js';

export const desktopLessons = [
  {
    id: 'chatgpt-desktop-start', title: 'ChatGPT 桌面版：认识聊天、工作与 Codex', description: '从安装和选择工作位置开始，在同一个应用中找到正确模式。', category: 'models', platform: 'desktop', productId: 'chatgpt-desktop', level: '入门', minutes: 25, tools: ['chatgpt-desktop'], color: 'sage', cover: ['桌面版入门', '选对模式，再开始'], sources: [sources.desktop],
    goals: ['认出 ChatGPT 和 Codex 的统一桌面入口', '区分聊天、工作与编程任务', '在练习位置创建并打开一份文件'], prerequisite: '从本文官方资料打开桌面下载页，选择与你的系统匹配的版本。准备一个仅含练习材料的文件夹。',
    sections: [
      { title: '安装应用，用 ChatGPT 账号登录', paragraphs: ['打开官方桌面应用页面，选择 Windows、macOS 或对应的系统版本下载。安装后从开始菜单或应用目录启动，再用 ChatGPT 账号登录。', '当前官方文档把这个入口称为 ChatGPT desktop app；旧版本、安装文件或快捷方式中仍可能看到 Codex 名称。先看应用里的入口，不要因为名称不同重复购买或重复安装。'], checkpoint: '应用已打开，能看到聊天或项目入口。安装完成不等于已经订阅付费功能。' },
      { title: '先选 ChatGPT，再选聊天或工作', paragraphs: ['选择 ChatGPT 时，输入框上方的 Chat（聊天）适合提问和讨论，Work（工作）适合处理文件、生成文档和多步骤任务。选择 Codex 时，按编程任务的方式打开项目并新建聊天。', '这几个入口可以使用相关模型，但处理任务的方式不同。今天练习整理文档，选择 ChatGPT 的工作模式；下一篇做网页时再学习 Codex 入口。'], list: ['问“这句话是什么意思”：聊天。', '整理材料并生成可打开的文档：工作。', '读取项目、修改代码和运行检查：Codex。'], checkpoint: '在输入任务前，能说出自己选中了哪种模式。' },
      { title: '选择练习位置，生成一份工作记录', paragraphs: ['新建项目或打开练习文件夹，核对显示的路径。添加一份只有虚构信息的工作记录，告诉它要交付的文件名和内容。', '电脑文件夹、上传附件和已连接服务的资料不是同一来源。只向本任务提供确实需要的材料；看到需要授权的操作时，先读清用途。'], prompt: '请把练习材料整理为“本周工作清单.md”。\n分为已完成、进行中和待确认。\n保留原始日期，不添加材料中没有的成果。\n把结果作为新文件保存到当前练习位置，完成后打开文件让我检查。', checkpoint: '完成后能打开实际文件，确认位置、文件名和正文。' },
      { title: '在预览中检查，再做一次局部修改', paragraphs: ['打开结果预览，核对分类和原文。要求只修正一个段落，再次查看文件，确认修改确实写入。', '本篇操作的是桌面应用。网页版即使能生成相同文档，也不能据此认定它已经保存到电脑上同一目录；下载与本地保存要分别确认。'] },
    ], exercises: ['找到 ChatGPT、聊天／工作和 Codex 的入口', '在练习位置生成并打开一份文档', '完成一次局部修改并核对文件'], takeaway: '同一个桌面应用里，任务模式决定怎么做事；模型选项决定由哪个模型处理。',
  },
  {
    id: 'claude-desktop-start', title: 'Claude Desktop：安装电脑软件，认清三个入口', description: '从下载、登录到聊天、Cowork、Code，先认识自己面前的软件。', category: 'models', platform: 'desktop', productId: 'claude-desktop', level: '入门', minutes: 20, tools: ['claude-desktop'], color: 'peach', cover: ['Claude 桌面版', '安装、登录与入口'], sources: [sources.claudeDesktop, sources.cowork],
    goals: ['从官方页面安装对应系统版本', '分清聊天、Cowork 与 Code', '找到桌面扩展设置并理解权限'], prerequisite: '一台符合官方下载页面系统要求的电脑和 Claude 账号。本篇先学习聊天与设置，Cowork、Code 的可用性需看账号权益。',
    sections: [
      { title: '下载与电脑系统一致的版本', paragraphs: ['打开 claude.ai/download，按 Windows 或 macOS 选择下载。安装完成后，从开始菜单或应用程序目录启动 Claude，用自己的 Claude 账号登录。Linux 版本目前有单独的安装说明，请按官方文档选择架构和安装方式。', 'Claude Desktop 是软件名称，Claude 模型是它使用的能力。本文不会让你在终端输入 claude；那属于 Claude Code 终端教程。'], checkpoint: '打开的是独立 Claude 应用窗口，不是浏览器里的 claude.ai 标签页。' },
      { title: '先从聊天入口完成一次问答', paragraphs: ['在首页输入框选择 Chat（聊天），粘贴一段测试文字，请它改写为三条要点。这个练习无需连接电脑上的文件夹。', '如果看到 Cowork，它用于多步骤工作；如果看到 Code，它用于代码项目。部分入口依赖套餐、组织设置和版本，找不到时先查账号与官方说明，不要把它当作安装失败。'], prompt: '请把这段通知压缩成三条要点，不添加新信息：\n周五下午三点在会议室讨论秋游。活动日期尚未决定，参加者需要提前准备一个场地建议。', checkpoint: '得到时间、地点和准备事项，活动日期仍然标为未确定。' },
      { title: '查看扩展设置，认识桌面端的连接能力', paragraphs: ['在应用设置中找到 Extensions（扩展）。官方说明用这个入口管理桌面扩展及本地工具连接。第一次学习只查看说明，无需安装任何扩展。', '聊天里手动添加附件只提供你选中的材料；连接本地工具可能让 Claude 读取或操作你授予访问的资源。应根据具体任务选择，而不是为了“功能齐全”全部开启。'], checkpoint: '能区分手动附件、桌面扩展和 Cowork 连接文件夹这三种提供材料的方式。' },
    ], exercises: ['安装并登录官方 Claude Desktop', '在聊天模式完成一次通知整理', '找到扩展说明并说出聊天与 Cowork 的区别'], takeaway: '先认清软件和入口，后续的文件协作、编程与模型设置就不会混在一起。',
  },
  {
    id: 'claude-cowork-desktop', title: 'Claude Cowork 桌面端：整理一个练习文件夹', description: '选择任务模式，连接一小份材料，再检查整理后的真实文件。', category: 'automation', platform: 'desktop', productId: 'claude-cowork', level: '入门', minutes: 30, tools: ['claude-cowork'], color: 'peach', cover: ['电脑文件整理', '用 Cowork 完成任务'], sources: [sources.cowork],
    goals: ['在桌面应用选择 Cowork', '明确允许访问的练习文件夹', '检查输出文件与原始资料的关系'], prerequisite: '已安装最新版 Claude Desktop，账号可使用 Cowork。新建一个练习文件夹，放入三份公开或虚构的短文本，不使用真实重要目录。',
    sections: [
      { title: '在首页选择 Cowork', paragraphs: ['打开 Claude Desktop，在首页输入框左下角选择 Cowork（工作协作）。如果仍选着 Chat（聊天），先切换后再发任务。', '如果找不到 Cowork，先更新应用并检查账号或组织设置。官方当前列出 Pro、Max、Team 等套餐；Enterprise 还需要管理员开启。网页与手机端处于测试版范围。能看到聊天窗口，不代表账号已开通工作模式。'], checkpoint: '输入框已选择 Cowork，任务将作为工作会话开始。' },
      { title: '连接练习材料，先让它列出文件', paragraphs: ['在会话中添加或连接练习文件夹，确认它显示的范围。先要求只列出文件名和用途，不修改文件，用返回结果核对是否选对了位置。', '当前官方资料说明云端会话可以持续运行；访问电脑本地文件仍需要桌面应用在线、会话起于桌面且文件夹已经连接。不要把关闭电脑后的后台运行理解为仍能访问离线文件。'], prompt: '请只读取已连接的练习文件夹，列出文件名、内容主题和是否有重复。\n先不要改名、移动或覆盖任何文件。\n告诉我你准备如何整理，并列出需要我确认的缺失信息。', checkpoint: '列出的文件与练习文件夹相符，没有读到其他目录。' },
      { title: '生成一份索引，保留原文件', paragraphs: ['核对清单后，让 Cowork 新建一个资料索引，按文件名、主题和关键事项汇总。这次只新增一个文件，更容易看清输入和输出关系。', '打开结果文件，逐条核对来源。若某份材料没有日期，索引里应该写未提供，而不是出现猜测日期。'], prompt: '按已确认的清单，新建“资料索引.md”。\n包含文件名、主题、关键事项和原文位置。\n保留原文件，缺失信息写“未提供”。\n完成后列出新建文件的实际位置，并打开结果供检查。', checkpoint: '练习文件夹中确实出现索引文件，内容能追溯到三份材料。' },
    ], exercises: ['在桌面首页选择 Cowork 并连接练习材料', '核对只读文件清单', '打开新增索引并抽查三条来源'], takeaway: '桌面端学习重点是文件范围和实际输出，而不仅是聊天框里出现一份答案。',
  },
  {
    id: 'claude-cowork-web', title: 'Claude Cowork 网页端：用上传材料生成文档', description: '通过浏览器发起云端任务，预览和下载成果，理解本地文件条件。', category: 'automation', platform: 'web', productId: 'claude-cowork', level: '入门', minutes: 25, tools: ['claude-cowork'], color: 'peach', cover: ['网页工作协作', '上传材料，下载成果'], sources: [sources.cowork],
    goals: ['从网页首页切换 Cowork', '为云端任务提供两份附件', '预览下载成果并找回会话'], prerequisite: '可访问 claude.ai，账号已获得网页 Cowork 功能。准备两份公开活动方案；网页功能的测试版范围和组织开关以账号页面为准。',
    sections: [
      { title: '在浏览器的首页开始工作会话', paragraphs: ['打开 claude.ai，进入 Home（首页），在输入框左下角选择 Cowork。网页聊天和 Cowork 共享首页，关键在于输入框选择的模式。', '本篇使用云端附件，不要求安装桌面软件。如果你的账号没有 Cowork，可以先读 Claude 网页聊天教程；聊天模式的回答不能算作已完成本篇云端任务练习。'] },
      { title: '上传方案，指定交付文档', paragraphs: ['通过输入框附件入口添加两份方案，等文件上传完成，确认文件名都在会话中。要求输出一份可以打开的方案对照文档，而不是只要一条聊天回复。', '网页任务使用上传后的材料。电脑上的“C 盘某文件夹”只是一个路径字符串，不会因为你把路径发到网页聊天里就自动可读。'], prompt: '请比较上传的两份活动方案，生成一份方案对照文档。\n字段：场地、人数、已知费用、缺失信息。\n每项注明来自哪份材料。\n不要替我做报名或付款操作。', checkpoint: '任务中能看到附件与处理过程，结果提供可打开的文档。' },
      { title: '预览、下载，再从历史记录找回', paragraphs: ['先预览文档，检查表格和出处。确认后下载到电脑，并从下载位置实际打开一次，区分在线预览和本地保存。', '官方资料说明云端会话可跨设备延续。访问本地文件、浏览器或电脑工具则仍可能需要在线的 Claude Desktop、起于桌面的会话和已连接文件夹；本篇附件练习不依赖这些连接。'], checkpoint: '本地能够打开下载文档，也能从同一账号的历史中重新进入会话。' },
    ], exercises: ['从网页首页选择 Cowork', '上传两份材料并获得对照文档', '预览下载成果并重新找到会话'], takeaway: '网页教程要教会上传、云端任务和下载，不能照搬桌面文件夹操作。',
  },
];
