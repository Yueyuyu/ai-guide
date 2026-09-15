# AIGuide 首页 V3：恢复三张课程卡片

日期：2026-09-13。
用户提供原始三张卡片截图，并表示“还是这些好看些”。
本轮按截图恢复蓝、紫、薄荷绿顶条，以及脑袋/脑图、应用-模型分层、填充对话气泡插图和对应说明文案。
编辑范围限于三张课程卡片，沿用 V2 首页的书页 Logo、页头、整体排版与其余入口。

生成方式：内置 image_gen。
编辑目标：[V2 首页](aiguide-pages-v2-home.png)。
视觉依据：[用户卡片截图](aiguide-pages-v3-cards-reference.png)。
这是静态设计稿编辑，不修改网站实现。

## 完整提示词

Use case: precise-object-edit / compositing.
Edit image 1, the complete refined AIGuide homepage. Image 2 is the user's preferred THREE LESSON CARDS and is the authoritative visual source for the edit. Output one complete homepage screenshot, same 1586 x 992 desktop canvas and framing as image 1.

Change ONLY the three lesson cards on the right side of the pale-blue learning-route section. Restore the cards' appearance from image 2 as closely as possible, fitted into the SAME card positions and bounds already present in image 1. The user explicitly prefers these friendly illustrations and the three accent colors over the simplified uniform blue line icons. Treat this as a scoped restoration, not a redesign.

Preserve ALL other parts of image 1: the new two-page AIGuide logo and wordmark, header/nav, selected underline, headline "从这里，学会 AI。", subtitle, left learning-route text and primary blue button, pale-blue section background, secondary entrance links and their icons, footer, typography scale, spacing, and overall page geometry. Do not revert the new logo to the old triangular A. Do not enlarge the page, add anything, or crop the full homepage. Do not copy the black outer margin of image 2.

Three replacement cards from left to right:
1. White card, subtle radius and shadow, pastel BLUE top strip exactly like image 2. Small "01", bold title "认识 AI", subtitle "AI 能做什么". Use the exact pale-blue human-head outline with a softly drawn brain inside and short rays around it from image 2. It must look like that friendly original illustration, NOT an AI chip, network nodes or rigid technical diagram. Footer copy in two balanced lines: "了解 AI 的基本概念、" / "发展现状和常见应用场景。".
2. Same white card geometry, pastel LAVENDER top strip. "02", title "软件与模型", subtitle "ChatGPT 和 GPT 有何不同". Restore the gentle two-tier application/model diagram from image 2: pale-blue rounded rectangular block "应用", caption "像 ChatGPT 这样的软件"; thin vertical connecting line; pale-violet rounded block "模型", caption "像 GPT 这样的 AI 模型". Footer "搞清楚应用和模型的区别，" / "以及它们是如何协同工作的。".
3. Same white card geometry, pastel MINT top strip. "03", title "第一次提问", subtitle "把问题说清楚". Restore the original filled speech-bubble illustration from image 2: soft light-gray bubble at upper left with two gray horizontal lines, vivid blue bubble at lower right with THREE white dots. Keep its soft depth and gentle shading, not a thin outlined icon or insertion cursor. Footer "学习有效的提问方法，" / "获得更符合预期的答案。".

Match image 2's illustration shapes, scale within each card, breathing room, visual friendliness and color relationships. Keep all three card top edges and bottom edges aligned, with existing small gray right-pointing arrows between them. Preserve Chinese text legibility, do not add unrelated English. The final image must clearly be image 1 with just this three-card region restored to image 2's design. One final full homepage only, no comparison board and no annotations.
