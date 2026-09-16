export const modelLessons = [
  {
    id: 'chatgpt-files', edited: '2026-09-16', title: '用 ChatGPT 整理文档，保留每条结论的出处', description: '从文件阅读到行动清单，减少遗漏和凭空补全。', category: 'models', level: '入门', minutes: 25, tools: ['chatgpt'], color: 'sage', cover: ['READ /', 'WITH CONTEXT'],
    goals: ['确定文件处理目标', '让输出保留引用位置', '检查遗漏与不确定内容'], prerequisite: '使用支持所需文件功能的 ChatGPT 入口，准备一份自己有权处理的示例文档。文件类型与大小限制以当前页面为准。',
    sections: [
      {
      "title": "先给阅读设定问题",
      "paragraphs": [
        "先写清三个阅读问题，例如：决定了什么、谁负责、何时完成。"
      ],
      "actionSteps": [
        "抽查一段正文，确认扫描页或表格被正确读取。",
        "读错时换可读取的材料，再继续提问。"
      ]
    },
      {
      "title": "先提取，再归纳",
      "paragraphs": [
        "复制下方提示词：先列原文依据，再整理行动项。"
      ],
      "prompt": "请阅读这份文档，整理与项目交付相关的信息。\n先列出“事实、原文摘录、章节或页码”表格。\n再根据表格生成行动清单。\n缺失的时间和负责人写“未明确”。\n无法定位出处的信息请单独列为待核对。",
      "visual": {
        "title": "每条结论留一条回路",
        "items": [
          {
            "title": "原文片段",
            "icon": "file",
            "text": "先保留原句"
          },
          {
            "title": "章节或页码",
            "icon": "search",
            "text": "标出材料中的位置"
          },
          {
            "title": "行动项",
            "icon": "check",
            "text": "负责人和时间缺失就写“未明确”"
          }
        ],
        "label": "整理结构示意 · 非产品实测"
      }
    },
      {
      "title": "回到原文检查",
      "paragraphs": [
        "打开原文，抽查三条重要结论；同时核对章节标题和引用文字。"
      ],
      "actionSteps": [
        "数字自己复算，不能只看回答语气。",
        "保存文档版本与已核对结果。"
      ],
      "supplement": {
        "title": "页码对不上",
        "paragraphs": [
          "文件解析可能改变页码。优先用章节标题与短摘录定位，无法对应的结论先标为待核对。"
        ]
      }
    },
    ], exercises: ['给文档写出三个阅读问题', '生成包含出处的事实表', '抽查至少三条引用并修正错误'], takeaway: '文档摘要的价值不仅在短，还在于可以追溯。',
  },
  {
    id: 'claude-writing', edited: '2026-09-16', title: '用 Claude 修改长文：保留观点，改善表达', description: '从写作要求、修改建议到逐段验收，掌握可控的协作方式。', category: 'models', level: '入门', minutes: 25, tools: ['claude'], color: 'peach', cover: ['DRAFT / EDIT', 'KEEP YOUR VOICE'],
    goals: ['提供明确的编辑标准', '按段落控制改动', '检查修改有没有改变事实'], prerequisite: '准备一篇自己写的短文和目标读者说明。使用你可访问的官方 Claude 产品。',
    sections: [
      {
      "title": "把“写好一点”变成具体要求",
      "paragraphs": [
        "补一句编辑要求：写给谁看、希望读懂什么、哪些事实不能改。"
      ],
      "visual": {
        "title": "把模糊要求改具体",
        "items": [
          {
            "title": "过于笼统",
            "text": "帮我写得专业一点"
          },
          {
            "title": "可以核对",
            "text": "面向新手，用短句，不增加原文没有的数据"
          }
        ],
        "kind": "compare",
        "label": "核对示例 · 非产品实测"
      }
    },
      {
      "title": "先审查，再逐段修改",
      "paragraphs": [
        "先用下方提示词审查。确认建议后，只改开头和一个关键段落，再决定是否继续。"
      ],
      "prompt": "请作为编辑检查以下文章。\n目标读者：第一次接触这个主题的人。\n先指出结构、重复表达和解释不清的地方，暂不重写全文。\n修改时保留我的主要观点、事实和引用，不新增数据。\n请按“原句、建议改写、原因”输出。"
    },
      {
      "title": "用差异审查确认结果",
      "paragraphs": [
        "对照原稿，检查数字、人名、因果和语气。"
      ],
      "visual": {
        "title": "语句通顺，也要保留原意",
        "items": [
          {
            "title": "原文",
            "text": "“可能改善”，仍有不确定性"
          },
          {
            "title": "需要退回的改写",
            "text": "“一定改善”，擅自提高了确定性"
          }
        ],
        "kind": "compare",
        "label": "核对示例 · 非产品实测"
      },
      "supplement": {
        "title": "下次怎么复用",
        "paragraphs": [
          "只保存通用的表达规则，不把这一篇文章的所有上下文都塞进模板。"
        ]
      }
    },
    ], exercises: ['写出受众、目的和必须保留的内容', '让 Claude 先提出建议，再改一个段落', '检查修改前后的事实与语气差异'], takeaway: '让 AI 帮你表达观点，也要保留你对内容的判断。',
  },
  {
    id: 'gemini-research', edited: '2026-09-16', title: '用 Gemini 做资料研究：结论与来源一起整理', description: '先定义问题，再组织材料，区分来源事实与模型推断。', category: 'models', level: '进阶', minutes: 30, tools: ['gemini'], color: 'blue', cover: ['WHY / HOW', 'RESEARCH NOTES'],
    goals: ['把研究范围限定清楚', '建立来源与结论对应表', '保留尚未解决的问题'], prerequisite: '准备一个具体研究问题与两份公开材料。所用入口是否支持搜索或文件，以当前产品为准。',
    sections: [
      {
      "title": "给问题加边界",
      "paragraphs": [
        "只研究一个决定，例如“两种工具如何整理会议记录”。补上时间范围和使用场景。"
      ]
    },
      {
      "title": "分别处理资料和推断",
      "paragraphs": [
        "发送下方提示词，分开记录共同事实、分歧和资料不足。"
      ],
      "prompt": "根据以下两份资料回答我的研究问题。\n输出三部分：\n1. 两份资料一致的事实，逐条给出来源。\n2. 存在分歧的观点，分别说明谁提出。\n3. 资料不足以回答的问题。\n不要把你的推断写成来源中的原话。",
      "visual": {
        "title": "让结论跟着证据走",
        "items": [
          {
            "title": "共同事实",
            "icon": "check",
            "text": "A 和 B 都支持什么"
          },
          {
            "title": "存在分歧",
            "icon": "compare",
            "text": "分别是哪份资料的观点"
          },
          {
            "title": "尚未确定",
            "icon": "search",
            "text": "当前材料不能回答什么"
          }
        ],
        "label": "输出结构示意 · 非产品实测"
      },
      "supplement": {
        "title": "启用了搜索时",
        "paragraphs": [
          "保存链接与发布或更新日期，打开原文确认。未搜索时，仅基于提供的材料得出结论。"
        ]
      }
    },
      {
      "title": "检查时间和证据强度",
      "paragraphs": [
        "打开三个关键来源，核对日期和原文。价格、产品能力等易变信息优先看官方当前页面。"
      ],
      "actionSteps": [
        "在结论旁写明适用任务与条件。",
        "把不确定项和重要链接一起保存。"
      ]
    },
    ], exercises: ['写出有时间与场景范围的研究问题', '建立事实、来源、日期对应表', '打开三个关键来源检查结论'], takeaway: '研究结果应当让读者知道结论从哪里来、适用到哪里。',
  },
  {
    id: 'deepseek-reasoning', edited: '2026-09-16', title: '用 DeepSeek 分析问题，再独立检查答案', description: '拆解预算和条件问题，让最终结论能通过简单计算验证。', category: 'models', level: '入门', minutes: 20, tools: ['deepseek'], color: 'blue', cover: ['IF → THEN', 'CHECK THE ANSWER'],
    goals: ['明确已知条件和未知项', '建立计算或逻辑检查点', '发现条件变化对结论的影响'], prerequisite: '准备一道自己能够验算的小问题，例如活动预算。',
    sections: [
      {
      "title": "列出条件，不让模型补设定",
      "paragraphs": [
        "分开写预算、人数和单价，保留单位。没给出的税费或交通费，先列为缺失项。"
      ]
    },
      {
      "title": "要求可核对的结论",
      "paragraphs": [
        "发送下方题目，让答案包含费用表和简短算式。解释长短不作为正确依据。"
      ],
      "prompt": "帮我检查一份活动预算。\n总预算 1200 元，场地 300 元，材料每人 25 元，参加人数 20 人。\n请列出各项费用、合计、剩余预算，并写出简短计算式。\n不要添加未提供的项目。\n如果人数增加到 30 人，预算是否仍足够？"
    },
      {
      "title": "改变一个条件重新检查",
      "paragraphs": [
        "独立算一遍，再与回答比较。只把人数从 20 改为 30，观察结果是否跟着变化。"
      ],
      "visual": {
        "title": "两种人数，核对同一公式",
        "items": [
          {
            "title": "20 人",
            "text": "300 + 25 × 20 = 800 元；剩余 400 元"
          },
          {
            "title": "30 人",
            "text": "300 + 25 × 30 = 1050 元；剩余 150 元"
          }
        ],
        "kind": "compare",
        "label": "人工验算示例 · 非产品实测"
      },
      "checkpoint": "两个合计都一致；不一致时指出具体数值并重新核对。"
    },
    ], exercises: ['输入完整预算条件', '独立验算两种人数下的结果', '补充一个缺失条件并观察答案如何变化'], takeaway: '把答案变成可以验证的数值或条件，比观察推理文字的长度更有用。',
  },
  {
    id: 'qwen-structured', edited: '2026-09-16', title: '用 Qwen 把零散文本整理成 JSON', description: '明确字段和缺失值，为表格处理与应用接入做准备。', category: 'models', level: '进阶', minutes: 25, tools: ['qwen'], color: 'lilac', cover: ['{ ... }', 'MAKE IT STRUCTURED'],
    goals: ['设计最小输出结构', '约定缺失值与数据类型', '检查 JSON 是否能被程序读取'], prerequisite: '了解 JSON 的对象、数组、字符串和数值。准备一段产品描述。',
    sections: [
      {
      "title": "先决定字段与类型",
      "paragraphs": [
        "先约定字段类型。缺少价格写 null；币种单独记录，不能把“89 元”当数字。"
      ],
      "visual": {
        "title": "一条商品，四类字段",
        "items": [
          {
            "title": "name / tags",
            "icon": "file",
            "text": "名称是字符串；标签是字符串数组"
          },
          {
            "title": "price",
            "icon": "file",
            "text": "数字，缺失时为 null"
          },
          {
            "title": "currency",
            "icon": "globe",
            "text": "币种，缺失时为 null"
          }
        ],
        "label": "字段示意 · 非软件截图"
      }
    },
      {
      "title": "给出输出约定",
      "paragraphs": [
        "复制提示词，核对返回字段。下方 JSON 是人工输出示例。"
      ],
      "prompt": "从产品描述中提取 JSON，只输出一个对象。\n字段：name（字符串）、price（数字或 null）、currency（字符串或 null）、tags（字符串数组）。\n只提取原文已有信息，缺失值用 null，缺少标签用 []。\n产品描述：便携阅读灯，价格 89 元，支持充电和三档亮度。",
      "code": "{\n  \"name\": \"便携阅读灯\",\n  \"price\": 89,\n  \"currency\": \"CNY\",\n  \"tags\": [\"充电\", \"三档亮度\"]\n}",
      "language": "输出示例",
      "supplement": {
        "title": "以后接 API 时",
        "paragraphs": [
          "核对当前模型是否支持结构化输出；无论采用哪种方式，都要在程序端校验。"
        ]
      }
    },
      {
      "title": "校验语法和业务含义",
      "paragraphs": [
        "先用 JSON.parse 检查语法，再核对字段类型和原文。"
      ],
      "actionSteps": [
        "用没有价格的描述再测一次，应返回 null。",
        "价格不能猜，格式通过也不代表事实正确。"
      ]
    },
    ], exercises: ['设计一个四字段的 JSON 结构', '测试正常文本和缺失价格文本', '核对字段类型与原文数据'], takeaway: '格式可读取只是第一步，字段还必须符合事实和业务规则。',
  },
  {
    id: 'kimi-documents', edited: '2026-09-16', title: '用 Kimi 阅读报告，建立自己的资料索引', description: '按问题提取报告内容，把章节、证据和疑问留下来。', category: 'models', level: '入门', minutes: 25, tools: ['kimi'], color: 'ink', cover: ['PAGE / NOTE', 'READ WITH PURPOSE'],
    goals: ['建立报告章节索引', '按问题提取原文依据', '区分原文结论与个人笔记'], prerequisite: '准备一份可公开阅读的报告。若产品未提供所需文件功能，可粘贴你有权使用的文本片段练习。',
    sections: [
      {
      "title": "从目录建立地图",
      "paragraphs": [
        "给报告留一张来源卡，再整理每章主题，便于以后返回。"
      ],
      "visual": {
        "title": "一份报告，一张来源卡",
        "items": [
          {
            "title": "标题与作者",
            "icon": "file",
            "text": "记录报告名、作者或机构"
          },
          {
            "title": "日期与版本",
            "icon": "file",
            "text": "没有发布日期就写“未提供”"
          },
          {
            "title": "来源地址",
            "icon": "link",
            "text": "以后能回到原文件"
          }
        ],
        "label": "来源记录示意 · 非产品实测"
      }
    },
      {
      "title": "带着问题抽取证据",
      "paragraphs": [
        "先提 3—5 个具体问题，再用下方提示词抽取短摘录和章节位置。"
      ],
      "prompt": "请根据这份报告建立阅读笔记。\n先列出章节索引。\n针对我的问题，按“问题、原文结论、短摘录、章节位置”整理。\n报告未回答的部分写“材料未提供”。\n最后列出值得继续查找的三个问题。"
    },
      {
      "title": "把索引保存为可复用笔记",
      "paragraphs": [
        "打开对应章节，确认摘录确实支持结论。把事实、自己的解释和后续问题分开保存。"
      ],
      "supplement": {
        "title": "新增材料与冲突",
        "paragraphs": [
          "补充资料时保留日期和版本。来源冲突单独列出，不强行合并成确定结论。"
        ]
      }
    },
    ], exercises: ['为一份报告建立来源记录', '整理三个带章节位置的问题答案', '核对引用并保存阅读笔记'], takeaway: '好的阅读笔记能帮助你以后快速返回证据所在的位置。',
  },
  {
    id: 'grok-research', edited: '2026-09-16', title: '用 Grok 整理话题：分清事实、观点和时间', description: '给信息查询加上范围，避免把热度和事实混在一起。', category: 'models', level: '入门', minutes: 20, tools: ['grok'], color: 'ink', cover: ['NOW / THEN', 'FOLLOW THE SOURCE'],
    goals: ['限定信息的时间范围', '区分事件与评论', '回到原始来源核对'], prerequisite: '准备一个公开话题。是否可搜索实时内容取决于当前产品入口和账号功能。',
    sections: [
      {
      "title": "把“最近”换成明确日期",
      "paragraphs": [
        "把“最近有什么变化”改为“在指定起止日期内，某软件有哪些官方更新”。"
      ]
    },
      {
      "title": "把事实与讨论分开",
      "paragraphs": [
        "复制下方模板，先填好自己的起止日期和话题，再发送。"
      ],
      "prompt": "请围绕我的话题整理资料。\n时间范围：由我提供明确起止日期。\n分别列出官方事实、第三方报道、用户观点。\n每条保留来源链接与时间。\n无法核实或存在分歧的内容单独列出，不写成确定事实。",
      "visual": {
        "title": "资料分成三栏",
        "items": [
          {
            "title": "官方事实",
            "icon": "check",
            "text": "保留原公告与日期"
          },
          {
            "title": "第三方报道",
            "icon": "link",
            "text": "标出报道者和引用依据"
          },
          {
            "title": "用户观点",
            "icon": "message",
            "text": "保留观点归属，不当成已证实事实"
          }
        ],
        "label": "资料分类示意 · 非产品实测"
      }
    },
      {
      "title": "检查重要结论的原始材料",
      "paragraphs": [
        "逐条打开关键链接，核对原文是否支持当前结论。“官方宣布”也要找到原公告。"
      ],
      "supplement": {
        "title": "用于选择工具时",
        "paragraphs": [
          "讨论热度不代表适合自己的工作。再用一个小任务实测，记录实际结果。"
        ]
      }
    },
    ], exercises: ['设定一个明确的查询日期范围', '将五条信息按事实和观点分类', '打开原始来源核对关键结论'], takeaway: '信息的新旧、来源和类型，会直接影响它能否支持你的决定。',
  },
];
