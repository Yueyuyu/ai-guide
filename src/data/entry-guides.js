import { officialSources as sources } from './products.js';

// 各教程保留独立入口、界面动作和检查结果；共通方法在专题页单独展示。
export const entryGuides = {
  'chatgpt-files': { productId: 'chatgpt', platform: 'web', title: 'ChatGPT 网页版：上传材料，整理行动清单', cover: ['读懂一份材料', '上传、提问与核对'], sources: [sources.web], intro: {
      "title": "打开网页版，选择聊天或工作",
      "paragraphs": [
        "在 chatgpt.com 登录后，本课先使用 Chat（聊天）。"
      ],
      "checkpoint": "附件文件名正确，标题与三个要点能在原文找到。",
      "actionSteps": [
        "选择 Chat；生成文档的 Work 模式以后再学。",
        "点输入框附件入口，加入测试文档，等文件名显示。",
        "请它复述标题和三个要点，确认读到了正确材料。"
      ],
      "screenshot": {
        "src": "tutorials/visual-guide/chatgpt-web.webp",
        "alt": "ChatGPT 网页版：聊天与工作切换、附件加号",
        "width": 1599,
        "height": 984,
        "sourceUrl": "https://learn.chatgpt.com/docs/web",
        "caption": "OpenAI 官方界面示例 · 2026-09-16 获取，非本课实测；图中选中 Work，本课先切到 Chat。",
        "markers": [
          {
            "number": 1,
            "x": 54,
            "y": 15,
            "title": "Chat：聊天",
            "description": "本课先选择聊天。"
          },
          {
            "number": 2,
            "x": 36,
            "y": 52.5,
            "title": "加号：添加材料",
            "description": "添加文件后核对文件名。"
          }
        ]
      }
    } },
  'claude-writing': { productId: 'claude', platform: 'web', title: 'Claude 网页聊天：逐段修改一篇文章', cover: ['改好一篇文章', '保留事实，逐段修改'], intro: {
      "title": "在 Claude 网页选择聊天，放入原稿",
      "paragraphs": [
        "打开 claude.ai 并登录，选择 Chat（聊天）。本课不使用 Cowork 或 Claude Code。"
      ],
      "checkpoint": "能在会话中同时找到原稿和第一轮编辑建议，便于后续逐段比较。",
      "actionSteps": [
        "新建对话，粘贴短文并标出原稿起止。",
        "先要求指出问题，暂不重写全文。",
        "保留原稿和第一轮建议，方便后面比较。"
      ],
      "visual": {
        "title": "先审稿，再改稿",
        "items": [
          {
            "title": "原稿",
            "text": "在同一会话保留全文"
          },
          {
            "title": "三处问题",
            "text": "先问哪里重复、哪里不清楚"
          },
          {
            "title": "一段改稿",
            "text": "确认方向后再逐段修改"
          }
        ]
      },
      "supplement": {
        "title": "使用附件时",
        "paragraphs": [
          "先确认附件已经读入，再开始编辑。不要根据文件名推测正文。"
        ]
      }
    } },
  'gemini-research': { productId: 'gemini', platform: 'web', title: 'Gemini 网页版：比较两份资料并保留来源', cover: ['比较两份资料', '结论与来源一起看'], intro: {
      "title": "从 Gemini 应用开始，标清两份材料",
      "paragraphs": [
        "打开 gemini.google.com，用 Google 账号登录；本课使用普通聊天。"
      ],
      "checkpoint": "回答能分别识别 A 与 B，且指出各自的主题和来源。",
      "actionSteps": [
        "将两份材料标为 A、B，分别粘贴原文片段和来源链接。",
        "需要上传文件时，等附件处理完成。",
        "先让它分别概括 A、B，确认没有混淆来源。"
      ],
      "visual": {
        "title": "两份材料，分开提供",
        "items": [
          {
            "title": "材料 A",
            "text": "标题 + 原文片段 + 来源链接"
          },
          {
            "title": "材料 B",
            "text": "标题 + 原文片段 + 来源链接"
          }
        ],
        "kind": "compare",
        "label": "材料组织示意 · 非产品实测"
      },
      "supplement": {
        "title": "Gemini、AI Studio 与研究模式",
        "paragraphs": [
          "本练习无需进入 AI Studio 的开发控制台。上传文件与保存记录需要相应登录条件；普通聊天不自动等于 Deep Research。使用研究模式时另查研究计划、检索过程与来源。"
        ]
      }
    } },
  'deepseek-reasoning': { productId: 'deepseek', platform: 'web', title: 'DeepSeek 网页版：用思考模式检查预算', cover: ['算清活动预算', '思考之后，自己验算'], intro: {
      "title": "找到网页对话，区分思考与搜索",
      "paragraphs": [
        "打开 chat.deepseek.com 并登录，开始新对话。本题条件已给全，无需联网搜索。"
      ],
      "checkpoint": "能说出是否开启思考、是否启用联网，以及这次题目需要哪些已知条件。",
      "actionSteps": [
        "如有深度思考选项，可以开启；没有也可用普通对话。",
        "记录实际使用的模式，再输入预算题。"
      ],
      "visual": {
        "title": "两个选项解决不同问题",
        "items": [
          {
            "title": "思考",
            "text": "分析已有条件、验算预算"
          },
          {
            "title": "搜索",
            "text": "查找外部资料；本题不需要"
          }
        ],
        "kind": "compare",
        "label": "功能区别示意 · 非按钮截图"
      }
    } },
  'qwen-structured': { productId: 'qwen', platform: 'web', title: 'Qwen Chat：把产品描述整理成结构化数据', cover: ['整理零散信息', '把文字变成数据'], intro: {
      "title": "进入 Qwen Chat，先做一条产品记录",
      "paragraphs": [
        "打开 chat.qwen.ai 的普通对话，先保留默认设置；如有模型选项，记下当前选择。"
      ],
      "checkpoint": "准备好一条有价格的商品记录和一条缺价格记录，作为两次独立检查。",
      "actionSteps": [
        "准备一条有价格的商品描述。",
        "再准备一条没有价格的描述，作为第二次检查。"
      ],
      "visual": {
        "title": "两份输入，各测一次",
        "items": [
          {
            "title": "有价格",
            "text": "便携阅读灯，价格 89 元"
          },
          {
            "title": "没有价格",
            "text": "便携阅读灯，支持充电"
          }
        ],
        "kind": "compare",
        "label": "测试材料示意 · 非产品实测"
      },
      "supplement": {
        "title": "这篇使用哪个入口",
        "paragraphs": [
          "本篇使用 Qwen Chat 网页，不要求安装 Qwen Code 或部署模型。返回 JSON 仍需检查，不会自动写入数据库。"
        ]
      }
    } },
  'kimi-documents': { productId: 'kimi', platform: 'web', title: 'Kimi 网页版：上传报告，找出结论所在章节', cover: ['读懂一份报告', '找到章节与原文'], intro: {
      "title": "从附件入口加入报告",
      "paragraphs": [
        "打开 kimi.com 并登录，在新对话里加入公开报告。"
      ],
      "checkpoint": "标题、目录和至少一段原文可以与上传的报告对应。",
      "actionSteps": [
        "从附件入口选择报告，等待处理完成。",
        "请 Kimi 报出标题与目录，核对是否是这份文件。",
        "抽查一段原文；读错时换可读取材料再继续。"
      ],
      "visual": {
        "title": "上传后先确认读对了",
        "items": [
          {
            "title": "文件名",
            "text": "与你选择的报告一致"
          },
          {
            "title": "标题和目录",
            "text": "与原报告逐项对应"
          },
          {
            "title": "一段正文",
            "text": "扫描页也要抽查文字识别"
          }
        ]
      },
      "supplement": {
        "title": "先限定在文件阅读",
        "paragraphs": [
          "本课使用普通文件阅读，不混入研究或创作模式。不能根据文件名编写总结；扫描页识别失败时先处理材料。"
        ]
      }
    } },
  'grok-research': { productId: 'grok', platform: 'web', title: 'Grok 网页版：查一个话题，逐条打开来源', cover: ['看懂热门话题', '分清事实与观点'], intro: {
      "title": "从 grok.com 开始一次话题查询",
      "paragraphs": [
        "打开 grok.com 并登录，新建对话。本课使用独立网页入口。"
      ],
      "checkpoint": "至少有一条可打开的原始来源，能核对发布主体与日期。",
      "actionSteps": [
        "写明话题和起止日期，要求检索并附原始链接。",
        "确认这次是否执行了搜索；没有则只记为资料整理。"
      ],
      "visual": {
        "title": "看完回答，再打开来源",
        "items": [
          {
            "title": "明确时间",
            "text": "用起止日期替代“最近”"
          },
          {
            "title": "检查搜索",
            "text": "正文自称搜索不等于有检索证据"
          },
          {
            "title": "打开原链接",
            "text": "核对发布主体、日期和上下文"
          }
        ]
      },
      "supplement": {
        "title": "不同入口别混用",
        "paragraphs": [
          "本篇不照搬 X 内的菜单、订阅入口或第三方桌面软件操作。是否可搜索取决于实际功能与账号。"
        ]
      }
    } },
  'codex-web': { productId: 'codex', platform: 'desktop', title: 'Codex 桌面入口：做出第一个网页', cover: ['做出第一个网页', '从想法到可打开的页面'], sources: [sources.desktop], intro: { title: '在统一桌面应用里选择 Codex', paragraphs: ['打开新版 ChatGPT 桌面应用，选择 Codex，打开新建的练习文件夹，再用 New chat（新建聊天）开始任务。当前官方文档将 ChatGPT 与 Codex 放在同一桌面界面。', '这里的“网页”是你要做出的作品；本篇使用的是电脑上的 Codex 编程入口。浏览器里的 Codex 云端版需要仓库与云端环境，请另看云端教程。'], checkpoint: '新任务明确关联练习目录，显示的工作位置与电脑上的文件夹一致。' } },
  'claude-code-repo': { productId: 'claude-code', platform: 'terminal', title: 'Claude Code 终端版：读懂一个陌生项目', cover: ['读懂代码项目', '从终端找到项目入口'], intro: {
      "title": "进入项目目录，再启动 claude",
      "paragraphs": [
        "Windows 按下图逐步执行；已安装可跳过第一步。其他系统使用官方对应安装说明。"
      ],
      "checkpoint": "会话从正确目录启动，能读到该项目已有的 README。",
      "visual": {
        "title": "先安装，再从练习目录启动",
        "items": [
          {
            "title": "安装 · Windows",
            "text": "完成后重新打开终端",
            "code": "winget install Anthropic.ClaudeCode"
          },
          {
            "title": "确认目录",
            "text": "先进入练习项目，再查看当前位置",
            "code": "pwd"
          },
          {
            "title": "启动 Claude Code",
            "text": "首次启动按提示认证",
            "code": "claude"
          }
        ],
        "kind": "commands",
        "label": "命令步骤 · 非终端运行记录"
      },
      "supplement": {
        "title": "桌面窗口与终端别混用",
        "paragraphs": [
          "本课限定终端版，不是在 Claude Desktop 聊天框中运行命令。启动后先读取 CLAUDE.md、README 和构建配置。PowerShell 也可用 Get-Location 查看路径。"
        ]
      }
    } },
  'cursor-debug': { productId: 'cursor', platform: 'editor', tools: ['cursor'], title: 'Cursor 编辑器：定位并修复一次表单问题', cover: ['修好一个小问题', '选中代码，审查修改'], intro: {
      "title": "在 Cursor 打开文件夹和相关文件",
      "paragraphs": [
        "在 Cursor 打开练习文件夹，找到表单组件；先复现“输入空格仍能提交”。"
      ],
      "checkpoint": "聊天里引用的是实际表单文件，编辑器仍能看到原始代码与复现步骤。",
      "actionSteps": [
        "Ctrl+I 打开 Agent；macOS 使用 Cmd+I。",
        "选中校验函数，从上下文入口加入这段代码。",
        "先解释逻辑，需要修改时再选支持编辑的模式。"
      ],
      "visual": {
        "title": "围绕一个问题提供上下文",
        "items": [
          {
            "title": "实际表单文件",
            "text": "检查路径与当前项目一致"
          },
          {
            "title": "校验函数",
            "text": "选中与空格问题相关的代码"
          },
          {
            "title": "复现步骤",
            "text": "输入空格 → 点击保存 → 仍然提交"
          }
        ]
      },
      "supplement": {
        "title": "模式与权限",
        "paragraphs": [
          "模型选择不等于编辑权限。先确认问答还是修改模式，再决定是否让工具编辑。"
        ]
      }
    } },
  'cli-workflow': { productId: 'gemini-cli', platform: 'terminal', tools: ['gemini-cli'], title: 'Gemini CLI：启动终端会话，写项目说明', cover: ['开始终端协作', '用 Gemini 认识项目'], prerequisite: '准备测试项目，并按 Gemini CLI 官方文档完成安装与一种认证方式。该流程不适用于 Qwen Code。', intro: {
      "title": "运行 gemini，核对项目上下文",
      "paragraphs": [
        "已安装可以跳过第一步。启动前先进入练习项目文件夹。"
      ],
      "checkpoint": "终端中的会话能指向当前项目，说明里每条命令都有文件依据。",
      "visual": {
        "title": "Gemini CLI 的启动顺序",
        "items": [
          {
            "title": "安装 CLI",
            "text": "在终端执行，完成后核对是否可启动",
            "code": "npm install -g @google/gemini-cli"
          },
          {
            "title": "确认目录",
            "text": "路径应是本次练习项目",
            "code": "pwd"
          },
          {
            "title": "启动会话",
            "text": "首次启动按提示选择 Google 登录或其他认证",
            "code": "gemini"
          }
        ],
        "kind": "commands",
        "label": "命令步骤 · 非终端运行记录"
      },
      "supplement": {
        "title": "认证与项目说明",
        "paragraphs": [
          "部分账号还需配置 Google Cloud 项目，按官方认证文档处理。读取已有 GEMINI.md 和 README；要新增 GEMINI.md 时先审查草稿，不把推测命令写成事实。"
        ]
      }
    } },
};

export const chineseCovers = {
  'ai-first': ['第一次使用 AI', '提问、追问与核对'],
  'choose-model': ['软件和模型怎么分', '先看入口，再选能力'],
  'prompt-template': ['把需求说清楚', '写一份可复用提示词'],
  'workflow-basics': ['少做一点重复工作', '一步一步整理周报'],
  'compare-models': ['选出适合你的工具', '同一任务，实际比较'],
  'api-first': ['把模型接入应用', '认识请求与返回结果'],
};
