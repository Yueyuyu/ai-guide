# 知行 AI 首页重构设计稿 V1

- 阶段：高保真 UI 设计图，供本轮视觉评审；未修改网站实现。
- 生成方式：内置 image_gen，使用用户指定的 imagegen 技能。
- 视觉参考：https://appica.dev/ui （本轮已实际打开查看）。
- 参考特征：白底、近黑文字与按钮、大圆角白卡、浅灰层次、细边框与轻阴影、居中首页主视觉。
- 内容约束：公司统一归组；软件、工作工具、模型及不同使用端保持区分；图标沿用品牌配色；教程封面使用中文。

## 完整生成提示词

Use case: ui-mockup
Asset type: one high-fidelity desktop homepage design for the existing Chinese AI tutorial website “知行 AI”.
Primary request: redesign the website using the light visual language observed on https://appica.dev/ui, while preserving the product's company grouping and distinct tutorials. Generate one single polished, implementable website UI screenshot, not a wireframe or a collage of different screens.

Style reference, described from the actual Appica page: bright white canvas, nearly black navy typography (#101522), light cool-gray sections (#f6f7f9), crisp modern sans-serif typography like Geist with a clean Chinese sans font, a spacious centered hero, black filled buttons, soft 16–24px rounded white cards, extremely subtle borders and soft double-layer shadows, delicate dotted texture behind the cards. Restrained and tactile. Brand colors appear only in authentic product logos and quiet instructional thumbnails. Do not use beige paper, orange global buttons, heavy gradients, glass panels, or a dark dashboard.

Composition: a straight-on full-width desktop website canvas, approximately 1800 x 1440, rendered sharply at high resolution. White header 76px high, centered page content with generous side margins, a compact centered hero roughly 300px high, followed by company cards and a full row of three tutorial cards. Show every required section fully, with no clipped card bottoms. Use a coherent aligned grid, comfortable whitespace, clear 8px-based spacing. No browser chrome, device frame, perspective, design annotations, invented charts, subscription pricing, or stock photos. This is a tutorial website for ordinary Chinese users.

Header:
Left a compact dark rounded-square book symbol next to bold text “知行 AI” and a small light-gray pill “AI 学习手册”.
Center navigation: “发现教程” (active), “公司专题”, “学习路线”, “实战项目”.
Right a light-gray rounded search field with magnifying-glass icon, text “搜索教程” and keycap “⌘ K”, followed by an outlined bookmark icon and “我的学习”.

Centered hero:
Large confident dark heading on exactly two lines:
“把 AI 用起来，”
“从这里开始。”
Under it the subtitle “从选对工具，到动手完成。适合普通人的中文 AI 教程。”
Two horizontally aligned rounded buttons: a near-black primary “开始学习” with an arrow, and white subtle-bordered secondary “浏览公司专题”.
Below the buttons, one understated gray line: “37 篇中文教程  ·  12 家公司专题  ·  4 条学习路线”.
Keep the hero clear and welcoming, with strong readable Chinese typography and no illustration distracting from the content.

Company area:
Section heading “按公司，找到你的 AI” on the left and a small text link “全部 12 家公司 →” on the right.
Use three equal-width white rounded cards arranged in one row on a very faint cool-gray/dotted backdrop. Each company appears exactly once as a card. Company names must be visually distinct from the products listed inside.
Card 1: authentic recognizable black OpenAI knot logo in a small neutral square, title “OpenAI”, muted subtitle “ChatGPT · Codex · GPT”, small badge “6 个入口”.
Three tidy divided product rows:
“ChatGPT” with a pale tag “网页 · 桌面”
“Codex” with a pale tag “桌面 · 云端 · 终端”
“GPT 模型” with a pale tag “模型与 API”
Footer link “进入公司专题 →”.
Card 2: authentic Anthropic/Claude radiating asterisk logo in original terracotta-orange #D97757, title “Anthropic”, muted subtitle “Claude · Cowork · Code”, badge “5 个入口”.
Three tidy product rows:
“Claude” with tag “网页 · 桌面”
“Cowork · Claude Code” with tag “工作 · 编程”
“Claude 模型” with tag “模型与 API”
Footer link “进入公司专题 →”.
Card 3: authentic Gemini four-point star with original blue-purple-red gradient, title “Google”, muted subtitle “Gemini · Gemini CLI”, badge “3 个入口”.
Three tidy product rows:
“Gemini” with tag “网页应用”
“Gemini CLI” with tag “终端工具”
“Gemini 模型” with tag “模型与 API”
Footer link “进入公司专题 →”.
Keep each company's own original-color icon. Do not recolor the logos to the website theme. Do not show ChatGPT and Codex as two unrelated companies.

Below the three cards, add one quiet row of compact secondary company chips with brand marks: blue DeepSeek whale and “DeepSeek”; purple Qwen mark and “阿里巴巴”; black Kimi mark and “月之暗面”; blue GLM mark and “智谱”; “更多公司 →”. These are company navigation, not extra course cards.

Featured tutorials:
Section heading “从一个小任务开始” and a right-aligned text link “全部教程 →”.
Three beautiful, equal-width rounded tutorial cards with clearly DIFFERENT Chinese thumbnail designs and tasks. Each thumbnail is clean, practical, and lightly tinted; all interface labels are Simplified Chinese except authentic product names. The cards use the same outer design system but different actual content inside:
1. Very pale blue thumbnail with OpenAI mark, compact “ChatGPT” label, “网页端” badge, a miniature document leading to a checklist; large cover text “读懂一份材料”. Below: title “上传材料，整理行动清单”, metadata “入门 · 建议 25 分钟”, small bookmark outline.
2. Very pale peach thumbnail with terracotta Claude mark, “Claude Desktop” label, “桌面端” badge, a miniature app window with three Chinese tabs “聊天 / 工作 / 编程”; large cover text “认识桌面工作区”. Below: title “安装 Claude，认清三个入口”, metadata “入门 · 建议 20 分钟”, bookmark outline.
3. Very pale lavender thumbnail with recognizable blue-purple Codex product mark, “Codex” label, “桌面端” badge, miniature task checklist beside a finished Chinese webpage preview; large cover text “做出第一个网页”. Below: title “从想法到可打开的页面”, metadata “入门 · 建议 30 分钟”, bookmark outline.
Give each thumbnail its own composition and illustrative content rather than repeating a generic picture or English text.

Typography and constraints: render all quoted Chinese copy correctly and legibly; crisp consistent Chinese sans-serif, large hierarchy, dark body text with calm gray secondary text. Original company/product logos and their original colors remain recognizable. Existing product facts/counts must not be changed. Do not add fake rankings, scores, subscriber counts, or success claims. No Appica branding, no English tutorial cover slogans, no placeholder lorem ipsum. End result should look like a carefully shipped modern learning product using Appica-style component quality.

## 品牌图标局部校正提示词

Use case: precise-object-edit.
Image 1 (the wide white “知行 AI” homepage mockup with centered hero and three tutorial cards) is the EDIT TARGET. Image 2 (the tall beige existing website screenshot with a left sidebar and company directory) is ONLY a reference for the authentic brand logos.
Make exactly two small logo corrections in Image 1:
1. In the third tutorial thumbnail, next to “Codex”, replace the invented blue-purple polygon/hexagon icon with the actual Codex mark seen next to “Codex 桌面入口”, “Codex 云端版”, and “Codex CLI” in Image 2: the small rounded, soft lavender-blue cloudlike/robot-head-shaped symbol. Match that existing mark's shape and colors, not a polygon.
2. In the small “阿里巴巴” company chip, replace the invented purple wireframe cube with the real Qwen logo from the “阿里巴巴” card in Image 2: the purple interlocking star/knot mark with open triangular geometry. Match the authentic mark.
Preserve absolutely everything else in Image 1: the white Appica-inspired design, all Chinese text, company names, original OpenAI/Claude/Gemini/DeepSeek/Kimi/GLM marks, header, all card positions, colors, shadows, linework, spacing, and the exact overall composition and aspect ratio. Keep all text sharp. Do not introduce a sidebar or beige background from Image 2. Do not change wording or counts. The deliverable is the same one wide high-fidelity homepage image, with only these two logos corrected.

## 交付文件

- 最终设计图：`appica-home-v1.png`。
- 本文件保存首轮生成及局部校正的完整提示词。
- 这是视觉设计稿；品牌图标在页面实现中应复用现有本地 SVG 资源。
