# 知行 AI 首页重构设计稿 V2

- 阶段：UI 设计图修订，未改动网站实现。
- 生成方式：内置 image_gen，基于 V1 设计图编辑。
- 用户反馈：宣传语需要重想；页面元素普遍偏大，整页显得被放大、拉宽。
- 新主标题：选对 AI，学会怎么用。
- 副标题：从软件入门、模型选择，到写作办公与编程实战，跟着中文教程一步步完成。
- 文案意图：直接说明工具选择与实际操作两个学习价值，用副标题交代内容范围。
- 最终设计规格：以 1536×1024 画布为基准，主内容居中约 1024px，两侧各约 256px 留白；主标题约 32–34px，正文约 13px，按钮高约 34px，品牌主图标约 24px。以上为生成稿的布局目标。
- 输出：appica-home-v2.png。

## 完整生成提示词

Use case: ui-mockup edit.
Asset: second revision of the existing “知行 AI” homepage design.
Input image: the supplied local appica-home-v1.png is the edit target. The user says the marketing slogan needs rethinking and the whole interface feels enlarged and stretched. Correct BOTH problems with a carefully recomposed, normally scaled desktop website screenshot.

Preserve the clean Appica-inspired bright white visual language, nearly-black text and buttons, very subtle cool-gray shadows, rounded white cards, fine borders, company grouping, original brand colors, all three distinct Chinese tutorial thumbnail subjects, and the website identity. This is a design-image revision only.

CANVAS AND SCALE — the most important correction:
Keep a landscape canvas with the same 1536 x 1024 proportions as the supplied image.
Treat it as a desktop browser at normal 100% zoom. The page must look comfortably smaller and more compact inside the canvas.
Use a centered main content width of approximately 1104 pixels, from x=216 to x=1320. Leave the wide 216-pixel white gutters on BOTH sides EMPTY. Every company card, section header, secondary-company chip and tutorial card must align to this centered container. Nothing in the main body may span almost the entire canvas.
The top header is full-width white, but its inner content is centered within a 1248-pixel width, from x=144 to x=1392.
Use real product-interface scale: header height 64px; wordmark about 22px; navigation/body type 13–14px; metadata 11–12px; main heading about 36px, weight 600, on ONE line; section headings about 20px; company titles 16–17px; company marks 28px; button height 38px; compact 8–12px button corners; company card corners 16px; tutorial card corners 16px. UI objects should be roughly 25–30% smaller than the previous draft at the same canvas size.
Reflow and redesign the interior spacing at the new scale. Maintain readable text, balanced empty space, and natural proportions. This is an ordinary polished website, never an enlarged poster or a stretched image.

COPY — replace the old slogan completely:
Main heading, exactly on one line: “选对 AI，学会怎么用。”
Subtitle, centered, in regular 14px gray text: “从软件入门、模型选择，到写作办公与编程实战，跟着中文教程一步步完成。”
The subtitle may occupy two understated short lines within a 620px text width.
Primary dark button: “从零开始学” with a small arrow.
Secondary white outline button: “按公司找教程”.
Under the buttons, small quiet gray copy: “37 篇中文教程 · 12 家公司专题 · 4 条学习路线”.
Do not keep the old “把 AI 用起来，从这里开始” headline.
Do not add other slogans, a grandiose claim, enrollment numbers, rankings or a fake testimonial.

LAYOUT SPECIFICATION:
Header y=0–64. Compact book mark and “知行 AI” wordmark, small “AI 学习手册” pill; centered nav “发现教程”, “公司专题”, “学习路线”, “实战项目”; right compact “搜索教程” field with “Ctrl K” keycap and “我的学习”.
Hero y=108–300. Main one-line headline near y=125. Subtitle beneath it, small paired buttons, then counts. Use enough breathing room but do not create a tall empty hero.
Company section starts around y=332 with heading “按公司找教程” and link “全部 12 家公司 →”.
Three EQUAL-WIDTH compact company cards across the 1104px container, 16px gaps, each about 357px wide and 194–210px tall. Their tops align. Company header: 28px authentic brand mark, company name and small subtitle; compact count badge on the right. Three concise divided rows with 12–13px text and subdued 11px usage tags. Small footer link “进入专题 →”.
OpenAI card, black knot logo, title “OpenAI”, subtitle “ChatGPT · Codex · GPT”, badge “6 个入口”:
“ChatGPT” — “网页 · 桌面”
“Codex” — “桌面 · 云端 · 终端”
“GPT 模型” — “模型与 API”
Anthropic card, terracotta #D97757 asterisk, title “Anthropic”, subtitle “Claude · Cowork · Code”, badge “5 个入口”:
“Claude” — “网页 · 桌面”
“Cowork · Claude Code” — “工作 · 编程”
“Claude 模型” — “模型与 API”
Google card, original colorful Gemini star, title “Google”, subtitle “Gemini · Gemini CLI”, badge “3 个入口”:
“Gemini” — “网页应用”
“Gemini CLI” — “终端工具”
“Gemini 模型” — “模型与 API”
Keep only ONE card for each company, with products inside.

Below the cards, a low-height row of simple company links/chips: blue DeepSeek mark + “DeepSeek”; purple Qwen mark + “阿里巴巴”; black Kimi mark + “月之暗面”; blue GLM mark + “智谱”; “更多公司 →”. Icons here should be only 18–20px. Keep this row inside the same 1104px width.

Tutorial section around y=655–934:
Heading “从一个小任务开始” and small link “全部教程 →”.
Three equal-width cards in one row, same compact width as the company cards, height about 230px, each with a roughly 150px instructional thumbnail and an 80px title/metadata area. They must feel like normal article cards, not large hero panels.
First: pale blue; OpenAI mark + “ChatGPT” and tiny “网页端” badge. A small document-to-checklist illustration. Cover title “读懂一份材料” at about 19px, not enormous. Bottom title “上传材料，整理行动清单” at 14–15px; “入门 · 建议 25 分钟”; small bookmark.
Second: pale peach; terracotta Claude mark + “Claude Desktop” and “桌面端”. A small desktop window with the Chinese tabs “聊天 / 工作 / 编程”. Cover title “认识桌面工作区” at about 19px. Bottom title “安装 Claude，认清三个入口”; “入门 · 建议 20 分钟”; bookmark.
Third: pale lavender; the existing rounded lavender-blue Codex robot/cloud mark + “Codex” and “桌面端”. A small task checklist and a completed Chinese webpage preview. Cover title “做出第一个网页” at about 19px. Bottom title “从想法到可打开的页面”; “入门 · 建议 30 分钟”; bookmark.
Use simplified small instructional illustrations with crisp readable Chinese labels. The three subjects must remain different.

Final constraints: render Chinese accurately, original-color brand marks, white calm Appica-inspired surfaces. Keep wide side gutters plainly visible, use normal desktop scale and compact controls. Do not fill the space with extra widgets or new content. Do not stretch card widths. No huge lettering, no oversized logos, no sidebar, no browser chrome, no device frame, no annotations about pixels, no watermark. Deliver a refined second-version homepage design whose scale visibly solves the user's complaint.

## 第二次比例校正

Edit the supplied second-version “知行 AI” homepage image. Make ONLY a strong proportional UI-scale correction. The user still needs the page to feel like a normal compact desktop website, not a large presentation slide.
Keep the same 1536 x 1024 canvas, all Chinese copy exactly as it is, especially “选对 AI，学会怎么用。”, all product names, all counts, company grouping, the original logo colors, and the same white Appica style.

Crucial layout changes:
- Narrow the main content from its current roughly 1216px to just 1024px, centered between x=256 and x=1280. BOTH side gutters must be a full 256px wide. All company section headings, company cards, company chips and tutorial cards align within this width. Do not let them spread back out across the page.
- Reduce the headline to a clearly modest 32–34px UI heading, about TWO THIRDS of its current visible size. Keep it on one line. The headline should be visibly smaller than in the supplied image.
- Make the OpenAI, Anthropic and Google logos inside company cards only 24px square, about HALF their current visible size. Company title about 15px, product row text 12px, line height 18px. No giant logos.
- Button height 34px, width about 144px. Body copy 13px, metadata 11px. Brand header wordmark 20px, nav 13px.
- Each of the three company cards should be about 330px wide and 180px high, with 16px gaps. Reduce vertical padding, row height, and internal gaps proportionally.
- The secondary-company links should use 16px icons and 12px text, in a short 30px-tall row.
- Each tutorial card should be about 330px wide and 210px high. The illustrated cover area should be only 130px high. Its Chinese cover title should be 17–18px. Shrink the miniature documents/windows so they fit gracefully. Bottom article title 13px, metadata 11px. Keep all three distinct subjects.
- Keep the content centered. Hero can occupy y=104–282; company cards around y=337–517; company chips y=533–565; tutorial heading around y=608; tutorial cards y=640–850.
- Leave the bottom 140–160px of the canvas largely WHITE and empty, like the natural unused portion of a desktop viewport. Do NOT enlarge or vertically stretch the last cards to fill the canvas. No extra sections or decorative material to consume the whitespace.
- Keep the full-width white header, with its contents inset to a centered 1200px width. Retain all navigation and the compact search field.

This must show an unmistakable reduction in typography, logo and component scale, together with noticeably larger lateral whitespace. Redraw cleanly with sharp readable text and correct proportions; preserve the refined styling and all copy. Do not add a browser frame, zoom percentage labels, measurements, or any visible designer annotations.
