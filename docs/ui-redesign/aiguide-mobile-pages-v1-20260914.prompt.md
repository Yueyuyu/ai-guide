# AIGuide 手机端与状态稿 V1 · 实际提示词

生成方式：内置 image_gen；每张方案板独立调用。参照桌面首页、教程正文与品牌参考表适配手机版式。画面是节选，未绘制的滚动内容不能视为已经出稿。

## 全局提示词（与每张说明拼接）

```text
Use case: ui-mockup.
Asset type: high fidelity MOBILE WEBSITE design review board for AIGuide, a Chinese AI learning website.
Create one carefully composed landscape board containing exactly THREE separate MOBILE WEB viewports side by side, each approximately 390 logical px wide and 844 logical px tall. Render at high resolution (roughly 1536 x 1280 or larger) so simplified Chinese stays crisp and legible. Each mobile viewport has its own bounded scroll area; show a plausible visible excerpt, not an entire desktop page squashed to fit. No phone hardware, no perspective, no browser address bar, no OS status bar. Thin subtle rounded viewport boundary only, aligned tops and bottoms, generous white gutters, a small Chinese scene label above each viewport. Neutral pale gray board background, white screens.
REFERENCE INPUT ROLES: image 1 is the selected desktop home: preserve the visual identity and exact three course illustration styles, adapting composition to mobile. Image 2 is a desktop tutorial: preserve the reading typography and component character, adapting composition to mobile. Image 3 is a brand reference sheet only: use these actual brand shapes and original colors where relevant; none of its English annotations belong in the UI.
Visual identity: AIGuide dark navy wordmark with the existing two blue book pages (right page taller, white middle opening). Navy #14213D, blue #2F63F3, secondary slate #63718D; white, pale blue #EEF5FF, lavender #F1EEFF, mint #E9F8F3. Restrained 12px card corners, thin separators, flat mostly white surfaces. Clear Chinese sans-serif. Logical body type about 16px, small helper type no smaller than 12px, page heading about 28px; normal UI proportions, readable at phone size, no enlarged everything. Keep ample touch targets, about 44px.
Global mobile header on each screen: small book logo and AIGuide at left, magnifying glass icon, compact blue text '继续学习', hamburger menu at right. No desktop horizontal top-level navigation crowded into mobile. No bottom tab bar invented. Header height about 56px. Primary actions labeled clearly. Do not use dark mode, giant metrics, gradients over text, decorative 3D blobs, rocket/sprout/airplane/trophy emoji, fake portraits, fake account identity, streaks, fake hours, English UI sentences, or empty lorem ipsum.
All visible content is in simplified Chinese except real product names, API, and AIGuide. Mark board footnote '手机端设计稿 · 页面节选 · 内容示意'. This is a design artifact, not an actual product screenshot.
```

## 找到学习起点

初稿文件：aiguide-mobile-start-v1.png；校对后使用 aiguide-mobile-start-v2.png。

```text
BOARD TITLE: '01 / 找到学习起点'
Left viewport label '首页'. Keep the heading '从这里，学会 AI。' on two balanced lines, subtitle '从认识 AI 到熟练使用工具，一步一步学清楚。' Then a pale blue recommended route card with eyebrow '建议从这里开始', title 'AI 入门路线', description '先弄懂基本概念，再完成第一次使用。', full-width blue button '开始入门路线 →'. Under it, three compact vertical course rows, not a side-scrolling carousel: '01 认识 AI' with the selected pale blue head-and-brain illustration; '02 软件与模型' with stacked blue application and lavender model layers; '03 第一次提问' with filled gray and blue conversation bubbles and three white dots. Preserve the different blue, lavender, mint course accents. Small bottom links '已有基础？查看工具教程' and '想理解更多？了解模型基础'. Do not show learning progress here.
Middle viewport label '路线总览'. Breadcrumb '学习路线'; heading '找到适合你的起点'; brief text '按现在的基础，选一条路。' Single column. Primary pale blue route card 'AI 入门', badge '推荐起点', '适合第一次接触 AI 的你', three small text facts '6 节课 / 先懂概念 / 完成首次使用', CTA '查看路线 →'. Following smaller compact route cards '办公提效' ('把常见工作交给 AI 协助') and 'AI 编程' ('先准备环境，再开始做项目'). A final compact link '模型接入 →'. No all-encompassing claim about domestic access or costs.
Right viewport label '路线详情'. Breadcrumb '学习路线 / AI 入门'. Heading 'AI 入门路线', sentence '从理解 AI，到完成一份资料整理。' A visible '开始前' block BEFORE the start action: '前 3 课可直接阅读。' and '桌面实操需要电脑，账号与使用条件见对应教程。' Then primary button '从第 1 课开始 →'. Below '这条路线怎么学' and SIX compact numbered chapter rows in a single column, not compressed tiny text: '01 认识 AI', '02 软件与模型', '03 第一次提问', '04 选一个能使用的工具', '05 豆包工作：准备与首次使用', '06 完成一份可核对的资料整理'. Numbers are lesson order, no completion checkmarks, no fabricated progress. Lesson 05 marked '电脑实操' in a small text tag. Bottom a very light note '可以先在手机读，再到电脑练习。' Fit content naturally without cramming.
```

## 跟着教程学

计划文件：aiguide-mobile-learning-v1.png

```text
BOARD TITLE: '02 / 跟着教程学'
Left viewport label '教程正文'. Breadcrumb 'AI 入门 / 第 02 课'. Heading '软件与模型，有什么区别？'. Short lead '先分清你打开的软件，和背后工作的模型。' Row '本篇目录' with chevron (collapsed), and an outline bookmark button '收藏'. Section heading '先记住这三层关系'. A large readable explanatory diagram vertically arranged for phone: top '公司 / 开发与提供', then two stacked boxes '应用软件 / 你打开和操作的界面' in pale blue and 'AI 模型 / 处理输入、生成回答' in pale lavender. Clear diagram connection labels must be semantically correct: company provides both software and models; model provides capability to software. Easier if use a compact simple vertical explanatory list without misleading arrows. Tiny within-image label '关系示意 · 点击可放大'. Below heading '用 ChatGPT 与 GPT 举例' and two short text rows 'ChatGPT 是应用。' 'GPT 是模型系列。'. A sticky lightweight bottom action row separated from body by white space: outlined '路线目录', primary '下一节内容 ↓'. Do NOT mark the lesson complete merely by viewing the top. Screen is an article excerpt.
Middle viewport label '产品学习页'. Breadcrumb '工具教程 / 豆包工作'. Use the real shiny blue loop app logo in reference image 3 item 5, title '豆包工作', tag '应用软件', text '把具体任务，拆成可以跟着做的步骤。' A clear selected usage entry chip 'Windows 桌面版', not a model version. Notice in pale blue '可在手机阅读，实操需要电脑。'. Small supporting line '产品步骤与版本条件待核对' because this is a content design. Then heading '开始前先准备', rows '查看账号与使用条件' and '确认电脑与应用版本'. Button '查看准备教程 →'. Heading '按步骤学习', a single column numbered list '01 准备与首次打开', '02 认识任务界面', '03 整理一份资料', with last marked '电脑实操'. Footer text link '查看产品官方入口 ↗'. No actual fake desktop software screenshot.
Right viewport label '我的学习'. Heading '接着上次，继续学。'. A clear but low-key label '学习记录示例'. Pale blue current course block 'AI 入门路线', '第 02 课 · 软件与模型', progress label '已完成 1 / 6 课', exactly six progress segments with ONLY THE FIRST filled blue, remaining five pale gray; primary '继续第 2 课 →'. Below two tabs '最近阅读' active and '收藏'. Two compact list rows: '软件与模型，有什么区别？' with '上次阅读 · 未完成'; '认识 AI' with '已完成' and small '复习'. Bottom section '学习记录' with '仅保存在当前浏览器' and two secondary controls '导入记录' / '导出记录'. No invented study times, numbers of days, account, cloud sync.
```

## 查找工具与模型

计划文件：aiguide-mobile-discovery-v1.png

```text
BOARD TITLE: '03 / 查找工具与模型'
Left viewport label '工具目录'. Heading '找到工具，也找到学法。' Search field placeholder '搜索公司或工具'. One compact filter trigger '筛选' and visible active text chip '全部入口'. Single column grouped by company, with the exact original icons from the brand reference. A group heading with black OpenAI knot 'OpenAI', small '公司', link '公司专题 →'; below separate product rows black knot 'ChatGPT', small '应用 · 网页 / 桌面', and blue-purple command-cloud Codex icon 'Codex', small '编程工具 · 入口见教程'. Second group: black Anthropic AI company logo 'Anthropic', small '公司', link '公司专题 →'; orange starburst 'Claude', small '应用 · 网页 / 桌面'; orange pixel Claude Code shape 'Claude Code', small '编程工具'. Third group compact blue/cyan company bars '字节跳动' and blue shiny loop row '豆包工作', small '应用 · Windows 桌面'. Do not conflate applications or coding tools with models; no made-up model rankings in directory.
Middle viewport label '公司专题'. Breadcrumb '工具教程 / Anthropic'. Black original Anthropic company logo (reference item 2), title 'Anthropic', small label '公司'. One sentence '先选使用入口，再了解背后的模型。'. Section '应用与编程工具': row orange starburst 'Claude', tag '应用', subtitle '选择网页或桌面教程', compact text CTA '学习 →'; next row orange pixel icon 'Claude Code', tag '编程工具', subtitle '查看环境准备与操作步骤', CTA '学习 →'. Distinct section '模型系列': orange starburst with 'Claude 模型系列', tag '模型', subtitle '了解能力、限制与版本', CTA '模型指南 →'. An explanatory pale blue note '公司提供产品；应用有操作界面；模型提供能力。'. Under '先从哪一项开始？' two narrow links '第一次使用：从应用教程开始 →' and '已有开发基础：查看编程工具 →'. Correct brand original colors, don't use product starburst as company logo.
Right viewport label '模型排名'. Breadcrumb '模型指南 / 模型排名'. Heading '按用途，看模型排名。'. Persistent light amber chip '设计示意 · 数据未接入'. Compact purpose chips '综合' selected blue, '编程', '中文', '图像', '视频' all fit without tiny typography. Visible source selector label '来源' value 'Artificial Analysis' down chevron, and secondary text '源数据日期：—'. Replace desktop table with full width stacked records, not a horizontal table. First record black OpenAI knot, title 'GPT 模型系列', small '具体版本待核对', two aligned text stats '名次 —' / '分数 —'. Expanded detail within the same card: '先了解怎样使用', two separate outlined buttons 'ChatGPT 教程 →' and 'API 入门 →'. Second compact record orange Claude starburst, 'Claude 模型系列', '具体版本待核对', '名次 — / 分数 —'. Third compact record original multicolor Gemini star, 'Gemini 模型系列', same version/status. Bottom small link '不知道怎么看？先读模型指南 →'. Never invent actual version identifiers, scores, dates, leaderboards, live status, or claim latest verification.
```

## 完成第一个成果

计划文件：aiguide-mobile-practice-v1.png

```text
BOARD TITLE: '04 / 完成第一个成果'
Left viewport label '实战项目'. Breadcrumb '学习路线 / 实战项目'. Heading '学一点，就做一点。'. Short subtitle '用一个小项目，把学过的东西连起来。'. First project card pale blue '把资料变成一份研究笔记', neutral paper-sheet and source-tag illustration (label '成果示意'), subtitle '交付来源表、结论出处表和待确认问题。', fact row '4 个阶段 · 资料整理', primary '查看项目 →'. Next compact white card '做一个自己的个人主页' with small BLUE GENERIC </> code illustration, category text 'AI 编程'; do NOT use the Gemini CLI logo for generic coding. Third compact card '搭建一套周报整理工作流', category '办公提效', neutral list/check icon. No fake time estimates, enrollment count, fake learner avatar.
Middle viewport label '项目任务 · 进行中'. Breadcrumb '实战项目 / 研究笔记'. Heading '把资料变成一份研究笔记'. Persistent label '任务进度示例', a clear progress '0 / 4 阶段', exactly four unfilled segments. Collapsed panel '准备材料与成果要求 ▾'. Four numbered compact stage rows '1 准备编号资料' expanded with blue left rule; '2 明确整理问题'; '3 整理结论与依据'; '4 核对并保存'. Within the expanded first stage, short paragraph '给每份材料编号，记录标题和来源。', a compact artifact outline '来源表 / 编号 · 标题 · 链接', small label '表格结构示意', and two UNCHECKED validation boxes '每份材料都有编号' and '来源可以重新打开'. Text link '需要帮助？查看资料整理教程 →'. Bottom primary button '检查本阶段成果' and secondary line '核对后再标记完成'. Do not auto-select any validation checkbox or pretend the project is already tested.
Right viewport label '项目任务 · 完成后'. Same page identity, mark '完成状态示例'. Minimal calm mint confirmation band with a small check icon, heading '第一份研究笔记，完成了。', exact progress '4 / 4 阶段' with four small completed check rows, no trophy or celebration. Section '检查你的三份成果' with three document rows '来源表', '结论与出处对照表', '待确认问题清单'; helper '请把成果保存在自己的文件中。' No automatic file download or uploaded file claims. Section '接下来可以做' with two links '回到路线，继续下一课 →' and '再做一个实战项目 →'. Small secondary button '撤销最后阶段完成', helper '学习记录保存在当前浏览器。'. Keep this distinct from an unstarted task; this viewport explicitly illustrates a potential after-state.
```

## 遇到空白也能继续

计划文件：aiguide-mobile-states-v1.png

```text
BOARD TITLE: '05 / 遇到空白，也能继续'
Left viewport label '搜索无结果'. Heading '搜索教程与工具'. Search input showing exact query '本地绘图' with a clear X input control. Selected removable filter chips '教程 ×' and 'Windows 桌面 ×'. Quiet whitespace and small magnifying glass outline, no cute mascot. Main message '没有找到匹配的内容'. Helper '当前关键词：本地绘图' and '可以换个词，或减少筛选条件。'. Blue button '清除筛选，重新查找'; secondary text link '查看全部教程 →'. Suggested query section '试试更宽泛的关键词' with subtle chips '图像生成' and '本地模型'. These are query suggestions, never call them trending or popular. At bottom subtle note '清除筛选会保留你输入的关键词。' Give both keyword and filter recovery paths: clicking input clear X visibly available.
Middle viewport label '还没有学习记录'. Heading '我的学习'. Quiet minimal book-page icon. Main copy '第一课，从这里开始。'. Helper '开始阅读后，这里会帮你记住位置。'. A pale blue recommended card 'AI 入门路线', '从认识 AI、软件与模型，到第一次提问。', primary '开始第 1 课 →'. Secondary button '浏览全部路线'. Bottom separated area '已经有学习记录？', text link '导入本地记录 →', helper '学习记录仅保存在当前浏览器。'. No completed lesson, no fake progress bar, no 0% metrics, no fake last-read time.
Right viewport label '榜单更新失败'. Heading '模型排名'. Small neutral badge '异常状态示意'. Source selector '来源 / Artificial Analysis ▾', purpose row '综合' selected and '编程', '中文'. Calm pale amber notice with small warning outline: '榜单暂时无法更新', explanation '当前没有可显示的历史快照。', small line '源数据日期：—'. Blue button '重试获取'. Below two outlined helpful links '查看来源网站 ↗' and '先了解模型怎么选 →'. Text '数据可用后，再显示模型版本、名次与分数。'. No table of fake data, no invented scores, no current or old dates, no spinning '正在更新' after failure. Do not show error codes or stack traces or API jargon. This screen specifically illustrates failure WITHOUT a cached successful snapshot. Small board-only footnote outside all three viewports: '有历史快照时：保留原数据与原日期，并标明更新失败。'. Maintain equally clear layout and visual hierarchy across all three states.
```


## 起点方案板 V2 · 定向校对提示词

输入：aiguide-mobile-start-v1.png 对应原始生成文件。输出：aiguide-mobile-start-v2.png。内置 image_gen 编辑，保留 V1。

```text
Use case: precise-object-edit.
Edit target: the supplied AIGuide mobile design board with three mobile screens, "01 / 找到学习起点".
Make ONLY TWO tiny text changes in the MIDDLE screen ("路线总览"):
1. Inside the lavender "办公提效" card, the leftmost fact currently reads "6 节课". Replace exactly that fact with "整理资料". Leave the other facts "提升效率" and "覆盖常用场景" unchanged.
2. Inside the mint "AI 编程" card, the leftmost fact currently reads "8 节课". Replace exactly that fact with "环境准备". Leave the other facts unchanged.
This corrects invented lesson counts. The blue AI 入门 card MUST KEEP "6 节课", because only that six-lesson route is specified.
Preserve everything else: the three-screen composition, all viewports, all other Chinese text, logo, illustration shapes, course colors, spacing, dimensions, buttons, typography, full image. Do not redesign or create new elements. Do not add other numbers. Maintain original resolution and framing.
```
