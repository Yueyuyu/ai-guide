# 官方教程核对与模型榜单接入

首次核对：2026-09-14；2026-09-15 补充豆包网页版公开界面核对。没有登录第三方产品账号或发起收费模型调用。

2026-09-15 实际打开豆包网页，确认“对话”、文字输入、发送和登录控件，并用本站虚构通知试填、试发。未登录试发后返回首页，未取得回答。因此豆包仍标为“部分步骤待核对”，没有把人工参考答案标为实测输出。两张实拍、原始界面文本和练习材料位于 `public/tutorials/doubao-notice/`，来源内容哈希及精确获取时间保存在 `source-review.json`。截图的中文序号在网页上叠加，原始截图保持不变。

2026-09-15 再次通过官方桌面说明的渲染正文确认系统安装入口、登录、打开项目文件夹、选择Codex与New chat。摘录位于 `public/tutorials/codex-web/official-entry-source.txt`，哈希与获取时间在来源登记中。新增网页参考作品、研究材料、写作与周报答案均为本站人工编写；JSON练习台仅做本地结构校验，未发起真实模型调用。

## 教程核对

31 个产品入口均有记录：20 个已核对关键官方说明，11 个仍有具体待核对项。44 篇教程全部附来源与核对范围；通用练习保持本站编写身份。机器可读记录见 [source-review.json](../src/data/source-review.json)，内含准确来源、获取时间、核对时间及原始页面或渲染正文的哈希（适用时）。未披露的源文档日期保留 null，不以核对当天冒充发布或更新日期。

- 豆包工作改为豆包桌面版的工作模式，官方入口改为下载页；没有确认账号内按钮与权益的部分保持明确待核对。
- ChatGPT 与 Codex 的统一桌面入口由当前官方文档确认；保留网页、桌面、CLI、云端各自教程。
- Claude Desktop、Cowork 与 Claude Code 分开；访问本地文件的跨端会话必须起于桌面，且桌面在线、文件夹已连接。网页 Cowork 保留 Beta 与套餐条件。
- Gemini API 按来源 2026-09-04 UTC 的快速开始改成 Interactions，不混用旧 GenerateContent 的 contents/parts/candidates 字段；示例未执行付费调用。
- OpenAI、Claude API 通过官方 SDK 核对关键字段。原 API 文档分别返回 403 或重定向区域不可用页，没有把这些响应误算成文档核对成功。
- 补全 Qwen Code 的 Node.js 22+、安装和 /auth；Claude Code 的 Windows winget；Cursor 的 Agent 快捷键；Gemini CLI 的安装和登录。
- MiniMax 旧文档 HTTP 404，已换为新文档；Kimi 文档使用当前 canonical 入口。
- 方舟初始 HTML 无正文，实际渲染后核对 API Key、模型开通、arkruntime 与 Responses。豆包下载页同样使用渲染正文核对。

| 产品与入口 | 状态 | 官方依据 | 范围及未覆盖内容 |
| --- | --- | --- | --- |
| 豆包桌面版 · 工作模式 | 部分步骤待核对 | [豆包桌面版下载与工作模式](https://www.doubao.com/download) | 已确认官方桌面下载入口，以及豆包工作属于桌面版工作模式。 未在账号内逐项操作；按钮位置、账号权益、系统要求与输出文件流程需按实际版本再核对。 |
| ChatGPT 网页版 | 关键步骤有官方依据 | [ChatGPT 网页端](https://learn.chatgpt.com/docs/web) | 已确认网页版聊天／工作入口、文件输入和成果下载。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| ChatGPT 桌面版 | 关键步骤有官方依据 | [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) | 已确认 ChatGPT 与 Codex 位于同一桌面应用，Chat/Work 与编程入口分别学习。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Claude 网页版 | 部分步骤待核对 | [Cowork 在网页、桌面和手机上使用](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) | 已通过官方跨端说明确认 Home 中 Chat 与 Cowork 的模式区别。 逐段写作是本站练习；网页账号中的附件、编辑操作尚未逐项实操。 |
| Claude Desktop 桌面版 | 关键步骤有官方依据 | [Claude Desktop 安装说明](https://support.claude.com/en/articles/10065433-install-claude-desktop)；[Cowork 在网页、桌面和手机上使用](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) | 已确认桌面安装、聊天／Cowork／Code 区分及扩展设置。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Claude Cowork 工作模式 | 关键步骤有官方依据 | [Cowork 在网页、桌面和手机上使用](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) | 已确认模式入口与跨端条件：访问本地文件的会话需起于桌面，桌面应用在线且文件夹已连接。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Gemini 网页版 | 关键步骤有官方依据 | [Gemini 网页应用入门（中文）](https://support.google.com/gemini/answer/13275745?hl=zh-Hans) | 已确认网页输入、附件入口与登录条件；账号和地区可用性另行核对。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| DeepSeek 网页版 | 部分步骤待核对 | [DeepSeek 官方网站](https://www.deepseek.com/) | 已检查本站教程的入口归属，保留独立网页练习。 本次没有取得足以验证全部网页步骤的官方帮助正文，未登录账号；具体按钮、附件与搜索功能仍待核对。 |
| Qwen Chat 网页版 | 部分步骤待核对 | [Qwen 官方网站](https://qwen.ai/) | 已检查本站教程的入口归属，保留独立网页练习。 本次没有取得足以验证全部网页步骤的官方帮助正文，未登录账号；具体按钮、附件与搜索功能仍待核对。 |
| Grok 网页版 | 部分步骤待核对 | [Grok 官方入口](https://grok.com/) | 已检查本站教程的入口归属，保留独立网页练习。 本次没有取得足以验证全部网页步骤的官方帮助正文，未登录账号；具体按钮、附件与搜索功能仍待核对。 |
| Kimi 网页版 | 部分步骤待核对 | [Kimi 官方网站](https://www.kimi.com/) | 已检查本站教程的入口归属，保留独立网页练习。 本次没有取得足以验证全部网页步骤的官方帮助正文，未登录账号；具体按钮、附件与搜索功能仍待核对。 |
| 智谱清言网页版 | 部分步骤待核对 | [智谱清言](https://chatglm.cn/) | 已检查本站教程的入口归属，保留独立网页练习。 本次没有取得足以验证全部网页步骤的官方帮助正文，未登录账号；具体按钮、附件与搜索功能仍待核对。 |
| 豆包网页版 | 部分步骤待核对 | [豆包网页版公开界面](https://www.doubao.com/chat/) | 2026-09-15 已实拍并核对对话、粘贴与发送控件；未登录试发返回首页，未取得回答。账号内生成、追问、复制及其他设备仍未实测；AIGuide 成果保存是本站功能。 |
| Codex · 桌面编程入口 | 关键步骤有官方依据 | [ChatGPT 桌面应用](https://learn.chatgpt.com/docs/app) | 已确认统一桌面应用中的 Codex、项目文件夹和新聊天流程。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Codex 云端网页版 | 关键步骤有官方依据 | [Codex 云端环境](https://learn.chatgpt.com/docs/cloud) | 已确认仓库连接、云端环境和差异审查；GitLab 仍标注 Beta。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Codex CLI 终端版 | 关键步骤有官方依据 | [Codex CLI 官方入门](https://learn.chatgpt.com/docs/codex/cli) | 已确认按系统安装、项目目录启动与首次认证流程。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Claude Code | 关键步骤有官方依据 | [Claude Code 官方概览](https://code.claude.com/docs/en/overview) | 已确认 Windows winget 安装、终端启动和登录；桌面 Code 是另一个入口。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Cursor 编辑器 | 关键步骤有官方依据 | [Cursor 快速开始](https://cursor.com/docs/get-started/quickstart) | 已确认打开项目、Ctrl+I／Cmd+I 打开 Agent 与查看改动的流程。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Gemini CLI 终端工具 | 关键步骤有官方依据 | [Gemini CLI 快速开始](https://geminicli.com/docs/get-started/)；[Gemini CLI 项目说明](https://geminicli.com/docs/cli/gemini-md/) | 已确认终端启动、Google 认证与 GEMINI.md 项目说明机制。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Qwen Code 终端工具 | 关键步骤有官方依据 | [Qwen Code 官方 README](https://github.com/QwenLM/qwen-code#readme) | 已确认独立安装器／npm 两种方式，npm 需要 Node.js 22+，会话中用 /auth 配置服务。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| GitHub Copilot · VS Code | 关键步骤有官方依据 | [GitHub Copilot 个人设置（中文）](https://docs.github.com/zh/copilot/how-tos/set-up/set-up-for-self) | 已确认 VS Code 扩展与 GitHub 账号设置，补全和聊天分开练习。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| GPT 模型系列 | 关键步骤有官方依据 | [OpenAI 官方 Node SDK](https://github.com/openai/openai-node#usage) | 已通过官方 SDK 核对 Responses 的 model、input 和 output_text；示例是接口阅读练习。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Claude 模型系列 | 关键步骤有官方依据 | [Claude Python SDK 使用示例](https://github.com/anthropics/anthropic-sdk-python#usage)；[Claude SDK：Message 响应类型](https://github.com/anthropics/anthropic-sdk-python/blob/main/src/anthropic/types/message.py) | 已通过官方 SDK 核对 Messages、content 内容块和停止原因。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Gemini 模型系列 | 关键步骤有官方依据 | [Gemini API 快速开始](https://ai.google.dev/gemini-api/docs/quickstart) | 已按 2026-09-04 更新的官方快速开始修正为 Interactions 图文输入；不混用旧 GenerateContent 字段。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| DeepSeek 模型系列 | 部分步骤待核对 | [DeepSeek API 快速开始](https://api-docs.deepseek.com/) | 已确认服务地址、模型别名和 thinking 请求参数。 思考模式专页本次连接超时，响应中推理字段的完整协议尚待复核；未发起 API 调用。 |
| Qwen 模型系列 | 关键步骤有官方依据 | [Qwen 官方文档](https://qwen.readthedocs.io/en/latest/) | 已确认权重、推理与部署入口。本课只比较运行方式，不把文档首页版本当作最新模型。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| GLM 模型系列 | 关键步骤有官方依据 | [GLM Function Calling](https://docs.bigmodel.cn/cn/guide/capabilities/function-calling) | 已确认 tools、tool_calls、JSON 参数与 tool_call_id 回传流程；库存练习为本站自编。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| MiniMax 模型服务 | 部分步骤待核对 | [MiniMax 模型概览](https://platform.minimax.cn/docs/guides/models-intro) | 已替换失效文档链接，确认文本与语音分别属于不同服务。 本次核对到模型概览；具体语音接口字段、音频返回方式和账号内调用尚待逐项核对。 |
| Grok 模型系列 | 关键步骤有官方依据 | [xAI Web Search](https://docs.x.ai/developers/tools/web-search) | 已确认 Responses 的 web_search 工具配置；实时性必须有实际工具结果及引用。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |
| Kimi 模型系列 | 部分步骤待核对 | [Kimi API 快速开始](https://platform.kimi.com/docs/get-api-key) | 已确认 Kimi 当前开发平台、认证、兼容地址和调用示例。 长文分段和引用练习为本站自编；文件解析接口的完整格式、各模型限制与账号调用尚待复核。 |
| 豆包模型系列 | 关键步骤有官方依据 | [火山方舟快速入门](https://www.volcengine.com/docs/82379/1399008) | 已读取动态官网正文，确认 API Key、模型开通、官方 SDK、区域地址及 Responses 示例。 本次核对公开官方资料，未登录产品账号、运行练习或发起付费调用。 |

## 真实排名

- 来源：[Artificial Analysis 公开榜单](https://artificialanalysis.ai/leaderboards/models)。[方法说明](https://artificialanalysis.ai/methodology/intelligence-benchmarking)。
- 本次有效快照获取时间：2026-09-15T05:25:51.525Z（UTC）。北京时间显示在页面顶部。
- Intelligence Index v4.3：121 个配置；Terminal-Bench v4.0：124 个配置。仅保留未停用且有对应数值的配置，综合榜排除来源标记的估算分。
- 名次在本站收录范围中按原始精度排序，同分并列；显示两位小数不能证明完全同分。没有把不同来源／指标归一化后混排。
- 来源没有披露统一评测更新日期，sourceUpdatedAt 保持 null。模型发布日期不作评测日期。
- 来源载荷 SHA-256：7713fc073ac5a99a769fb5171a0d533eba7e919fc6b7a56a96e17a929a3217ef。
- Arena 公开页面本次返回 HTTP 403，保持独立空状态。中文、图片、视频也未接入，不能用综合分代替。
- 原色品牌文件保存在 public/brands/rankings；[资源清单](../src/data/ranking-brands.json)记录源 URL、时间及文件哈希。

## 更新与维护

2026-09-15补充读取 [Windows桌面官方说明](https://learn.chatgpt.com/docs/windows/windows-app)，Markdown证据保存在 `public/tutorials/codex-web/official-windows-source.txt`，获取时间与SHA-256记录在 `source-review.json` 的 `chatgpt-windows` 项。支持Windows安装、原生运行环境和文件夹说明；未把资料读取扩展为账号内生成实测。

新增 `pnpm audit:content` 检查站内引用与资源，`--links`检查来源可达性，本机可加 `--system-http`。资料过期提示依据最早一份已核对来源计算；检查网址本身不会更新资料时间。HEAD可能被帮助站点拒绝或返回404，因此失效结论先用GET确认；403与网络失败仍需人工复核，不直接删除来源。

本地开发页点击“更新榜单”会实际读取固定公开来源，也可以运行：

~~~powershell
pnpm refresh:rankings
~~~

数据保存在 public/data/rankings/current.json；history 保存通过校验的来源快照，status.json 记录最近更新尝试。先完整校验，再原子替换当前文件；失败保留旧数据和旧日期。源结构或评测版本变化时停止更新，待人工核对，不静默套用旧规则。

GET /data/rankings/current.json 和 status.json 在本地开发／预览服务中通过专用 JSON 中间件读取，避免 Vite 对 JSON 的处理在 Windows 持有文件而阻止替换。POST /api/model-rankings/refresh 只接受同源请求；并发更新共享一次来源请求。Windows 的瞬时文件占用仅对原子替换作有限重试，不删除旧快照。

pnpm dev 更新 public 数据；pnpm preview 更新 dist 内对应快照，刷新浏览器仍保留结果。纯静态部署只显示构建时快照；没有后端时点击更新会明确提示，不能自称实时自动更新。发布静态版本前先运行刷新脚本，再构建。当前未设置自动调度、密钥服务或公开部署。

只使用系统受信任证书，没有关闭 TLS 校验。来源读取限制为 25 秒、12 MB，不执行来源脚本。非文本评测、更多来源和账号内实操仍需后续独立核对。
