# AIGuide 第二批内页生成提示词

生成方式：内置 image_gen。顺序为工具目录 → 公司专题 → 模型排名。三次独立调用，以前一批内页、书页 Logo 和品牌参考表为依据。

## 01 工具目录

Use case: ui-mockup.
Asset type: complete desktop inner-page design for AIGuide, a Chinese AI learning website.
Create ONE complete full-page UI per output, from navigation to footer. Flat front-on website design, no device frame, no browser chrome, no collage, no presentation board. Target 1536px wide and about 1800px tall, sufficient for all requested content without cropping. Make crisp readable Simplified Chinese, sensible desktop typography, normal-scale interface: page title 38-42px, section titles 24-28px, body 16-18px. Do not inflate all elements or copy a giant homepage hero.
Input image 1: approved previous product-learning page, a STYLE reference. Inherit its white/slightly blue page, navy text, bright blue actions, generous alignment, subtle fine dividers, rounded corners and calm Chinese editorial hierarchy. Do not copy its page content or layout.
Input image 2: approved AIGuide book-page logo, exact brand reference. Keep the unequal two blue pages and the central white gap, modest header size, with wordmark "AIGuide". Never replace this with the Anthropic AI logo.
Input image 3: brand reference sheet, original asset APPEARANCE reference only. Its English annotations and grid are not page content. Match colors and silhouettes. Map assets correctly: 1 ByteDance company; 2 Anthropic company black AI monogram; 3 OpenAI company black knot; 4 Google company colored G; 5 Doubao Work app blue iridescent loop; 6 Doubao app blue-purple-green loop; 7 ChatGPT app black knot; 8 Codex coding purple-blue icon with >_; 9 Claude product family orange starburst; 10 Claude Code orange pixel creature; 11 Gemini product family colored sparkle; 12 Gemini CLI terminal icon. Company and product icons are not interchangeable.
Global header: AIGuide logo left; "学习路线" "工具教程" "模型指南" centered; small search icon and "继续学习 →" at right. Thin blue-gray bottom divider. Main container about 1180px, 72px simulated header height. Colors: navy #14213D, blue #2F63F3, muted slate #63718D, very pale blue #EEF5FF, pale lavender #F1EEFF, mint #E9F8F3. Blue is website chrome; original brand logos keep their native colors. Use no dark admin dashboard, no podiums, no fake testimonials, no fake user counts, no cartoon mascots, no sprouts or airplane. No English UI labels beyond brand names and standard Windows/API names.
Footer: fine rule, "先学会使用，再慢慢深入。" centered, AIGuide at right, small caption "页面设计稿 · 内容拟定".
Primary request: Page 4, TOOL DIRECTORY / "工具教程". Visibly a discovery directory organized by company, not a product marketing page. Active top nav "工具教程".
Content in exact order:
1. Breadcrumb "首页 / 工具教程". Compact title "找到工具，开始学习。" and subtitle "按公司找产品，再选择适合自己的使用方式。".
2. A real search field spanning roughly two thirds width, placeholder "搜索公司、工具或想完成的事", trailing small search icon.
3. A light short beginner strip "第一次接触 AI？" and link "先从入门路线开始 →". No big hero illustration.
4. Refined filter bar with label "用途" and pills "全部" selected, "日常使用", "办公提效", "AI 编程". At right compact dropdown "使用入口". No oversized filter sidebar, no unsupported precise versions.
5. Section heading "按公司浏览", small secondary text "点产品看教程，点公司看全貌。".
6. Four company panels in an airy TWO-COLUMN GRID, two rows, white panels with thin very pale border and restrained radius. Each company panel heading contains its true COMPANY icon at 28px, name, and subtle text link "公司专题 →". A horizontal line separates heading from TWO stacked product rows. Each product row has its actual PRODUCT icon about 40px, name, a small unambiguous type label, one-line purpose and small "查看教程 →". No giant icons or dense descriptions.
Panel 1 "字节跳动" company asset 1, products: "豆包工作" app asset 5, type "桌面应用", purpose "准备材料，完成并检查工作任务。", small platform text "Windows"; "豆包" app asset 6, type "应用软件", purpose "从网页对话练习日常提问。", small platform text "网页".
Panel 2 "OpenAI" company asset 3, products: "ChatGPT" asset 7, type "应用软件", purpose "提问、读材料，整理思路。", small text "选择使用入口"; "Codex" asset 8, type "编程工具", purpose "围绕代码任务学习修改与检查。", small text "选择使用入口". Do not claim these are merged or separate installation packages.
Panel 3 "Anthropic" company asset 2, products: "Claude" asset 9, type "应用软件", purpose "阅读材料，讨论与改写内容。", small text "选择使用入口"; "Claude Code" asset 10, type "编程工具", purpose "在代码工作流中理解与修改项目。", small text "终端教程".
Panel 4 "Google" company asset 4, products: "Gemini" asset 11, type "应用软件", purpose "从日常问题认识多模态使用。", small text "网页教程"; "Gemini CLI" asset 12, type "编程工具", purpose "学习终端中的任务与工具调用。", small text "终端教程".
7. Below the panels a restrained centered outlined button "浏览全部公司 →", NOT an endless card feed. Clearly the pictured directory is a curated first page; do not fabricate a total count.
8. Bottom horizontal soft pale-violet knowledge banner: left a simple two-layer conceptual diagram "软件" and "模型"; right heading "想找的是模型？", text "了解模型能力、版本和评测，再选择合适的使用入口。", blue link "前往模型指南 →".
Show sufficient clean white space. All four company panels must be visible and equally orderly, with native logo colors and no same-color generic brand badges.

## 02 公司专题

Use case: ui-mockup.
Asset type: complete desktop inner-page design for AIGuide, a Chinese AI learning website.
Create ONE complete full-page UI per output, from navigation to footer. Flat front-on website design, no device frame, no browser chrome, no collage, no presentation board. Target 1536px wide and about 1800px tall, sufficient for all requested content without cropping. Make crisp readable Simplified Chinese, sensible desktop typography, normal-scale interface: page title 38-42px, section titles 24-28px, body 16-18px. Do not inflate all elements or copy a giant homepage hero.
Input image 1: approved previous product-learning page, a STYLE reference. Inherit its white/slightly blue page, navy text, bright blue actions, generous alignment, subtle fine dividers, rounded corners and calm Chinese editorial hierarchy. Do not copy its page content or layout.
Input image 2: approved AIGuide book-page logo, exact brand reference. Keep the unequal two blue pages and the central white gap, modest header size, with wordmark "AIGuide". Never replace this with the Anthropic AI logo.
Input image 3: brand reference sheet, original asset APPEARANCE reference only. Its English annotations and grid are not page content. Match colors and silhouettes. Map assets correctly: 1 ByteDance company; 2 Anthropic company black AI monogram; 3 OpenAI company black knot; 4 Google company colored G; 5 Doubao Work app blue iridescent loop; 6 Doubao app blue-purple-green loop; 7 ChatGPT app black knot; 8 Codex coding purple-blue icon with >_; 9 Claude product family orange starburst; 10 Claude Code orange pixel creature; 11 Gemini product family colored sparkle; 12 Gemini CLI terminal icon. Company and product icons are not interchangeable.
Global header: AIGuide logo left; "学习路线" "工具教程" "模型指南" centered; small search icon and "继续学习 →" at right. Thin blue-gray bottom divider. Main container about 1180px, 72px simulated header height. Colors: navy #14213D, blue #2F63F3, muted slate #63718D, very pale blue #EEF5FF, pale lavender #F1EEFF, mint #E9F8F3. Blue is website chrome; original brand logos keep their native colors. Use no dark admin dashboard, no podiums, no fake testimonials, no fake user counts, no cartoon mascots, no sprouts or airplane. No English UI labels beyond brand names and standard Windows/API names.
Footer: fine rule, "先学会使用，再慢慢深入。" centered, AIGuide at right, small caption "页面设计稿 · 内容拟定".
Primary request: Page 5, an ANTHROPIC COMPANY LEARNING HUB. Title "Anthropic". Visibly a company overview that explains relationships and gives study entry points. It is not a corporate investor website and not a product catalogue copied from the previous page. Active header nav "工具教程". Keep the AIGuide shell, use native Anthropic/Claude orange solely for their own icons and tiny accents.
Page structure and exact text:
1. Breadcrumb "首页 / 工具教程 / Anthropic".
2. Compact company header: actual black Anthropic COMPANY logo (asset 2) at 60px, small eyebrow "公司专题", title "Anthropic", subtitle "认识 Claude、工作方式与模型，找到你的学习起点。". Small understated official reference link "官方资料 ↗". Do not use Claude's orange starburst as the company logo.
3. A concise pale blue first-step strip: "第一次使用？先从 Claude 应用开始。" and primary blue link-button "查看入门教程 →". Caption beneath or beside "先核对入口、账号和使用条件。".
4. Section title "先看清，它们有什么关系". A compact explanatory relationship diagram with Anthropic company name at top, then three clearly labelled adjacent blocks below, each with a short caption:
left pale blue "应用软件" then Claude star icon asset 9 and "Claude", caption "你打开并操作的产品".
middle very pale warm-neutral "工作方式与编程工具", two small entries "Cowork" labelled "工作方式" with a small text-only name (no invented logo), and "Claude Code" pixel icon asset 10 labelled "编程工具", caption "按任务选择操作流程".
right pale violet "模型系列", Claude star icon asset 9 with title "Claude 模型", caption "处理输入、生成内容的能力".
Use a fine line from company to all groups and a subtle bottom arrow pointing from models to apps/tools labelled "提供模型能力". This is a relationship diagram, not a literal screen capture or installation map. Do not invent claims that products share or do not share installers, subscriptions or availability. Small caption "名称相近，学习内容不同。".
5. Detailed learning content below, vertically sequential sections with modest section numbers, not three identical cards:
"01 先学应用" with one wide white block "Claude 应用". Orange star icon, sentence "从提问、阅读材料，到修改与整理内容。". Two distinct learning entry links in small side-by-side subareas, "网页教程 →" caption "登录、页面入口与上传操作"; "桌面教程 →" caption "安装启动、系统权限与文件操作". Supporting line "按你正在使用的入口选择教程。".
"02 再看工作方式" with two compact horizontal rows. First "Cowork", small tag "工作方式", sentence "围绕具体任务，学习材料准备、权限与结果检查。", link "了解学习内容 →". Second "Claude Code", actual orange pixel icon, small tag "编程工具", sentence "理解项目、修改代码，再检查结果。", link "查看编程教程 →". Tiny neutral note "入口与使用条件以当前产品资料为准。". No custom Cowork brand icon.
"03 想深入，再认识模型" as a restrained lavender horizontal panel, Claude star icon, title "Claude 模型系列", sentence "了解版本、能力和限制，再决定如何使用或接入。". Two simple links "模型基础 →" and "开发接入 →". Do not list fabricated current versions or imply model downloads are desktop apps.
6. Compact footer knowledge/help section: "常见疑问", two accordion rows "应用、工作方式和模型，是同一个东西吗？" and "网页与桌面教程，为什么要分开？".
7. Tiny official resource area "官方资料" with text links "产品说明 ↗" "帮助中心 ↗" "开发文档 ↗"; no fake checked date or support guarantees.
8. Bottom navigation "返回工具目录 ←" and "了解其他公司 →".
This page needs clean information hierarchy, lots of legible Chinese, native corporate/product brand colors, a small useful diagram, and an obvious path into real lessons. End footer caption "页面设计稿 · 产品关系与操作内容待核实".

## 03 模型排名

Use case: ui-mockup.
Asset type: complete desktop inner-page design for AIGuide, a Chinese AI learning website.
Create ONE complete full-page UI per output, from navigation to footer. Flat front-on website design, no device frame, no browser chrome, no collage, no presentation board. Target 1536px wide and about 1800px tall, sufficient for all requested content without cropping. Make crisp readable Simplified Chinese, sensible desktop typography, normal-scale interface: page title 38-42px, section titles 24-28px, body 16-18px. Do not inflate all elements or copy a giant homepage hero.
Input image 1: approved previous product-learning page, a STYLE reference. Inherit its white/slightly blue page, navy text, bright blue actions, generous alignment, subtle fine dividers, rounded corners and calm Chinese editorial hierarchy. Do not copy its page content or layout.
Input image 2: approved AIGuide book-page logo, exact brand reference. Keep the unequal two blue pages and the central white gap, modest header size, with wordmark "AIGuide". Never replace this with the Anthropic AI logo.
Input image 3: brand reference sheet, original asset APPEARANCE reference only. Its English annotations and grid are not page content. Match colors and silhouettes. Map assets correctly: 1 ByteDance company; 2 Anthropic company black AI monogram; 3 OpenAI company black knot; 4 Google company colored G; 5 Doubao Work app blue iridescent loop; 6 Doubao app blue-purple-green loop; 7 ChatGPT app black knot; 8 Codex coding purple-blue icon with >_; 9 Claude product family orange starburst; 10 Claude Code orange pixel creature; 11 Gemini product family colored sparkle; 12 Gemini CLI terminal icon. Company and product icons are not interchangeable.
Global header: AIGuide logo left; "学习路线" "工具教程" "模型指南" centered; small search icon and "继续学习 →" at right. Thin blue-gray bottom divider. Main container about 1180px, 72px simulated header height. Colors: navy #14213D, blue #2F63F3, muted slate #63718D, very pale blue #EEF5FF, pale lavender #F1EEFF, mint #E9F8F3. Blue is website chrome; original brand logos keep their native colors. Use no dark admin dashboard, no podiums, no fake testimonials, no fake user counts, no cartoon mascots, no sprouts or airplane. No English UI labels beyond brand names and standard Windows/API names.
Footer: fine rule, "先学会使用，再慢慢深入。" centered, AIGuide at right, small caption "页面设计稿 · 内容拟定".
Primary request: Page 6, MODEL RANKING / "最新模型排名". Make a high-fidelity complete ranking-page layout for the AI learning website. Active top nav "模型指南". Focus on a legible modest table, source transparency, and the path from model selection to learning. This is a DESIGN MOCKUP ONLY. No actual latest leaderboard data has been verified. Therefore it is essential to leave all ranks, scores, score bars and update dates blank as EM DASH "—", visibly label the mock data state, and use model SERIES names only as structural examples. Do NOT invent specific model versions, ranking positions, scores, speed/cost values, date snapshots, upward trends or best-model claims.
Structure and exact Chinese copy:
1. Breadcrumb "首页 / 模型指南 / 最新模型排名".
2. Compact title "最新模型排名", subtitle "看懂模型表现，找到适合你的选择。". Small outlined text link "先了解软件与模型 →" beside this title area.
3. Purpose tabs aligned horizontally, comfortable normal scale: "综合能力" active blue underline, "编程", "中文表达", "图像", "视频". A source selector under the tabs: label "评测来源" with dropdown displaying "Artificial Analysis"; adjacent small source explanation "综合指标 · 查看评测方法 ↗". This source selection is a UI example, not a claim that data has been accessed.
4. Small visible pale-blue information strip "设计示意：名次、分数与具体版本尚未填入。". On a lighter second line "来源更新时间：—    本站核对时间：—". This must be clearly legible near the table, not hidden in a tiny footer. No invented dates.
5. Table toolbar left "模型表现", right search field placeholder "搜索模型或公司" and compact filter "全部公司". No live model count, no advertising or competing primary CTA.
6. Refined full-width table with column headings "名次" "模型与版本" "原始分数" "学习入口" and expand chevron. Good row spacing, horizontal thin dividers, no giant logo cards. Four rows, each with a true family/company icon:
Row A rank "—"; OpenAI black knot; name "GPT 系列"; secondary text "OpenAI · 具体版本待核对"; score "—"; link "查看使用教程 →". This row is currently expanded, use very subtle pale blue selection line, chevron up.
Row B rank "—"; Claude orange starburst; name "Claude 系列"; secondary text "Anthropic · 具体版本待核对"; score "—"; link "查看使用教程 →", chevron down.
Row C rank "—"; Gemini multicolor sparkle; name "Gemini 系列"; secondary text "Google · 具体版本待核对"; score "—"; link "查看使用教程 →", chevron down.
Row D rank "—"; Doubao blue-purple-green model-family mark; name "豆包模型系列"; secondary text "字节跳动 · 具体版本待核对"; score "—"; link "查看使用教程 →", chevron down.
Immediately underneath the selected GPT row place an inset clean expanded detail panel that stays inside the table and above other rows. Heading "从模型，找到使用入口". Two small adjacent areas:
"我想直接使用" with ChatGPT actual black knot, text "先看应用中提供的模型版本，再选择对应教程。", blue link "ChatGPT 学习页 →".
"我想开发接入" with a generic tiny code symbol (not a fake logo), text "了解 API 入口、费用与调用方式。", text link "查看模型接入教程 →".
A tiny divider line and sentence "模型分数说明评测表现，使用条件需要单独确认。".
Do not rank ChatGPT or Codex as models. The names in these rows are deliberately family placeholders; a real data integration will replace them with exact evaluated versions.
7. Below table left small note "示例展示，不代表当前排名；不对模型系列整体评分。". Right subdued text link "查看原始榜单 ↗". This note is essential.
8. Section "这份榜单，应该怎么看？", three small unboxed columns with short numbered titles, each just two lines:
"01 看任务" / "不同任务用不同评测，先看与你有关的能力。"
"02 看条件" / "版本与评测条件不同，分数不能直接混算。"
"03 看入口" / "找到可用的软件或 API，再进入对应教程。"
9. A very pale mint horizontal guidance strip "第一次选模型，不必从最高分开始。", supporting text "先找到能使用、能完成任务的入口，再通过练习比较。", link "查看入门学习路线 →". Keep this subordinate to table and not a sales banner.
10. Small "来源与更新记录" area with rows "评测来源  Artificial Analysis（界面示例）", "源数据日期  —", "本站最后成功核对  —", and a subtle "了解数据说明 →". Do not claim automatic refreshing or a completed data pipeline.
Footer same AIGuide style, with caption "页面设计稿 · 榜单数据未接入".
Overall refinement: slim typography, quiet white background, native brand colors, sparse blue accents, empty numeric fields with structured clean typography. Even though this is a data-placeholder design state, make it look considered and complete, not a gray skeleton loading wireframe. No fake chart, podium, colored progress bars, trophy, realtime pulse, fabricated endorsement or generated ranking data.
