export const modelGuides = [
  {
    id: 'gpt-api-map', title: 'GPT 模型：认识应用背后的 API 调用', description: '从模型标识、输入和返回结果，理解 Responses 接口的使用位置。', category: 'automation', platform: 'api', productId: 'gpt-models', tools: ['gpt-models'], level: '进阶', minutes: 25, color: 'sage', cover: ['认识 GPT 模型', '软件背后的调用方式'],
    goals: ['区分 ChatGPT 账号产品与 API 服务', '识别模型标识和输入结构', '知道从返回结果中提取什么'], prerequisite: '了解基本编程与 JSON。本篇是接口阅读练习，不需要提交密钥或产生付费调用。实际接入从当前官方 SDK 示例开始。',
    sections: [
      { title: '从应用中的模型选择走到 API', paragraphs: ['ChatGPT 是使用模型的应用；程序调用 GPT 则需要开发平台、认证、模型标识和请求结构。桌面应用里的一次任务可能还用了文件、插件和工具，单独调用模型不会自动复制整个工作环境。', '先到官方 API 文档找到 Responses 接口，再查看你准备使用的模型条目。记录支持的输入类型与当前模型 ID，不从聊天界面的展示名称推测字符串。'] },
      { title: '阅读一条最小 Responses 请求', paragraphs: ['本次核对的 OpenAI 官方 Node SDK README 使用 client.responses.create({ model, input })，并用 response.output_text 读取文本；认证通过 OPENAI_API_KEY 环境变量配置。把“给一段文字起标题”作为练习目标，先只处理文本。', '模型调用放在服务端，通过环境变量读取密钥；前端只发送业务输入，不接触密钥。流式输出、工具调用和文件输入应在普通文本流程清楚之后再加入。'], checkpoint: '能在官方示例中指出模型、输入、认证与输出读取四个位置。' },
      { title: '把文本结果变成可检查的业务结果', paragraphs: ['查看 SDK 提供的文本读取方式，并认识原始返回可能包含不同输出项。不要假定所有响应都只有一段普通字符串。', '你的业务如果要求标题不超过20字，需要在程序侧检查长度和空结果。收到响应、解析成功与业务要求满足是不同的检查点。'] },
    ], exercises: ['说明 GPT、ChatGPT 与 Codex 各处在哪一层', '从官方示例标出输入与结果读取位置', '为标题任务列出空值、长度和超时处理'], takeaway: '模型是一种可调用能力，应用还包含围绕它构建的界面、工具和流程。',
  },
  {
    id: 'claude-api-blocks', title: 'Claude 模型：读懂 Messages 的内容块', description: '把聊天软件与开发者接口分开，认识消息、内容块和停止原因。', category: 'automation', platform: 'api', productId: 'claude-models', tools: ['claude-models'], level: '进阶', minutes: 25, color: 'peach', cover: ['认识 Claude 模型', '从消息读到内容块'],
    goals: ['找到 Messages 接口示例', '识别文字与其他内容块', '为不完整结果设计处理'], prerequisite: '了解数组、对象和基本 HTTP 概念。本篇阅读官方示例，不要求开通或付费调用。',
    sections: [
      { title: '打开 API 文档，而不是桌面设置', paragraphs: ['在 Claude 官方开发文档中找到 Messages API。确认模型标识、消息结构和输出预算等参数。Claude Desktop 的扩展设置并不是创建模型请求的地方。', 'Claude 应用订阅和 API 服务的计费、额度分别核对。不要因为桌面能对话，就把同一登录状态理解为程序已经有 API 认证。'] },
      { title: '按类型读取 content 内容块', paragraphs: ['Messages 响应的 content 是内容块列表。阅读官方示例中的 type 字段，理解文本块与工具相关块的用途；不能把整个对象强制转成字符串交给用户。', '用“从通知中提取时间”作为练习，先只取文本结果，再检查它是否来自原始通知。以后接工具时，应按块类型分支处理。'], checkpoint: '能解释为什么 content 是列表，而不是假定它永远是一条普通文本。' },
      { title: '检查停止原因与完整性', paragraphs: ['官方 Python SDK 的 Message 类型定义确认：content 是带 type 的内容块列表；stop_reason 中 end_turn 表示自然结束、max_tokens 表示达到输出限制、tool_use 表示调用工具。这不是完整枚举，其他类型需要按当前 SDK 分支处理。', '若结果因输出预算被截断，不要把半段 JSON 写入数据库。先报告未完成，再根据业务设计续写或重新请求。'] },
    ], exercises: ['找到 Messages 的请求和返回示例', '指出文本内容块的类型与正文', '说明截断结果为什么不能直接入库'], takeaway: '读懂内容块和停止状态，比只看到模型返回了文字更接近可靠接入。',
  },
  {
    id: 'gemini-api-parts', title: 'Gemini 模型：用 Interactions 组织图文输入', description: '按当前官方快速开始，分清应用、AI Studio 与 Interactions API。', category: 'automation', platform: 'api', productId: 'gemini-models', tools: ['gemini-models'], level: '进阶', minutes: 25, color: 'blue', cover: ['认识图文输入', '用 Interactions 提问'],
    goals: ['区分 Gemini 应用与 AI Studio', '认识 Interactions 的图文输入', '处理缺图与不可辨认结果'], prerequisite: '了解 JavaScript 与 JSON，准备一张公开测试图片。本课只阅读和设计请求；若实际运行，需单独配置开发者密钥并核对费用。',
    sections: [
      { title: '先确认你读的是哪套 API', paragraphs: ['gemini.google.com 是应用；AI Studio 用于开发试验；Gemini API 用于程序调用。当前官方快速开始（来源更新于 2026-09-04 UTC）使用 Interactions API。', '本课按这份说明组织 input，并读取 output_text。旧 GenerateContent 教程里的 contents、parts 和 candidates 属于另一套协议，不能与本课字段拼在同一个请求里。'] },
      { title: '用文字和图片组成 input', paragraphs: ['官方 JavaScript 示例使用 @google/genai。服务端从环境变量 GEMINI_API_KEY 读取密钥，图片读成 Base64；input 中用 type 区分文字与图片，用 mime_type 说明真实文件类型。', '下面按官方图文示例简化，只读 sample.jpg，不添加音频。模型标识来自这次文档示例，不表示所有账号都可调用；运行前检查模型权限和当前 SDK 版本。'], code: "import fs from \"node:fs\";\nimport { GoogleGenAI } from \"@google/genai\";\n\nconst ai = new GoogleGenAI({});\nconst interaction = await ai.interactions.create({\n  model: \"gemini-3.8-flash\",\n  input: [\n    { type: \"text\", text: \"列出图片中清晰可见的文字，不清晰的内容标为无法辨认。\" },\n    { type: \"image\", data: fs.readFileSync(\"sample.jpg\").toString(\"base64\"), mime_type: \"image/jpeg\" },\n  ],\n});\nconsole.log(interaction.output_text);", language: 'JavaScript · 官方示例改编，未执行付费调用', checkpoint: '能指出 input 中的问题、图片、编码和文件类型，并分清它与旧 parts 格式。' },
      { title: '检查返回状态与图片依据', paragraphs: ['output_text 是 SDK 提供的便捷文本属性；原始响应也有状态和其他输出项。失败、未完成或没有可用文字时先保留未完成状态，不把空文本当成提取成功。', '挑三个图片上能看清的字段对照。缺少图片、文件格式不符、图片模糊分别处理；数字还要检查币种和单位。不要根据商品常识补造图中没有的信息。'] },
    ], exercises: ['说明 Gemini 应用、AI Studio 与 API 的区别', '设计一条包含文字和图片的 Interactions 输入', '列出缺图、模糊和空结果的处理'], takeaway: '先对齐 API 版本与字段，再核对输入材料和输出依据。',
  },
  {
    id: 'deepseek-api-reasoning', title: 'DeepSeek 模型：分开思考信息与最终答案', description: '从官方接口文档确认模式和返回结构，避免把过程当作交付结果。', category: 'automation', platform: 'api', productId: 'deepseek-models', tools: ['deepseek-models'], level: '进阶', minutes: 25, color: 'blue', cover: ['读懂思考型输出', '过程和答案分开处理'],
    goals: ['确认 API 入口和模型标识', '区分最终内容与思考相关字段', '检查答案与费用预算'], prerequisite: '能阅读 JSON。打开 DeepSeek 官方接口文档查看当前模式；本篇不固定易变化的模型版本号。',
    sections: [
      { title: '从 API 文档确认模式选择方式', paragraphs: ['进入 api-docs.deepseek.com，查看当前模型列表、思考模式说明、认证和调用地址。本次快速开始列出 deepseek-flash 和 deepseek-v4-pro；OpenAI 兼容地址为 https://api.deepseek.com。示例通过 thinking: {type: "enabled"} 开启思考，并设置 reasoning_effort: "high"。旧别名可能映射到新模型，不能当作独立版本比较。', '网页上的“联网搜索”是应用功能，不能因为 API 使用同家模型就假定它也自动检索互联网。需要搜索的产品必须另外设计数据来源。'] },
      { title: '分别处理最终内容和推理相关字段', paragraphs: ['按照官方返回示例，识别最终回复内容和思考模式可能提供的推理相关内容。使用兼容客户端时，检查它是否保留所需字段，而不是只确认请求能发出去。', '给终端用户展示的是可以核对的最终答案。过程文字长短不是质量证明，也不能代替预算题中的计算结果。'], checkpoint: '能在示例中找到最终答案读取位置，并知道其他字段是否应展示或存储。' },
      { title: '用固定预算题验证业务输出', paragraphs: ['为输入“场地300元、20人、每人25元”设置预期合计800元。检查最终字段是否正确，再测试缺人数的情况是否要求补充。', '输出预算、延迟与费用按你实际选用的 API 模式记录。不要把网页会员价格套到按调用计费的程序上。'] },
    ], exercises: ['从官方文档记录模型与模式设置', '指出最终答案与其他内容的位置', '为预算题写出正常与缺条件的预期'], takeaway: '思考模式也需要应用层校验；最终答案正确与否必须独立判断。',
  },
  {
    id: 'qwen-deployment-choice', title: 'Qwen 模型：选择托管 API 还是自行运行', description: '从硬件、维护和接口开始，区分模型权重与可直接调用的服务。', category: 'automation', platform: 'api', productId: 'qwen-models', tools: ['qwen-models'], level: '进阶', minutes: 25, color: 'lilac', cover: ['选择模型运行方式', '托管服务或自行部署'],
    goals: ['分清模型权重与服务接口', '列出两种运行方式的准备条件', '确认具体模型和授权范围'], prerequisite: '有基本开发经验，写下一项计划接入 AI 的任务。不需要为了这篇教程购买设备或下载模型。',
    sections: [
      { title: '先分清下载模型与调用模型', paragraphs: ['Qwen 模型可以通过相应模型发布页面获取权重，也可以由服务商托管并提供 API。下载了权重并不等于已经有可调用接口，还需要推理运行环境。', 'Qwen Chat 是现成应用，Qwen Code 是终端工具，都不能代替你确认模型部署方式。'] },
      { title: '为两种方式列准备清单', paragraphs: ['托管 API 需要核对服务地区、认证、模型 ID、请求格式与费用；自行运行需要核对权重许可、显存、推理框架、量化格式和运维能力。', '以一个小型文本提取任务为例，先评估是否有自行维护的必要。没有硬件经验时，可先阅读托管接口示例，不必一步跨到部署完整大模型。'], list: ['托管：谁提供接口，数据送到哪里，如何计费。', '自建：谁维护服务，机器是否足够，失败怎么恢复。'], checkpoint: '选择一种方式，并能具体说明它需要的配置和维护工作。' },
      { title: '固定准确的模型与接口约定', paragraphs: ['同一系列下不同尺寸、版本和用途的模型不是可以任意互换的字符串。从选择的服务文档复制准确标识，不根据网页品牌名猜模型 ID。', '用带缺失字段的提取任务设计验收：语法、字段类型和原文对应都要检查。之后更换服务时重新检查兼容性。'] },
    ], exercises: ['说明权重文件和服务地址的区别', '选定一种运行方式并列准备清单', '找到对应模型与许可文档入口'], takeaway: '选择模型的同时，也在选择它的运行位置和维护方式。',
  },
  {
    id: 'glm-tool-calling', title: 'GLM 模型：理解工具调用由谁执行', description: '用只读库存查询说明模型请求、服务端工具与最终回答的关系。', category: 'automation', platform: 'api', productId: 'glm-models', tools: ['glm-models'], level: '进阶', minutes: 30, color: 'blue', cover: ['让模型调用工具', '模型提出，程序执行'],
    goals: ['找到 GLM 工具调用文档', '定义最小只读工具参数', '分清模型回复与实际执行'], prerequisite: '了解服务端函数与 JSON。使用虚构商品数据设计流程，本篇不连接真实库存系统。',
    sections: [
      { title: '选择支持所需能力的模型接口', paragraphs: ['进入智谱开放平台文档，查看当前模型是否支持工具调用及其消息结构。清言网页里能完成某项任务，不意味着你选择的每个 API 模型都支持相同工具。', '当前工具调用页使用 tools 声明工具，tool_choice 仅支持 auto；响应的 tool_calls 包含 function.name、JSON 字符串形式的 function.arguments 和 id。程序执行后用 role: "tool" 与 tool_call_id 回传结果，再请求最终回答。先从查询开始，不把改库存、下订单混入第一次练习。'] },
      { title: '为库存查询设计明确参数', paragraphs: ['定义查询工具只接收商品编号，返回商品名、库存数量和查询时间。模型请求调用工具时，服务端仍需校验商品编号格式和当前用户是否有权限查询。', '模型返回一段“已查库存”的文字不等于查询发生。必须有程序执行工具、获得结果，再把工具结果交回模型。'], checkpoint: '流程中明确存在“服务端实际执行查询”这一步，且不会修改库存。' },
      { title: '处理未知商品与工具失败', paragraphs: ['用存在的商品、未知商品和查询超时三个案例检查流程。不存在的商品应返回未找到，而不是让模型猜一个库存数量。', '工具结果应作为事实输入，最终回答不得提高其确定性。未来加入写入工具时还需单独设计权限和确认边界。'] },
    ], exercises: ['找到当前模型的工具调用说明', '定义只读查询的参数与结果', '写出正常、未知商品和超时三条处理路径'], takeaway: '工具调用是应用与模型的协作协议，实际业务动作由程序负责。',
  },
  {
    id: 'minimax-api-types', title: 'MiniMax 模型服务：区分文本与语音接口', description: '从接口用途、返回类型与保存方式出发，规划一次内容处理流程。', category: 'automation', platform: 'api', productId: 'minimax', tools: ['minimax'], level: '进阶', minutes: 25, color: 'lilac', cover: ['选对内容生成接口', '文字与语音分别处理'],
    goals: ['在开发平台按任务找到接口', '区分文本结果与音频结果', '定义可以打开的最终交付物'], prerequisite: '了解 API 和文件概念。本篇用虚构文字规划流程，不调用语音服务，也不使用真实人物声音。',
    sections: [
      { title: '先确定需要文字还是声音', paragraphs: ['进入 platform.minimax.cn 的模型概览，分别找到文本生成与语音合成说明；旧 platform.minimaxi.com/document 已失效。本次概览分别列出 MiniMax-M3 等语言模型与 Speech-2.8-HD/Turbo 语音模型，具体调用仍需打开各自接口页。公司名称不是单一接口名称，不能用同一份参数同时完成所有任务。', '“把通知压缩成100字”需要文本处理；“把确认好的通知读出来”需要语音合成。先完成文字审查，再决定是否生成音频。'] },
      { title: '分别阅读输入与返回格式', paragraphs: ['文本接口重点检查消息、模型和输出正文；语音接口还需要核对声音选择、语言、音频格式及返回数据的读取或下载方式。具体参数以当前文档为准。', '不要把 JSON 返回值直接保存成 MP3，也不要只拿到一个地址就声称声音已经生成并可播放。应确认真实媒体文件与格式。'], checkpoint: '设计表中把文字结果和音频结果分开，分别说明怎样读取与保存。' },
      { title: '用交付物检查两条流程', paragraphs: ['文字任务检查内容、字数和遗漏；音频任务检查可播放、朗读内容、发音和时长。API 成功只是开始，最终文件必须能被使用。', '不同接口的费用、额度和服务范围分别记录。其他 MiniMax 创作应用的订阅不自动等于开发平台的调用余额。'] },
    ], exercises: ['找到文本与语音两类官方文档', '列出两种结果不同的保存方式', '为最终文字和音频各写一份检查表'], takeaway: '接口按任务和结果类型来选，品牌相同也需要不同的处理流程。',
  },
  {
    id: 'grok-api-sources', title: 'Grok 模型：区分模型回答与检索工具', description: '从 xAI API 的工具说明开始，让应用显示信息是否有实时来源。', category: 'automation', platform: 'api', productId: 'grok-models', tools: ['grok-models'], level: '进阶', minutes: 25, color: 'ink', cover: ['信息从哪里来', '模型回答与检索证据'],
    goals: ['分清模型知识与工具检索', '找到当前搜索工具的使用说明', '为回答保留时间和来源'], prerequisite: '了解 API 请求概念。准备一个有官方来源的公开技术问题，本篇不要求实际付费调用。',
    sections: [
      { title: '先看所选 API 是否真的配置了工具', paragraphs: ['当前 xAI 官方 Web Search 文档使用 Responses API，地址为 https://api.x.ai/v1/responses，并在 tools 中配置 {type: "web_search"}。本次示例模型为 grok-4.6；不同 SDK 的结果结构需按对应示例读取。Grok 网页有时能给出实时信息，不代表你的普通模型请求也已经执行搜索。', '先设计两种状态：仅基于输入和模型知识回答；通过明确工具获取新资料后回答。界面应能让用户看出这次属于哪一种。'] },
      { title: '把检索范围与来源字段说清楚', paragraphs: ['为问题写明起止日期、优先来源和要解决的决定。例如只查某项软件的官方更新，而不是收集所有讨论热度。', '按照当前工具文档读取引用、来源或工具执行结果。不要仅凭正文写了“我已搜索”就把状态显示为联网成功。'], checkpoint: '流程里有工具执行的证据，并能保留原始链接与时间。' },
      { title: '当工具失败时保留未确认状态', paragraphs: ['如果搜索失败、没有来源或链接无法支持结论，应明确返回未确认，不能把旧知识写成最新消息。', '使用一条已知官方公告检查结果，再测试没有足够证据的问题。以来源是否支持结论作为检查标准。'] },
    ], exercises: ['设计未检索与已检索两种状态', '找到官方搜索工具说明', '为无来源与失败结果写出处理'], takeaway: '实时性来自实际获取的证据，而不是模型或产品名称。',
  },
  {
    id: 'kimi-api-context', title: 'Kimi 模型：让长文请求保留原文位置', description: '从文件解析到消息组织，理解网页版附件与程序输入的不同。', category: 'automation', platform: 'api', productId: 'kimi-models', tools: ['kimi-models'], level: '进阶', minutes: 25, color: 'ink', cover: ['长文怎样交给模型', '保留章节，控制上下文'],
    goals: ['分清文件上传与可读文本', '按章节组织长文请求', '检查预算和引用定位'], prerequisite: '能阅读 JSON，准备一份有章节标题的公开报告。实际接口参数按 Moonshot 当前文档确认。',
    sections: [
      { title: '先确认模型收到的是文件还是解析文本', paragraphs: ['打开当前 Kimi API 开放平台文档。快速开始确认：OpenAI 兼容调用使用 https://api.moonshot.cn/v1，密钥来自 MOONSHOT_API_KEY；本次默认示例为 kimi-k3。文件处理需再打开文件问答指南，不能把网页上传步骤当作接口协议。Kimi 网页拖入 PDF 后的解析流程由应用处理，程序请求需要按接口协议准备材料。', '不要把本地路径字符串当作文档正文。先抽查解析得到的标题、目录和一段原文，保证输入可读取。'] },
      { title: '按章节组织材料并预留输出空间', paragraphs: ['在每段材料前保留报告名称、章节和页码等位置标记，再提出具体问题。若拆分材料，保留片段与原文件的映射。', '查询当前模型的上下文限制，输入、历史消息和预期输出都要计入规划。长上下文也不等于可以不加组织地堆入所有文件。'], checkpoint: '每个片段都有可返回原文的标记，请求大小在所选模型允许范围内。' },
      { title: '用位置和摘录一起核对', paragraphs: ['要求回答保留短摘录和章节标记，再回到解析文本和原始报告双重检查。只看到一个页码并不能证明引用正确。', '报告没回答的问题返回资料不足，解析失败的页面要标为未读取。不要让模型凭常识补出缺失章节。'] },
    ], exercises: ['抽查报告解析出的三个位置', '设计有章节标记的输入格式', '列出超长输入和缺失页面的处理'], takeaway: '长文处理需要材料组织和位置映射，容量大也不能代替引用检查。',
  },
  {
    id: 'doubao-ark-start', title: '豆包模型：从火山方舟认识服务配置', description: '把日常豆包应用与开发者服务分开，确认模型、接入点与调用凭据。', category: 'automation', platform: 'api', productId: 'doubao-models', tools: ['doubao-models'], level: '进阶', minutes: 25, color: 'blue', cover: ['把豆包能力接入应用', '从方舟服务配置开始'],
    goals: ['找到火山方舟的模型文档', '确认准确的调用标识和区域', '设计服务端摘要接口的错误处理'], prerequisite: '有基本后端开发知识。本篇先做配置阅读，不要求开通付费资源；实际可用服务与费用按账号确认。',
    sections: [
      { title: '进入方舟文档，确认服务与区域', paragraphs: ['通过火山引擎的方舟产品文档查看模型接入说明。豆包网页对话的登录页面不是这里的开发配置入口。', '根据项目计划使用的服务区域和模型能力，核对账号可以调用的资源。不要复制其他教程的示例标识就假定自己的账号能访问。'] },
      { title: '分别记录模型、接入点与凭据', paragraphs: ['官方快速入门要求创建 ARK_API_KEY、开通所选模型服务，再安装 arkruntime。当前 Python 示例使用 Ark，base_url 为 https://ark.cn-beijing.volces.com/api/v3，通过 client.responses.create 发起请求；本次示例模型为 doubao-seed-2-1-pro-260628。其他区域或历史接入点需按所用接口核对。展示名称和可调用标识可能不同，复制时保留准确值。', '在自己的服务端读取凭据，把摘要任务的业务参数与云服务配置分开。前端只提交待处理文字，不接收模型服务密钥。'], checkpoint: '配置清单明确说明请求发到哪里、调用什么、如何认证，没有把豆包应用会员当成调用凭据。' },
      { title: '为通知摘要设计最小返回规则', paragraphs: ['选择一段短通知作为测试输入，规定输出包含时间、地点和待确认项。逐条检查缺失字段是否被擅自补齐。', '分别规划鉴权失败、资源不存在、达到限额和请求超时的提示。无法调用时先检查对应配置，而不是让前端展示一条伪造的成功摘要。'] },
    ], exercises: ['找到方舟官方模型接入说明', '列出服务地址、调用标识与认证位置', '为四类调用错误设计明确提示'], takeaway: '使用模型服务需要完整配置，软件品牌名不能代替可调用的资源标识。',
  },
];
