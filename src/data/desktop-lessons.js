import { officialSources as sources } from './products.js';

export const desktopLessons = [
  {
    id: 'chatgpt-desktop-start', edited: '2026-09-16', title: 'ChatGPT 桌面版：认识聊天、工作与 Codex', description: '从安装和选择工作位置开始，在同一个应用中找到正确模式。', category: 'models', platform: 'desktop', productId: 'chatgpt-desktop', level: '入门', minutes: 25, tools: ['chatgpt-desktop'], color: 'sage', cover: ['桌面版入门', '选对模式，再开始'], sources: [sources.desktop],
    goals: ['认出 ChatGPT 和 Codex 的统一桌面入口', '区分聊天、工作与编程任务', '在练习位置创建并打开一份文件'], prerequisite: '从本文官方资料打开桌面下载页，选择与你的系统匹配的版本。准备一个仅含练习材料的文件夹。',
    sections: [
      {
      "title": "安装应用，用 ChatGPT 账号登录",
      "paragraphs": ["先准备与你的电脑系统匹配的官方桌面应用。"],
      "checkpoint": "应用已打开，能看到聊天或项目入口。安装完成不等于已经订阅付费功能。",
      "actionSteps": [
        "从官方页面选择与电脑系统匹配的 ChatGPT 安装包。",
        "安装后打开应用，用 ChatGPT 账号登录。",
        "确认能看到聊天或项目入口。"
      ],
      "visual": {
        "title": "安装与登录",
        "items": [
          {
            "title": "选择系统",
            "text": "Windows / macOS / Linux 按官方要求"
          },
          {
            "title": "启动应用",
            "text": "从开始菜单或应用目录打开"
          },
          {
            "title": "登录账号",
            "text": "安装成功不等于获得付费权益"
          }
        ]
      },
      "supplement": {
        "title": "旧快捷方式为什么还叫 Codex",
        "paragraphs": [
          "当前官方说明将桌面入口称为 ChatGPT desktop app。旧版本、安装文件或快捷方式中可能仍显示 Codex；先核对应用与版本，无需因名称不同重复购买或安装。"
        ]
      }
    },
      {
      "title": "先选 ChatGPT，再选聊天或工作",
      "paragraphs": [
        "今天整理文档，先选择 ChatGPT → Work（工作）；下一篇做网页时再选 Codex。"
      ],
      "checkpoint": "在输入任务前，能说出自己选中了哪种模式。",
      "visual": {
        "title": "按任务选入口",
        "items": [
          {
            "title": "Chat · 聊天",
            "text": "提问、解释、讨论"
          },
          {
            "title": "Work · 工作",
            "text": "处理材料、生成文档"
          },
          {
            "title": "Codex · 编程",
            "text": "读取项目、修改代码、运行检查"
          }
        ]
      }
    },
      {
      "title": "选择练习位置，生成一份工作记录",
      "paragraphs": [
        "只提供练习材料；授权前核对目录范围。"
      ],
      "prompt": "请把练习材料整理为“本周工作清单.md”。\n分为已完成、进行中和待确认。\n保留原始日期，不添加材料中没有的成果。\n把结果作为新文件保存到当前练习位置，完成后打开文件让我检查。",
      "checkpoint": "完成后能打开实际文件，确认位置、文件名和正文。",
      "actionSteps": [
        "打开练习文件夹，检查显示的路径。",
        "加入一份虚构工作记录，发送下方任务。",
        "等待生成文件，再实际打开。"
      ],
      "visual": {
        "title": "材料与结果放在同一练习位置",
        "items": [
          {
            "title": "练习文件夹",
            "text": "先确认路径与授权范围"
          },
          {
            "title": "虚构工作记录",
            "text": "作为本次输入材料"
          },
          {
            "title": "本周工作清单.md",
            "text": "新建文件，保留原记录"
          }
        ],
        "kind": "files",
        "label": "文件关系示意 · 非生成结果"
      }
    },
      {
      "title": "在预览中检查，再做一次局部修改",
      "paragraphs": [
        "先核对文件名和正文，再要求只修正一个段落。修改后重新打开文件。"
      ],
      "screenshot": {
        "src": "tutorials/visual-guide/chatgpt-desktop.webp",
        "alt": "ChatGPT 官方结果示例：左侧文件卡片，右侧表格预览",
        "width": 1540,
        "height": 988,
        "sourceUrl": "https://learn.chatgpt.com/codex/use-chatgpt",
        "caption": "OpenAI 官方表格任务示例 · 2026-09-16 获取，非本课实测；本课检查自己生成的工作清单。",
        "markers": [
          {
            "x": 16,
            "y": 46,
            "title": "结果文件",
            "description": "先核对文件名。"
          },
          {
            "x": 67,
            "y": 31,
            "title": "文件预览",
            "description": "逐项与原文对照。"
          }
        ]
      },
      "supplement": {
        "title": "在线预览与本地保存",
        "paragraphs": [
          "官网示例展示表格，本课生成的是工作清单。网页预览、下载文件与电脑目录保存需要分别确认。"
        ]
      }
    },
    ], exercises: ['找到 ChatGPT、聊天／工作和 Codex 的入口', '在练习位置生成并打开一份文档', '完成一次局部修改并核对文件'], takeaway: '同一个桌面应用里，任务模式决定怎么做事；模型选项决定由哪个模型处理。',
  },
  {
    id: 'claude-desktop-start', edited: '2026-09-16', title: 'Claude Desktop：安装电脑软件，认清三个入口', description: '从下载、登录到聊天、Cowork、Code，先认识自己面前的软件。', category: 'models', platform: 'desktop', productId: 'claude-desktop', level: '入门', minutes: 20, tools: ['claude-desktop'], color: 'peach', cover: ['Claude 桌面版', '安装、登录与入口'], sources: [sources.claudeDesktop, sources.cowork],
    goals: ['从官方页面安装对应系统版本', '分清聊天、Cowork 与 Code', '找到桌面扩展设置并理解权限'], prerequisite: '一台符合官方下载页面系统要求的电脑和 Claude 账号。本篇先学习聊天与设置，Cowork、Code 的可用性需看账号权益。',
    sections: [
      {
      "title": "下载与电脑系统一致的版本",
      "paragraphs": ["先安装独立桌面应用，再开始本课的聊天练习。"],
      "checkpoint": "打开的是独立 Claude 应用窗口，不是浏览器里的 claude.ai 标签页。",
      "actionSteps": [
        "打开 claude.ai/download，选择电脑对应的系统版本。",
        "安装并启动 Claude，用自己的账号登录。",
        "确认打开的是独立应用窗口。"
      ],
      "visual": {
        "title": "从安装到首次问答",
        "items": [
          {
            "title": "官方安装包",
            "text": "系统与架构按下载页选择"
          },
          {
            "title": "Claude 桌面应用",
            "text": "从开始菜单或应用目录启动"
          },
          {
            "title": "Chat · 聊天",
            "text": "登录后先做一次小问答"
          }
        ]
      },
      "supplement": {
        "title": "Linux 与 Claude Code",
        "paragraphs": [
          "Linux 按官方单独安装说明选择架构。本课不是终端里的 claude 命令；Claude Code 终端操作另有教程。"
        ]
      }
    },
      {
      "title": "先从聊天入口完成一次问答",
      "paragraphs": [
        "选择 Chat（聊天），发送下方通知整理任务。本次无需连接文件夹。"
      ],
      "prompt": "请把这段通知压缩成三条要点，不添加新信息：\n周五下午三点在会议室讨论秋游。活动日期尚未决定，参加者需要提前准备一个场地建议。",
      "checkpoint": "得到时间、地点和准备事项，活动日期仍然标为未确定。",
      "visual": {
        "title": "这三个入口怎么选",
        "items": [
          {
            "title": "Chat",
            "text": "问答与短文整理"
          },
          {
            "title": "Cowork",
            "text": "处理多步骤工作"
          },
          {
            "title": "Code",
            "text": "操作代码项目"
          }
        ],
        "label": "功能关系示意 · 非软件截图"
      },
      "supplement": {
        "title": "找不到入口时",
        "paragraphs": [
          "入口与套餐、组织设置和应用版本有关。先检查账号与官方说明，不把缺少工作模式直接当成安装失败。"
        ]
      }
    },
      {
      "title": "查看扩展设置，认识桌面端的连接能力",
      "paragraphs": [
        "打开设置，找到 Extensions（扩展），先查看说明，无需安装。"
      ],
      "checkpoint": "能区分手动附件、桌面扩展和 Cowork 连接文件夹这三种提供材料的方式。",
      "visual": {
        "title": "提供材料的范围不同",
        "items": [
          {
            "title": "手动附件",
            "text": "只加入你选择的材料"
          },
          {
            "title": "扩展或连接",
            "text": "可能访问授予权限的资源，先读用途"
          }
        ],
        "kind": "compare",
        "label": "权限范围示意 · 非设置截图"
      }
    },
    ], exercises: ['安装并登录官方 Claude Desktop', '在聊天模式完成一次通知整理', '找到扩展说明并说出聊天与 Cowork 的区别'], takeaway: '先认清软件和入口，后续的文件协作、编程与模型设置就不会混在一起。',
  },
  {
    id: 'claude-cowork-desktop', edited: '2026-09-16', title: 'Claude Cowork 桌面端：整理一个练习文件夹', description: '选择任务模式，连接一小份材料，再检查整理后的真实文件。', category: 'automation', platform: 'desktop', productId: 'claude-cowork', level: '入门', minutes: 30, tools: ['claude-cowork'], color: 'peach', cover: ['电脑文件整理', '用 Cowork 完成任务'], sources: [sources.cowork],
    goals: ['在桌面应用选择 Cowork', '明确允许访问的练习文件夹', '检查输出文件与原始资料的关系'], prerequisite: '已安装最新版 Claude Desktop，账号可使用 Cowork。新建一个练习文件夹，放入三份公开或虚构的短文本，不使用真实重要目录。',
    sections: [
      {
      "title": "在首页选择 Cowork",
      "paragraphs": [
        "打开 Claude Desktop，在首页输入框左下角选择 Cowork（工作协作）。"
      ],
      "checkpoint": "输入框已选择 Cowork，任务将作为工作会话开始。",
      "visual": {
        "title": "先选模式，再发任务",
        "items": [
          {
            "title": "首页输入框",
            "text": "查看当前任务模式"
          },
          {
            "title": "Cowork",
            "text": "确认已从 Chat 切换"
          },
          {
            "title": "工作会话",
            "text": "下一步再连接练习文件夹"
          }
        ]
      },
      "supplement": {
        "title": "账号没有 Cowork",
        "paragraphs": [
          "先更新应用并检查账号套餐、组织设置。官方列出的 Pro、Max、Team 等权益与 Enterprise 管理员开关，以当前账号说明为准；普通聊天可用不代表 Cowork 可用。"
        ]
      }
    },
      {
      "title": "连接练习材料，先让它列出文件",
      "paragraphs": [
        "只连接练习文件夹。先发下方只读任务，用文件清单确认范围。"
      ],
      "prompt": "请只读取已连接的练习文件夹，列出文件名、内容主题和是否有重复。\n先不要改名、移动或覆盖任何文件。\n告诉我你准备如何整理，并列出需要我确认的缺失信息。",
      "checkpoint": "列出的文件与练习文件夹相符，没有读到其他目录。",
      "visual": {
        "title": "先确认输入范围",
        "items": [
          {
            "title": "练习文件夹",
            "text": "只放三份公开或虚构短文本"
          },
          {
            "title": "只读清单",
            "text": "列出文件名、主题和重复项"
          },
          {
            "title": "确认后继续",
            "text": "不改名、不移动、不覆盖"
          }
        ],
        "kind": "files",
        "label": "文件范围示意 · 非产品实测"
      },
      "supplement": {
        "title": "关机后还能访问本地文件吗",
        "paragraphs": [
          "云端会话持续运行，不等于还能访问离线电脑。本地文件访问仍需桌面应用在线、会话起于桌面且文件夹已连接。"
        ]
      }
    },
      {
      "title": "生成一份索引，保留原文件",
      "paragraphs": [
        "确认清单后，发送下方任务，只新增资料索引。完成后在实际目录打开它。"
      ],
      "prompt": "按已确认的清单，新建“资料索引.md”。\n包含文件名、主题、关键事项和原文位置。\n保留原文件，缺失信息写“未提供”。\n完成后列出新建文件的实际位置，并打开结果供检查。",
      "checkpoint": "索引文件真实存在；抽查三条来源，缺失日期仍写“未提供”。",
      "visual": {
        "title": "这次只增加一个文件",
        "items": [
          {
            "title": "原文件",
            "text": "三份练习材料全部保留"
          },
          {
            "title": "新文件",
            "text": "资料索引.md：文件名、主题、事项、原文位置"
          }
        ],
        "kind": "compare",
        "label": "预期文件变化 · 非生成结果"
      }
    },
    ], exercises: ['在桌面首页选择 Cowork 并连接练习材料', '核对只读文件清单', '打开新增索引并抽查三条来源'], takeaway: '桌面端学习重点是文件范围和实际输出，而不仅是聊天框里出现一份答案。',
  },
  {
    id: 'claude-cowork-web', edited: '2026-09-16', title: 'Claude Cowork 网页端：用上传材料生成文档', description: '通过浏览器发起云端任务，预览和下载成果，理解本地文件条件。', category: 'automation', platform: 'web', productId: 'claude-cowork', level: '入门', minutes: 25, tools: ['claude-cowork'], color: 'peach', cover: ['网页工作协作', '上传材料，下载成果'], sources: [sources.cowork],
    goals: ['从网页首页切换 Cowork', '为云端任务提供两份附件', '预览下载成果并找回会话'], prerequisite: '可访问 claude.ai，账号已获得网页 Cowork 功能。准备两份公开活动方案；网页功能的测试版范围和组织开关以账号页面为准。',
    sections: [
      {
      "title": "在浏览器的首页开始工作会话",
      "paragraphs": [
        "打开 claude.ai 的 Home（首页），在输入框左下角选择 Cowork。"
      ],
      "visual": {
        "title": "网页和桌面，材料入口不同",
        "items": [
          {
            "title": "本篇：网页",
            "text": "上传两份附件，在云端处理"
          },
          {
            "title": "桌面文件夹",
            "text": "另需桌面应用与已连接目录"
          }
        ],
        "kind": "compare",
        "label": "操作入口对照 · 非界面截图"
      },
      "supplement": {
        "title": "没有网页 Cowork 时",
        "paragraphs": [
          "网页功能的测试范围和组织开关以账号页面为准。可以先学 Claude 网页聊天，但普通聊天不记为已完成本课工作会话。"
        ]
      }
    },
      {
      "title": "上传方案，指定交付文档",
      "paragraphs": [
        "从附件入口加入两份方案，等文件名都显示后，再发送下方任务。"
      ],
      "prompt": "请比较上传的两份活动方案，生成一份方案对照文档。\n字段：场地、人数、已知费用、缺失信息。\n每项注明来自哪份材料。\n不要替我做报名或付款操作。",
      "checkpoint": "任务中能看到附件与处理过程，结果提供可打开的文档。",
      "visual": {
        "title": "要交付一份能打开的文档",
        "items": [
          {
            "title": "方案 A + B",
            "text": "两份附件均上传完成"
          },
          {
            "title": "对照文档",
            "text": "场地、人数、费用和缺失信息"
          },
          {
            "title": "原文依据",
            "text": "每项都标明来自哪份方案"
          }
        ]
      },
      "supplement": {
        "title": "不能直接发本地路径",
        "paragraphs": [
          "把电脑文件夹路径粘贴到网页里，并不会自动上传材料。本篇使用已上传附件，不依赖本地目录连接。"
        ]
      }
    },
      {
      "title": "预览、下载，再从历史记录找回",
      "paragraphs": ["在线预览之后，还要检查下载到电脑的实际文件。"],
      "checkpoint": "本地能够打开下载文档，也能从同一账号的历史中重新进入会话。",
      "actionSteps": [
        "在线预览，核对表格和来源。",
        "下载后从电脑下载目录实际打开。",
        "在同一账号的历史记录中找回会话。"
      ],
      "visual": {
        "title": "保存要经过这三步",
        "items": [
          {
            "title": "预览",
            "text": "看清文档内容"
          },
          {
            "title": "下载并打开",
            "text": "确认文件已在电脑上"
          },
          {
            "title": "找回会话",
            "text": "后续修改还能继续"
          }
        ]
      },
      "supplement": {
        "title": "跨设备与本地工具",
        "paragraphs": [
          "云端会话可跨设备延续。本地文件或电脑工具仍可能要求在线的 Claude Desktop、起于桌面的会话和已连接文件夹。"
        ]
      }
    },
    ], exercises: ['从网页首页选择 Cowork', '上传两份材料并获得对照文档', '预览下载成果并重新找到会话'], takeaway: '网页教程要教会上传、云端任务和下载，不能照搬桌面文件夹操作。',
  },
];
