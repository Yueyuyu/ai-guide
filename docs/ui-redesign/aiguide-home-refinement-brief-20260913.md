# AIGuide 已选首页精修任务

日期：2026-09-13。
用户明确喜欢的参考图：
[清晰的起点](aiguide-learning-20260913-01.png)
原始生成文件：C:/Users/Yueyu/.codex/generated_images/01a076fd-b82f-74e1-a6b6-61ef9d5188bd/exec-77034036-72e0-4ad3-a40b-a8f9a2668e04.png

附件文本路径的 /C:/ 前缀导致应用读取失败。本轮已移除盘符前多余斜杠并成功打开核对原图，不需要用户重新上传。

## 已确定的精修方向

- 保留蓝白色调、页头、左对齐标题、入门路线和三个课程预览。
- 标题保留“从这里，学会 AI。”。
- 收紧当前偏大的字号、按钮和功能图标，让比例接近正常桌面网页。
- 统一课程图标、模型分层示意和提问图标的线宽与颜色。
- 新 Logo 需要同时考虑网页页头和小尺寸图标。

## 当前状态

折页 G Logo 被用户明确否定，不能继续用它作为默认品牌。
用户已选择继续打磨第 2 版“向前的书页”，优化书页轮廓和中间留白。
本轮已以精修后的书页品牌图为统一参考，完成首页整合稿与独立白底标识；交付见 `aiguide-pages-v2-20260913.md`，提示词见 `aiguide-pages-v2-20260913.prompt.md`。
网站源代码未修改。不要把静态设计稿称为已上线或已实现的网页。

## 待执行首页精修提示词

以下提示词的“第二参考图”必须替换为用户选中的 Logo，不能使用已否定的折页 G。

Use case: ui-mockup / precise-object-edit.
Edit the FIRST reference image, the user's selected AIGuide homepage, into a carefully refined production-quality visual design. The SECOND reference is the newly designed master AIGuide brand symbol. Use that EXACT symbol silhouette and colors for the homepage logo; do not invent another triangular A or redraw it as a different G.
Target dimensions: 1586 x 992, matching the first reference's desktop viewport. Keep the same pearl-white and gentle blue visual direction, header, left-aligned headline, main pale-blue learning-route area with three lesson preview cards, and the pair of secondary links underneath. This is a refinement of the selected design, not a new layout. Do not add a sidebar, other courses, a company directory, large illustration, marketing statistics, chat interface or extra panels. Page content only, no browser frame.
Critical refinements:
1. Reduce the visual scale of the original design. Make the page look like a REAL desktop website at 100% zoom. Main headline around 44px, section title 30px, lesson titles 22px, body16px, metadata13–14px, header links14px, buttons44–46px high. In the original image several headings and icons are too large: shrink these approximately25–30%, increase optical breathing room, and do not enlarge the whole layout to fill the canvas. Keep a comfortable outer content width around1300px with aligned x140 margins.
2. Header height around80px, brand mark 30px tall using the exact second reference, AIGuide wordmark26px in a precise rounded geometric sans serif, navy #17233C. The mark has no bulky app-icon tile behind it. Nav center "学习路线" / "工具教程" / "模型指南"; selected first link has a tiny understated blue underline. Top right "继续学习 →". Thin #E5EAF2 bottom rule.
3. Headline block y135–245, a quiet small "AI 入门指南" label preceded by a tiny blue square, EXACT headline "从这里，学会 AI。", subtitle "从认识 AI 到熟练使用工具，一步一步学清楚。". White background #FCFDFE, navy text, secondary text #607087, no oversized weight or stretched type.
4. Main learning-route surface y295–695, soft nearly-white blue #F0F5FE, 16px radius, no heavy border or shadow. Left column width330px with small blue "建议从这里开始", heading "AI 入门路线", one short paragraph "先弄懂基本概念，再完成第一次使用。", single solid cobalt #3D63EA44px primary button "开始入门路线 →", then small note "适合第一次接触 AI 的你".
5. The three right-hand lesson preview cards are identical in width and padding, about225px wide ×310px high, white with only a faint 1px border and restrained2px blue top accent. Replace the random blue/purple/green colored thick tabs with one coherent blue system. Tiny thin gray arrows between cards indicate sequence. Cards should be individually readable without being oversized. Headings and captions:
"01" / "认识 AI" / "AI 能做什么" / footer "了解常见能力与使用边界".
"02" / "软件与模型" / "ChatGPT 和 GPT 有何不同" / footer "分清应用入口与底层能力".
"03" / "第一次提问" / "把问题说清楚" / footer "完成一次清楚、有效的对话".
Use shorter text and breathable interiors instead of large paragraph blocks.
6. Replace the original mixed-style head/brain, chunky conversation bubbles, spanner and purple book with a coordinated lightweight icon and diagram system. Style: precise1.75px cobalt/navy strokes at24px UI icon size, rounded joins, a little pale-blue fill, no emoji, 3D, colored sticker tiles or heavy glossy shading. The first card has a concise connected-node intelligence diagram, central rounded square with four small connected nodes, about76px, airy and clear. The second card has a neat two-layer explanatory diagram, labels "应用" above "模型", separated by a subtle connector, with tiny captions "如 ChatGPT" and "如 GPT". The third has two small coordinated outlined speech shapes, one with two text lines, one with an insertion cursor, about84px, not giant cartoon bubbles.
7. Beneath main area y755–845 the two secondary links remain side-by-side on the white base, with a central hairline divider. First uses a small36px pale-blue icon area with a24px four-app-squares icon, then text "已经在用 AI？" and primary-colored link "查看工具教程 →"; small line "豆包工作 · ChatGPT · Codex · Claude". Second uses the same size/icon treatment with a24px layered-model icon, text "想理解更多？" and link "了解模型基础 →"; small line "模型能力、选择方法与使用边界". Eliminate the large colorful rounded-square sticker icons.
8. Footer at y920 with a thin rule, center "先学会使用，再慢慢深入。", AIGuide small at right. No clipped content. Use carefully aligned baseline rhythm,8px spacing system, comfortable accessible contrast. Accent blue as a guide to actions, not large areas of oversaturation.
Preserve exact Chinese wording and correct distinction between applications and models. No extra English except the named brands. No dates, fake percentages, awards or claims. Treat the provided brand image only as the new exact logo source and the first screenshot as the selected layout source. Render a finished, coherent high-fidelity UI screenshot, not an annotated design board.
