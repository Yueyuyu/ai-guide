# AIGuide 第六批 · 剩余手机页、平板与弹层提示词

日期：2026-09-14。方式：内置 image_gen，每个设计资产独立调用。共同提示词与对应资产说明拼接；各原始参考文件均位于本目录。

## 共同提示词

```text
Use case: ui-mockup.
Primary request: extend the established AIGuide Chinese AI learning website into additional responsive design mockups. Adapt the existing design; do not create a new brand or visual direction.
Brand: exact existing two blue book pages, taller right page and white opening, beside navy AIGuide wordmark. Navy #14213D, primary blue #2F63F3, slate #63718D, white and pale blue #EEF5FF, accents lavender #F1EEFF and mint #E9F8F3. Restrained card corners about 12px, thin dividers, ample clear whitespace, flat elegant educational website. Familiar Chinese sans-serif with clear hierarchy. Do not enlarge every component.
Use only simplified Chinese UI copy, except AIGuide, actual product names, API, Windows and source brand names. Preserve original brand colors and real icons from supplied reference sheet wherever relevant: black knot OpenAI/GPT/ChatGPT; orange starburst Claude; orange pixel Claude Code; multicolor Gemini. The English annotations in a brand reference sheet are not website content.
Mobile baseline: approximately 390 logical px width; body 16px, page heading 26–28px, helper 12–14px, touch targets ~44px. Global mobile header about 56px high, small book+AIGuide left, search icon, compact blue '继续学习', hamburger right. No crowded desktop navigation on mobile, no invented bottom tab bar. Use vertical scroll excerpts without tiny compressed full-page layouts. No device hardware, perspective, hands, browser bar, OS status bar. Bounded white viewport with very subtle thin border, on neutral very light gray review-board background. No fake metrics, lesson counts, current model versions, costs, live rankings, follower counts, study streaks or account identity. No firework/trophy/rocket/sprout/airplane motifs. Do not turn illustrations into generic AI chips.
Scope: static visual concept, not actual working UI; include a subtle board footnote '响应式设计稿 · 页面节选 · 内容示意'. Output crisp legible Chinese text at high resolution.
```

## 手机：模型指南与模型学习

输出文件：aiguide-mobile-model-pages-v1.png

参考图片（顺序即输入序号）：aiguide-mobile-discovery-v1.png、aiguide-model-guide-v1.png、aiguide-model-detail-gpt-v1.png、aiguide-discovery-brand-reference.png

```text
Input images: 1 mobile visual/layout reference; 2 selected desktop model guide content; 3 selected desktop GPT learning page content; 4 exact original brand shapes. Transform the two desktop page types into mobile.
Composition: exactly TWO separate tall mobile website viewports side by side, equal width, legible at 390 logical px each, aligned tops and bottoms. High-resolution near-square portrait review board around 1152 x 1280. Small board title '06 / 先认识模型，再选择入口'. Screen labels outside frames: left '模型指南', right '模型学习页'. These are representative visible excerpts, not everything forced into one tiny phone.
LEFT screen:
Global mobile header. Breadcrumb '首页 / 模型指南'. Heading '先认识模型，\n再学会选择。'. One short lead '弄清它是什么、能做什么，再找到适合你的使用入口。'.
Pale blue starter block, small blue-and-lavender APPLICATION/MODEL LAYER illustration from existing desktop, '第一次了解模型？', '先分清公司、软件和模型。', blue primary '学习基础概念 →'.
Heading '先弄懂三个问题'. Three short numbered list rows with dividers:
'01 模型和软件，有什么区别？'
'02 一个模型，应该看哪些信息？'
'03 怎样选择适合自己的模型？'
Each one has a small right chevron, no paragraphs repeated in each.
Section '按任务了解模型' with three compact two-line rows or chips wrapping naturally: '整理与写作', '编程与改代码', '图像与视频'. Use generic task icons (paper, </>, image) not brand icons for task categories.
Section '认识模型系列' with TWO compact brand rows: original black knot 'GPT 系列 / OpenAI', original orange starburst 'Claude 系列 / Anthropic'; below text link '查看全部模型系列 →'. Small bottom link '想比较表现？查看模型排名 →'. Do not display ranking metrics.
RIGHT screen:
Global mobile header. Breadcrumb '模型指南 / GPT 模型系列'. Small black knot beside heading 'GPT 模型系列', label '模型系列', secondary '所属公司：OpenAI'. Lead '了解它如何处理任务，再选择合适的使用入口。'
Strong pale blue application learning card '想先用起来？', smaller '从 ChatGPT 应用教程开始。', full-width blue action '进入 ChatGPT 学习页 →'. Clear separate secondary link '我是开发者，查看 API 入门 →' BELOW the card. Never label GPT as software to install.
Collapsed row '本页内容 ▾'.
Section '先从这些任务认识它': compact rows '理解与整理材料' with helper '回到原文找依据'; '按要求组织内容' with helper '检查要求是否满足'; '辅助理解与修改代码' with helper '检查运行结果与修改范围'.
Small text '具体能力取决于版本与输入条件。'
Section '认识版本，比只记名字更重要'. Three stacked compact labels '系列 / 例如 GPT，一组相关模型', '具体版本 / 确认实际使用的是哪一个', '运行设置 / 部分设置会影响输出'. Purple-pale explanatory background with generic layer icon. Bottom text link '继续：做一次提问与核对练习 ↓'. No concrete current versions, pricing, benchmark numbers, or download buttons for the model.
```

## 手机：全部教程与搜索结果

输出文件：aiguide-mobile-catalog-search-v1.png

参考图片（顺序即输入序号）：aiguide-mobile-learning-v1.png、aiguide-tutorial-catalog-v1.png、aiguide-search-results-v1.png、aiguide-discovery-brand-reference.png

```text
Input images: 1 established mobile UI, 2 desktop tutorial catalog content, 3 desktop search-results content, 4 actual brand shapes. Convert to mobile preserving clear tutorial and product types.
Composition: exactly TWO equal tall mobile website viewports side by side, title '07 / 找到你的下一篇教程'. Labels outside frames '全部教程' and '搜索结果'. High-resolution near-square portrait around 1152 x 1280. Viewport excerpts, not shrunken desktops.
LEFT:
Mobile header. Heading '找到你的下一篇教程。', lead '从一个具体问题开始，把 AI 一点点用起来。'.
Search field placeholder '搜索教程、产品或任务'. Under it link '还不知道从哪开始？跟着入门路线学 →'.
Compact control row '教程类型：全部 ▾' and '筛选' outlined button with filter icon. Then a subtle sort label '按学习顺序'.
Single-column reading list, small individual square illustrations at left, readable title, type and use-entry chips below, clear chevron at right:
1 '认识 AI：能做什么，也会错在哪里' / tags '基础概念' '通用'; selected pale-blue head and brain, not chip.
2 '软件与模型，有什么区别？' / '基础概念' '通用'; blue-lavender stacked layers.
3 '把第一次提问说清楚' / '基础概念' '通用'; filled gray/blue conversation bubbles with 3 white dots, mint accent.
4 '豆包工作：准备与首次使用' / '安装准备' 'Windows 桌面'; original blue shiny ring icon (reference4 item5).
5 'Claude 桌面：认识界面与文件权限' / '软件操作' '桌面'; original orange starburst, muted orange paper background.
6 'GPT 模型：从 API 接入开始' / '模型接入' 'API'; black knot.
Keep cards concise and title-focused; no tall duplicate descriptions, fake counts, timers, likes or progress.
Bottom button '查看更多教程 ↓'. Fine print '课程内容示意 · 产品步骤待核对'.
RIGHT:
Mobile header. Heading '关于 Claude 的学习内容'. Search input value EXACT 'Claude', clear X control and search submit icon. Compact type tabs '全部' active, '教程', '工具', '模型', '路线'. Supporting sentence '先看内容类型，再进入适合你的页面。'
Section '工具与编程工具': TWO original brand rows 'Claude 应用' with orange starburst, tag '应用软件', small '网页 / 桌面', action '进入学习 →'; 'Claude Code' orange pixel symbol, tag '编程工具', action '查看教程 →'.
Section '相关教程': ONE readable row 'Claude 桌面：认识界面与文件权限', tags '软件操作' '桌面', action chevron. Optionally second short row '用 Claude Code 读懂一个项目', tags '编程工具' '终端' if it naturally fits without tiny text.
Section '模型': row orange starburst 'Claude 模型系列', tag '模型', action '了解模型 →'.
Compact section '学习路线': '从会用 AI 到接入 AI' with '查看路线 →'.
Footer text link with BLACK Anthropic company AI symbol '按公司浏览 Anthropic →'. Do not use the orange Claude starburst for the Anthropic company logo. Do not claim result count, verified product features or real search trends.
```

## 手机：菜单与筛选过程

输出文件：aiguide-mobile-navigation-filters-v1.png

参考图片（顺序即输入序号）：aiguide-mobile-learning-v1.png、aiguide-tutorial-catalog-v1.png、aiguide-discovery-brand-reference.png

```text
Input images: 1 mobile UI identity, 2 tutorial catalog as filter context, 3 exact brand icons.
Composition: exactly THREE equal mobile frames side by side, aligned, around 1536 x 1280, title '08 / 找得到，也回得去'. Labels outside frames '打开导航', '选择筛选条件', '应用筛选后'. These show real interface states, not explanatory text floating where product content should be. Single static frame per state, no arrows or annotations crossing screens.
LEFT '打开导航':
White full-height menu panel contained inside mobile viewport. Header exact AIGuide logo on left, accessible close X button in a subtle outlined square at top right. No duplicate hamburger while menu open.
Small section label '学习导航'. Three large comfortable text menu rows separated with subtle rules: '学习路线', '工具教程', '模型指南'. Add restrained generic route/map, four-square, layers icons respectively and small right chevrons.
Below divider, smaller heading '更多内容', rows '全部教程', '实战项目', '我的学习'. Footer near bottom small pale-blue start card '第一次来？从入门路线开始。', button '开始入门路线 →'. No login, user account, recommendations/notifications badges, settings or newly invented top-level navigation.
MIDDLE '选择筛选条件':
Behind a dim transparent scrim, show recognizable tutorial catalog heading and search field. A WHITE bottom sheet covers lower roughly 78% of phone, rounded only at top corners. Small drag handle, heading '筛选教程', close X at right.
Group '教程类型': wrap plain outlined choice chips into two columns if needed, '全部', '基础概念', '安装准备', '软件操作', '模型接入', '项目实践'. ONLY '软件操作' selected blue with small tick; all others unselected.
Group '使用入口': '全部', '网页', '桌面', '终端', 'API'. ONLY '桌面' selected blue with tick. No Windows-specific assumption in this generic Desktop filter.
Group '产品': compact selector '全部产品 ▾'.
Subtle text '选择后，点击应用筛选。'
Sticky footer INSIDE sheet, outlined '重置' and filled blue '应用筛选' buttons, large tap targets and safe bottom padding. No fake result counts, no "已应用" until apply is clicked, do not hide close button. The choices are draft until applied.
RIGHT '应用筛选后':
Normal mobile global header. Heading '全部教程'. Search field '搜索教程、产品或任务'. Compact '筛选' button with small text '2 项' (this means exactly the TWO shown active filter groups, not number of results). Visible active removable chips '软件操作 ×' and '桌面 ×'. Nearby link '清除筛选'.
Section label '匹配的教程'. ONE result with original orange Claude starburst and Chinese paper thumbnail, title 'Claude 桌面：认识界面与文件权限', tags '软件操作' and '桌面', helper '了解界面入口、材料权限与结果保存。', primary link '阅读教程 →'. Clearly label subtle '筛选结果示例'.
Below subtle help card '想换个学习方向？', links '修改筛选条件' and '查看全部教程 →'. No surprise second query or inconsistent chip, no unspecified result count, no fabricated traffic stats. Leave generous space rather than padding with invented course matches.
```

## 平板：竖屏首页

输出文件：aiguide-tablet-home-v1.png

参考图片（顺序即输入序号）：aiguide-pages-v3-home.png、aiguide-mobile-start-v2.png

```text
Input images: 1 selected original desktop home, 2 corresponding mobile home/route board. Adapt the HOME page to a portrait tablet.
Composition: ONE complete portrait TABLET webpage visible viewport, about 768 x 1024 logical px. High-resolution portrait illustration around 1152 x 1536. Not a phone, not desktop collage. Minimal white viewport boundary, no physical device. Small outside label '09 / 平板竖屏 · 首页'. Preserve calm white background and sensible type size, no giant oversized controls.
768-width responsive header with left small book+AIGuide, right search icon, '继续学习', and hamburger menu. Collapse top navigation at this portrait width rather than cramming desktop links into the header.
Content horizontal padding ~32px. Heading '从这里，学会 AI。' at 36–40 logical px, lead '从认识 AI 到熟练使用工具，一步一步学清楚。' at 17–18.
Primary pale-blue recommended route panel full width: eyebrow '建议从这里开始', heading 'AI 入门路线', helper '先弄懂基本概念，再完成第一次使用。'. Keep clear whole-card composition with text on left and a blue '开始入门路线 →' button lower right or underneath, normal button height ~48px, not full-screen marketing hero. Small text '适合第一次接触 AI 的你'.
Below place EXACTLY THREE equal course cards horizontally across the tablet row, each ~210 logical px wide, about 340px tall, with good gutters. Full proper simplified Chinese titles, normal 20px card headings, body 15–16px. Preserve selected desktop illustrations:
1 blue top rail: '01', '认识 AI', 'AI 能做什么', large light-blue profile HEAD WITH A BRAIN inside, bottom '了解基本概念与常见使用场景。';
2 lavender top rail: '02', '软件与模型', 'ChatGPT 和 GPT 有何不同', stacked light-blue rectangle labelled '应用' and light-purple rectangle labelled '模型', bottom '分清你使用的软件和背后的能力。';
3 mint top rail: '03', '第一次提问', '把问题说清楚', large filled gray and BLUE SPEECH BUBBLES with EXACTLY THREE WHITE DOTS in blue bubble, bottom '说明目标、背景与要求，试着再追问。'
No sideways carousel, no giant blank hero art, no chip instead of brain, no rockets.
Under cards TWO compact secondary navigation blocks side by side: '已经在用 AI？' / '查看工具教程 →' with generic four-square icon; '想理解更多？' / '了解模型基础 →' with generic layers icon. Plenty of whitespace. Footer '先学会使用，再慢慢深入。'. No fake lesson counts beyond numbering 01,02,03, no progress or account.
```

## 平板：横屏阅读

输出文件：aiguide-tablet-reader-v1.png

参考图片（顺序即输入序号）：aiguide-tutorial-reader-v1.png、aiguide-mobile-learning-v1.png

```text
Input images: 1 desktop tutorial reader content and visual design, 2 mobile reader adaptation. Produce an intermediate LANDSCAPE TABLET view where body text remains comfortable and the secondary directory fits.
Composition: ONE landscape tablet website viewport, 1024 x 768 logical px, rendered high resolution around 1536 x 1152. Neutral outer margin with small title '10 / 平板横屏 · 阅读'. No hardware, no multiple screens, no full-page giant desktop compressed into a tablet. This is the article TOP EXCERPT with further content scrollable below.
Responsive header: small book+AIGuide left; compact navigation '学习路线', '工具教程', '模型指南' centered; search icon and blue '继续学习 →' on right. Thin border. Header elements fit naturally with ~32px side padding; no hamburger at this wide enough layout.
Below breadcrumb 'AI 入门路线 / 第 02 课'.
Two-column READING layout: body left about 640–660px logical, secondary directory right about 210–230px separated by a pale vertical rule and modest gutter. Body 17–18px logical type, 1.7 line height, main heading ~30px. Keep body width constrained, not stretched across full tablet.
Main heading '软件与模型，有什么区别？'. Lead '先分清你打开的软件，和背后工作的模型。'. Small bookmark action '收藏' near heading. Pale blue outcome strip '这一课，你会弄清楚' / '公司做什么、软件怎么用、模型负责什么。'
Section '1 先记住这三层关系'. One paragraph: '公司开发产品和模型。软件提供操作界面；模型在背后处理输入、生成回答。'
A readable relationship diagram in broad pale-blue panel, top centered '公司 / 开发与提供'. Two outgoing downward branches to BOTTOM LEFT blue box '应用软件 / 提供操作界面' and BOTTOM RIGHT lavender box 'AI 模型 / 处理输入、生成回答'. Additional horizontal arrow must point FROM MODEL (right) TO SOFTWARE (left), label '提供能力'. A small note below '关系示意 · 点击可放大'. Do NOT reverse capability arrow.
Then section heading '2 用 ChatGPT 与 GPT 举例', with two compact side-by-side pale blue/purple cards 'ChatGPT 是应用' and 'GPT 是模型系列'. Start content only; do not shrink to show entire article or practice section at the bottom.
Right directory heading '本篇目录'. Four vertically aligned links with first active blue left bar '三层关系', 'ChatGPT 与 GPT', '工作方式与入口', '做一个小判断'. Below a horizontal rule, two text links '返回路线目录 →' and '下一课：第一次提问 →'. Extra small gray '阅读位置会保存在当前浏览器。'. No fake completion percentage, checked lesson or automatic-completion button at article top. Footer subtle page-excerpt mark is outside viewport.
```
