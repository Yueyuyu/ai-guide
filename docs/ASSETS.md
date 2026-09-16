# 品牌图标

本轮从用户原有 `model-ranking-ui-prototype/index.html` 的 `brandIcons` 中提取 15 个 SVG，原样写入 `public/brands/`。这些是已有品牌识别资源，不是本轮重新设计的商标；使用不表示官方合作或认证。发布前应按品牌规范与原始资产许可审核使用范围。

界面用 `ToolMark` 统一尺寸、留白和图片路径，不对 SVG 使用着色滤镜，不把页面主题色应用到商标路径。

| 品牌／产品 | 资源 | 保留的配色 |
| --- | --- | --- |
| OpenAI / GPT / ChatGPT | openai.svg | 原黑色图形 |
| Claude | anthropic.svg | #D97757 |
| Claude Code | claudecode.svg | #D97757 |
| Gemini | google.svg | 蓝、绿、红、黄渐变 |
| Gemini CLI | geminicli.svg | 原多色图形 |
| DeepSeek | deepseek.svg | #4D6BFE |
| Qwen / Qwen Code | alibaba.svg | #6336E7 / #6F69F7 渐变 |
| Grok | xai.svg | 原黑色图形 |
| Kimi | moonshot.svg | 白色字形、#1783FF，配深色背景 |
| 智谱 / GLM | zhipu.svg | #3859FF |
| 豆包 | doubao.svg | 原蓝、绿、紫渐变 |
| MiniMax | minimax.svg | #E2167E / #FE603C 渐变 |
| Codex | openai.svg | 按已确认 UI 使用 OpenAI 家族黑色图形；原 codex.svg 保留为历史资源 |
| Cursor | cursor.svg | 原黑白图形 |
| GitHub Copilot | githubcopilot.svg | 原黑色图形 |

模型与应用可以共享同一品牌图标，页面通过产品名、类型和适用入口区分它们。图标本身不承载模型版本或账号权益信息。

## AIGuide V4 新增资源

- `public/images/aiguide-mark.png`：沿用用户确认的 `docs/ui-redesign/aiguide-mark-v1.png`；内置 image_gen 生成的 A 与指引箭头品牌图标，用于导航和 favicon。
- `public/brands/google-company.png`：2026-09-07 从 Google 官方静态资源下载，地址为 https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png 。仅用于 Google 公司入口；Gemini 产品继续使用 `google.svg`。
- `public/images/chatgpt-materials.png`、`claude-workspace.png`、`codex-webpage.png`：内置 image_gen 分别生成的中文操作示意插图，参考已确认的 V4 首页，分别对应阅读材料、桌面操作与网页制作。完整提示词见 `ui-redesign/tutorial-assets-v4.prompt.md`。
- 插图是教学示意，不作为第三方应用的真实截图。页面品牌、平台标签、标题与收藏为独立 HTML 元素，插图不替代交互。
- 本轮沿用项目既有的线性界面图标组件，没有新增运行时依赖。

## 2026-09-14 全站原型更新

当前书页标识在 `src/components/GuideArt.jsx` 中以 SVG 实现，favicon 为 `public/favicon.svg`。使用两片不等高蓝色页形及中间留白；旧 A＋箭头图片不再用于导航。三张入门图使用真实 SVG／HTML，含脑部、应用／模型层次、对话气泡。

公司与产品进一步分开：

- `public/brands/anthropic-company.svg`：原样复制设计阶段保存的 `ui-redesign/anthropic-company-reference.svg`；Anthropic 公司使用黑色标识，Claude 产品继续使用暖橙色星芒。
- `public/brands/bytedance-company.svg`：原样复制 `ui-redesign/bytedance-company-reference.svg`；字节公司与豆包产品分开。
- `public/brands/doubao-work.png`：复用设计阶段保存的豆包工作原始参考资产；不将图标当成产品版本、安装和账号条件已核对的证据。
- `public/brands/github-company.png`：2026-09-14 从 GitHub 官方资源下载，`https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png`。GitHub 公司用 Octocat，Copilot 保留产品图形。
- `public/brands/alibaba-company.ico`：2026-09-14 从阿里巴巴集团官网 HTML 指向的 `https://static.alibabagroup.com/static/favicon.ico` 下载；公司用橙色标识，Qwen 保留原紫色图形。
- Kimi 原始白色字形在深色底上展示，未修改商标路径或颜色。

下载的公司素材均已目视核对并实际用于页面；没有使用图片生成工具重绘第三方商标。早期 V4 的图片与说明作为历史设计记录保留。

## 入门选择资产 · 2026-09-15

- `public/brands/workbuddy.svg`：从 WorkBuddy 官网 HTML 实际引用的 [产品图标](https://download.codebuddy.cn/web/workbuddy/93a7cd0d70556625552d16b09c6a9cf8c2e089b9/assets/workbuddy-icon-BujKiC6G.svg)原样保存，保留绿色渐变与白色图形；用于新手选择、教程和产品入口。
- 腾讯公司入口复用已有 `public/brands/rankings/tencent_small.svg`，来源和哈希仍在 `src/data/ranking-brands.json`；公司标识与 WorkBuddy 产品图标分开。
- 教学资料只保存实际阅读的必要官方短摘录；文件与哈希登记在 `src/data/source-review.json`，不把官方界面示例当作本站账号实测。

## 模型榜单资产 · 2026-09-14

新增 27 家来源公司标识，原样取自 Artificial Analysis 榜单载荷引用的 /img/logos/ 路径，保存在 public/brands/rankings。每个文件的原 URL、获取时间、SHA-256 见 src/data/ranking-brands.json。未用 CSS 滤镜改色；这是来源页面提供的品牌文件，不宣称已获得各品牌授权。实际浏览检查完整榜单无破图。

## 图文步骤 · 2026-09-16

- WorkBuddy 课补充 5 张官方文档原图：客户端登录、本地工作空间、计划模式、工作空间文件、变更。原始地址、正文来源、获取时间、尺寸、字节数与 SHA-256 见 `public/tutorials/workbuddy-first/images.json`。
- 图片在本站同源提供、按需加载，可点击放大；未改绘官方界面。结果区的文件是官方其他任务示例，正文明确要求读者查找本课的 `weekly-summary.txt`，不把图当成本课产物。
- 未使用官方旧下载页或无关技能示意图。完整安装向导仍链接到官方文档；不复制整套长图。
- 豆包继续使用 2026-09-15 的两张未登录官网实拍，中文编号为网页叠加。此次精简正文没有更新其截图日期或账号实测状态。
