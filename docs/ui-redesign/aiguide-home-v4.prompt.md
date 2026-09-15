# AIGuide 首页设计图 V4

- 日期：2026-09-07。
- 阶段：UI 视觉设计稿，尚未替换网站实现。
- 生成方式：内置 image_gen，基于已有 AIGuide 首页和品牌图标编辑。
- 最终文件：aiguide-home-v4.png。
- 图标沿用：aiguide-mark-v1.png。
- 初稿参考：aiguide-home-v3.png；用户提供的 CodexGuide 截图用于首屏结构评估。
- 方向：紧凑首屏、两个主要入口、按公司归组、区分产品与模型、三种不同的中文教程示意封面。

## 本轮采用的文案与结构

主标题：选对 AI，学会怎么用。

说明：从 ChatGPT、Claude 到国产 AI，用中文教程带你完成写作、办公和编程任务。

主要按钮：开始学习、浏览 AI 产品。

页面顺序：顶部导航 → 简短介绍与学习入口 → 按公司找教程 → 从一个小任务开始。

公司专题内保留网页、桌面、云端、终端与模型 API 的类型标识。OpenAI 的 ChatGPT、Codex、GPT 保持同组，Anthropic 与 Google 各自归组。中文教程预览分别表现材料提炼、桌面工作区和生成网页，标记为操作示意。

## 交付核对与实现约束

已目视核对名称、主要中文文案、两个按钮、公司归组、产品类型标签和三种教程画面。生成图用于确认方向；卡片精确等宽、像素对齐以及官方标识的原始矢量形状，后续实现仍需用布局代码和品牌资产落实，不能把生图作为像素级规范。当前未修改应用源码，也未执行应用测试。

参考设计参数：1536 × 1024 画布、约 1024px 居中内容区、约 32px 主标题、14px 正文、两个约 36px 高按钮；上下卡片采用同一组三等分网格。

## 首轮完整提示词

```text
Use case: ui-mockup, precise layout revision.
Asset type: high-fidelity Simplified Chinese desktop homepage design for AIGuide, a comprehensive AI tutorial site for ordinary people.

INPUTS:
Image 1 is the edit target: the existing compact white AIGuide homepage design. Image 2 is the supporting brand asset: the exact dark-navy A monogram whose negative space forms a guidance arrow. Preserve this identity.

PRIMARY REQUEST:
Create version 4 of this homepage, following the approved critique of a tutorial-site reference: clearly explain what to learn and where to start, keep the introduction compact, show company groups and useful lessons within the first desktop view. This is an actual flat website UI screenshot design, not a device mockup, poster, branding sheet or marketing billboard.

CANVAS AND SCALE:
Preserve a 1536 x 1024 landscape canvas and centered content width about 1040 pixels, with roughly 248 pixels of quiet white margin on either side. Small, normal desktop UI scale. Base text 14px, brand wordmark 20px, hero headline only 32px, company name 16px, section headings 17px. Do not zoom the whole page. Do not stretch cards across the viewport. Include the complete three tutorial cards at the bottom.

VISUAL STYLE:
Refined minimal white UI inspired by the restraint of Appica, thin cool-gray borders, near-black navy typography, soft off-white section surfaces, rounded 14–16px cards, subtle shadows, crisp typography, balanced spacing. The site's own primary action is navy, matching its A logo. Company and product brands retain their own authentic colors. No dominant gradient, no enormous faded background, no code wallpaper, no decorative giant hero logo.

LAYOUT, TOP TO BOTTOM:
1. Compact navbar about 64px high.
Left: a small 28px version of the exact Image 2 logo, wordmark "AIGuide", muted small descriptor "AI 学习手册".
Center: four links "首页" (active), "AI 产品", "学习路线", "实战教程".
Right: a modest search field, magnifier icon and "搜索教程". No community CTA, no crowded extra menu.

2. Short centered hero between approximately y=105 and y=292.
Main headline exact: "选对 AI，学会怎么用。"
Supporting copy exact, in two short centered lines at 14px:
"从 ChatGPT、Claude 到国产 AI，"
"用中文教程带你完成写作、办公和编程任务。"
Only TWO buttons, side by side, around 36px tall:
Primary dark navy "开始学习" with small right arrow.
Secondary white outlined "浏览 AI 产品".
No metrics counter, no duplicate marketing badges, no false testimonials. Keep vertical whitespace restrained.

3. Company directory, starting around y=320:
Left section heading "按公司找教程"
Below it, quiet one-line explanation: "先选公司，再找到你使用的软件或模型"
Right section link "查看全部公司 →"
Three equal cards around 334px wide, 200px tall. Each has an authentic colored/monochrome company mark, company name, one short product summary, a thin separator, exactly THREE distinct rows, and a small "进入专题 →" link. Align all card baselines and row tags.

CARD ONE:
Header authentic OpenAI black interwoven knot + "OpenAI"
Summary "ChatGPT · Codex · GPT"
Rows:
"ChatGPT" — small tag "网页 · 桌面"
"Codex" — small tag "桌面 · 云端 · 终端"
"GPT 模型" — small tag "模型与 API"

CARD TWO:
Header "Anthropic"; preserve the familiar Claude orange sunburst as the product-family visual inside this group, accurate silhouette and terracotta orange, no purple recoloring.
Summary "Claude · Cowork · Claude Code"
Rows:
"Claude" — tag "网页 · 桌面"
"Cowork · Claude Code" — tag "工作 · 编程"
"Claude 模型" — tag "模型与 API"

CARD THREE:
Header actual Google corporate G in its red/yellow/green/blue color arrangement + "Google". Do NOT replace this company mark with a Gemini sparkle.
Summary "Gemini · Gemini CLI"
Rows:
"Gemini" — tag "网页应用"
"Gemini CLI" — tag "终端工具"
"Gemini 模型" — tag "模型与 API"

Immediately underneath these three cards, one compact row of secondary company pills with respective recognizable native identity colors:
DeepSeek blue whale and "DeepSeek";
Alibaba/Qwen purple geometric knot and "阿里巴巴";
Kimi black brand tile and "月之暗面";
Zhipu blue dotted symbol and "智谱";
final plain "更多公司 →".
Each company has ONE grouped entry, never separate company cards for ChatGPT and Codex. Do not flatten app, interface and model into one undifferentiated list.

4. Tutorial section beginning around y=668:
Section title "从一个小任务开始"
Subline "选一个你现在用得上的任务，跟着做一遍"
Right link "全部教程 →"
Three equal tutorial cards with compact, clearly DIFFERENT Chinese thumbnail illustrations, 225px total height maximum. The pictures should occupy about 135px, footer about 78px. These are clean schematic tutorial previews, not English software screenshots. Use tiny "操作示意" labels if needed.

LEFT CARD, ChatGPT web tutorial:
Soft icy-blue thumbnail, real black OpenAI knot + "ChatGPT" at top, small "网页端" badge.
Illustration: a Chinese document flowing into a short checked summary list. All microcopy Chinese: "材料", "要点", "下一步".
Thumbnail title exact "读懂一份材料".
Footer description "上传材料，整理行动清单".
Footer small "入门 · 建议 25 分钟" and bookmark outline.

MIDDLE CARD, Claude desktop tutorial:
Soft warm-peach thumbnail, accurate Claude terracotta sunburst + "Claude" at top, small "桌面端" badge.
Illustration: a recognizable compact desktop app window with window controls, left sidebar with Chinese "对话", "文件", "项目", and a simple document attached to the main workspace. No source code. Visually different from the ChatGPT document-to-list card.
Thumbnail title exact "认识桌面工作区".
Footer description "安装与登录，找到常用入口".
Footer small "入门 · 建议 20 分钟" and bookmark outline.

RIGHT CARD, Codex desktop tutorial:
Soft pale lavender thumbnail, black/white OpenAI family mark + "Codex" at top, small "桌面端" badge. Absolutely no invented purple robot or alien icon.
Illustration: simple project file tree and task checklist on the left, arrow leading to an actual tiny Chinese webpage preview on the right, with heading "我的第一个网页", minimal geometric landscape image and blue button "立即开始". Visibly distinct from the Claude desktop tutorial.
Thumbnail title exact "做出第一个网页".
Footer description "从想法到可以打开的页面".
Footer small "入门 · 建议 30 分钟" and bookmark outline.

TEXT AND INVARIANTS:
All human-facing UI copy is Simplified Chinese except correct product names and the technical term API. Spell AIGuide exactly A I G u i d e. Keep all text sharp and legible. Use the exact wording provided; do not add surprise slogans, user counts, ratings or community claims. The entire composition is a measured website layout, with purposeful modest white space and consistent alignment.
Retain the brand icon from Image 2 without redesigning its silhouette. Preserve meaningful differences between company, product, usage surface, and model. Keep tutorial branding colors authentic. No browser chrome, no watermark, no surrounding black frame, no oversized components.
```

## 比例校正完整提示词

```text
Use case: precise-object-edit, UI scale and grid correction.
Input image 1 is the EDIT TARGET, the new AIGuide homepage with correct new Chinese copy, two buttons, Google G and three different tutorial images.
Input image 2 is the SCALE REFERENCE, the previous compact AIGuide layout. Use its modest typography and generous side gutters as the exact scale reference.
Input image 3 is the SUPPORTING AIGuide brand icon, which must remain unchanged.

Correct ONLY the overall UI scale, column alignment and vertical rhythm of image 1. Its current main content is too wide (about 1150px) and its three tutorial cards are not equal width, especially the right Codex card. Its hero headline is also too large.

REQUIRED GEOMETRY:
Output remains exactly 1536x1024, landscape.
The entire header and all main sections must share the SAME centered 1024px max width, starting at x=256 and ending at x=1280. Preserve WHITE gutters at least 250px wide on BOTH sides. Do not enlarge this container to fill the canvas.
Both company cards and tutorial cards must use the exact same THREE EQUAL COLUMNS:
column 1 x=256 to 584 (328px);
column 2 x=604 to 932 (328px);
column 3 x=952 to 1280 (328px).
Gap is 20px each. The Codex card must be the same width as the ChatGPT and Claude cards.
Primary navbar logo around 26px, wordmark around 19px. Hero headline exactly around 32px, not 44 or 48px. Body and button text around 14px, section heading 17px, tutorial titles 17px.
Keep the white canvas 1536px wide; do not crop or render a smaller design and scale it up again.

COMPOSITION:
Navbar y=18–68.
Hero headline near y=116; two lines of supporting copy near y=166 and y=186; two modest 36px-high buttons near y=218–254.
Company section title and subline near y=301 and y=327.
Three company cards y=348–558, identical size.
Secondary company pill row y=576–618.
Tutorial section title and subline near y=655 and y=678.
Three equal tutorial cards y=700–946, with about 154px image region and a 92px footer. All bottom edges aligned at y=946.
Leave clean white space to y=1024.

CONTENT TO PRESERVE:
Keep all wording and all information from image 1, especially:
"选对 AI，学会怎么用。"
"从 ChatGPT、Claude 到国产 AI，"
"用中文教程带你完成写作、办公和编程任务。"
buttons "开始学习" and "浏览 AI 产品".
Keep all three company groupings, three rows per company, their usage tags and original identity colors.
Keep Google G with native four colors, OpenAI black knot, orange Claude star, correct small AIGuide navbar icon.
Keep Chinese tutorial pictures as distinct illustrations: ChatGPT materials to summary; Claude desktop window and file workspace; Codex project files and webpage. No invented robot symbols.
Keep exact tutorial titles "读懂一份材料", "认识桌面工作区", "做出第一个网页".
The ONLY text correction is to ensure "GPT 模型" has a readable conventional space and all brand names are spelled accurately.
Maintain refined white/cool-gray Appica-like surfaces, dark navy actions, subtle 1px borders, approximately 14px card radii and soft shadows. No new sections, no decorative backgrounds, no counts, no duplicated tags. Render sharp, readable simplified Chinese text at a comfortable but compact desktop scale.
The outcome must feel like the SCALE of Image 2 combined with the CONTENT and lesson visuals of Image 1, with rigorously aligned equal columns.
```

## 卡片对齐校正完整提示词

```text
Use case: precise-object-edit.
This image is an otherwise approved AIGuide homepage. Make ONE precise correction only: equalize the widths of all six large content cards, by putting BOTH card rows on ONE shared three-column grid.
The existing Codex tutorial card at bottom right is visibly too wide. Reduce it. The ChatGPT and Claude tutorial cards must be the same width as Codex. Each card must align exactly underneath its corresponding company card. The project tree and webpage illustration inside Codex must be scaled down to fit the same card width; do not give it extra width.

Keep the existing canvas 1536x1024 and keep the existing content region from approximately x216 to x1304.
Make the actual grid:
- column 1 x216 to x564 = 348px wide
- gap 22px
- column 2 x586 to x934 = 348px wide
- gap 22px
- column 3 x956 to x1304 = 348px wide.
Apply these SAME left/right bounds to the OpenAI/ChatGPT cards, Anthropic/Claude cards, and Google/Codex cards respectively.
Top company row keeps y330 to y541.
Bottom tutorial row keeps y670 to y956.
All card borders in each row line up along the same top and bottom edges. All three bottom thumbnail areas end at y855 and footer areas start at y855. Each card is an identical rectangular shell, with different content.

Do not change any other element: keep navbar, AIGuide brand, small hero headline, two buttons, section labels, company pills, every Chinese word, every logo and its color, thumbnail content, clean white background and scale exactly as in the provided image. There are still exactly three tutorial cards. No extra content. No larger headline, no wider whole page. Only fix the unequal widths and align the columns, so this looks like a carefully constructed CSS grid.
```
