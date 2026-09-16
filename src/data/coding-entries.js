import { officialSources as sources } from './products.js';

export const codingEntries = [
  {
    id: 'codex-cloud-start', edited: '2026-09-16', title: 'Codex 云端网页版：连接仓库，完成一次小改动', description: '从选择仓库和环境开始，检查云端结果与本地项目的区别。', category: 'coding', platform: 'web', productId: 'codex-cloud', tools: ['codex-cloud'], level: '进阶', minutes: 30, color: 'peach', cover: ['在云端修改项目', '连接仓库，检查差异'], sources: [sources.cloud],
    goals: ['为练习仓库创建云端环境', '发起一项可检查的文档修改', '区分云端差异、合并与本地同步'], prerequisite: '一个你有权访问的练习 Git 仓库与可用的 Codex 账号。本教程涉及仓库授权，请只选这次练习需要的仓库。',
    sections: [
      {
      "title": "从网页连接练习仓库",
      "paragraphs": [
        "打开 chatgpt.com/codex，用 ChatGPT 账号登录。按页面支持的 GitHub 或 GitLab（Beta）入口连接练习仓库。"
      ],
      "checkpoint": "页面显示的是目标练习仓库，授权范围与选择相符。",
      "actionSteps": [
        "只选择自己有权访问的练习仓库。",
        "确认页面上的仓库名与授权范围。"
      ],
      "visual": {
        "title": "云端读取的是远程仓库",
        "items": [
          {
            "title": "远程练习仓库",
            "text": "练习代码已在仓库里"
          },
          {
            "title": "选择授权范围",
            "text": "只连接本次需要的仓库"
          },
          {
            "title": "Codex 云端",
            "text": "不能直接读取电脑上未上传的文件"
          }
        ]
      }
    },
      {
      "title": "创建环境，核对运行条件",
      "paragraphs": [
        "为选中的仓库创建环境，按 README 设置必要依赖和启动准备。本次只改文档，用最小配置即可。"
      ],
      "visual": {
        "title": "环境设置看哪里",
        "items": [
          {
            "title": "README",
            "text": "找到项目运行要求"
          },
          {
            "title": "构建配置",
            "text": "核对工具与依赖"
          },
          {
            "title": "练习数据",
            "text": "不把本地密钥粘贴进任务"
          }
        ]
      },
      "supplement": {
        "title": "确实需要密钥时",
        "paragraphs": [
          "使用平台专门的安全配置入口。第一次练习优先选不含秘密的数据。"
        ]
      }
    },
      {
      "title": "选择环境，发起说明文档任务",
      "paragraphs": [
        "选中正确环境和仓库，发送下方文档任务；在日志中核对实际读取的文件。"
      ],
      "prompt": "请阅读这个练习仓库的 README 和构建配置。\n仅补充一段有文件依据的本地运行说明。\n不修改业务代码，不猜测命令。\n完成后列出变更文件、差异和未确认事项。",
      "checkpoint": "结果中只有计划内文档变化，每条命令都可在仓库配置中找到依据。"
    },
      {
      "title": "审查云端差异，决定下一步",
      "paragraphs": [
        "打开 summary（摘要）和 diff（修改差异），逐行检查。需要调整时继续追问。"
      ],
      "visual": {
        "title": "完成状态不能跳过",
        "items": [
          {
            "title": "云端任务完成",
            "text": "本篇只验收到检查差异"
          },
          {
            "title": "创建与合并请求",
            "text": "另按项目正常流程处理"
          },
          {
            "title": "本地同步",
            "text": "合入后仍需拉取，电脑文件才更新"
          }
        ]
      },
      "checkpoint": "能解释云端变更、本地文件和合并状态的区别。"
    },
    ], exercises: ['为练习仓库选择或创建云端环境', '完成一次仅涉及说明文档的任务', '阅读差异并说明本地是否已同步'], takeaway: '云端教程的核心是仓库、环境和差异，桌面文件夹步骤不能直接照搬。',
  },
  {
    id: 'codex-cli-start', edited: '2026-09-16', title: 'Codex CLI：从终端启动一次项目阅读', description: '进入正确目录，用 codex 开始，核对运行说明与已有文件。', category: 'coding', platform: 'terminal', productId: 'codex-cli', tools: ['codex-cli'], level: '进阶', minutes: 25, color: 'peach', cover: ['在终端使用 Codex', '先确认目录，再执行'],
    goals: ['按 CLI 文档完成安装认证', '从练习目录启动 codex', '得到有文件依据的项目地图'], prerequisite: '能使用终端，按官方 CLI 文档完成系统对应的安装与认证。本篇不要求在桌面应用中新建项目，也不使用云端仓库环境。',
    sections: [
      {
      "title": "先核对位置和 CLI 是否可用",
      "paragraphs": [
        "先从官方 CLI 安装页选择自己的系统或 npm 标签，按该标签安装；不要把其他系统的命令直接照搬过来。"
      ],
      "checkpoint": "版本命令有返回，codex 在目标目录中打开交互会话。",
      "visual": {
        "title": "安装完成后，逐条检查",
        "items": [
          {
            "title": "进入练习项目",
            "text": "再查看当前目录",
            "code": "pwd"
          },
          {
            "title": "检查版本",
            "text": "应返回版本；找不到命令就回查安装与路径",
            "code": "codex --version"
          },
          {
            "title": "启动会话",
            "text": "在这个目录开始项目阅读",
            "code": "codex"
          }
        ],
        "kind": "commands",
        "label": "命令步骤 · 非终端运行记录"
      },
      "supplement": {
        "title": "命令应该粘贴在哪里",
        "paragraphs": [
          "这些命令在终端中运行，不是 ChatGPT 网页输入框。本篇使用终端当前目录，不使用桌面项目或云端环境。"
        ]
      }
    },
      {
      "title": "先请 Codex 阅读项目",
      "paragraphs": [
        "首次启动按提示选择 Sign in with ChatGPT 或官方支持的认证方式。登录后发送下方只读任务。"
      ],
      "prompt": "请阅读当前目录的项目说明与约定，不修改文件。\n说明运行入口、主要模块和测试命令。\n每项附对应文件路径，未执行的命令标为未运行。",
      "checkpoint": "说明引用真实文件，没有把未执行的测试说成通过。",
      "visual": {
        "title": "读完后要能指出依据",
        "items": [
          {
            "title": "AGENTS.md",
            "text": "项目约定"
          },
          {
            "title": "README",
            "text": "用途与运行说明"
          },
          {
            "title": "构建配置",
            "text": "实际入口与测试命令"
          }
        ]
      },
      "supplement": {
        "title": "检查回答",
        "paragraphs": [
          "核对返回路径确实存在；没有运行过的测试不能写成通过。"
        ]
      }
    },
      {
      "title": "结束任务，检查工作区状态",
      "paragraphs": [
        "按 CLI 提示退出会话。Git 项目执行下方命令，确认只读任务没有引入意外改动。"
      ],
      "code": "git status --short",
      "language": "Git 项目中检查状态",
      "supplement": {
        "title": "已有改动与下次启动",
        "paragraphs": [
          "不要清理项目原有改动。下次仍先确认终端目录；桌面应用打开某个项目，不代表终端处于同一路径。"
        ]
      }
    },
    ], exercises: ['在正确目录启动 Codex CLI', '核对项目地图中的三个文件', '结束会话并检查已有修改状态'], takeaway: '终端里最先要确认的是工作目录，随后才是任务和模型。',
  },
  {
    id: 'qwen-code-start', edited: '2026-09-16', title: 'Qwen Code：核对认证配置，修好一个小脚本', description: '用 qwen 启动，分清网页账号与模型服务，再验证脚本输入。', category: 'coding', platform: 'terminal', productId: 'qwen-code', tools: ['qwen-code'], level: '进阶', minutes: 30, color: 'lilac', cover: ['用 Qwen 修改脚本', '认证、输入与验证'],
    goals: ['启动 Qwen Code 并确认认证方式', '让工具只修改目标脚本', '检查正常和空输入结果'], prerequisite: '按 Qwen Code 官方文档完成当前系统的安装。准备一个可独立运行、读取文字输入的测试脚本。',
    sections: [
      {
      "title": "运行 qwen，确认使用哪种模型服务",
      "paragraphs": [
        "使用 npm 安装时先确认 Node.js 22+。官方另有独立安装器，可按自己的系统选择。"
      ],
      "checkpoint": "会话可以正常回答，且你知道使用的是哪种认证和服务。",
      "visual": {
        "title": "安装、启动、认证分开做",
        "items": [
          {
            "title": "终端安装",
            "text": "安装后重新打开终端",
            "code": "npm install -g @qwen-code/qwen-code@latest"
          },
          {
            "title": "进入练习目录后启动",
            "text": "先用 pwd 核对位置，再执行",
            "code": "qwen"
          },
          {
            "title": "在 Qwen 会话内认证",
            "text": "不是系统终端命令；选择自己的模型服务",
            "code": "/auth"
          }
        ],
        "kind": "commands",
        "label": "命令步骤 · 非终端运行记录"
      },
      "supplement": {
        "title": "模型服务与密钥",
        "paragraphs": [
          "使用兼容接口时分别核对服务地址、准确模型 ID 和认证方式。密钥只放在官方要求的安全配置位置，不粘贴到任务正文。Qwen 网页会员不等于 API 余额，也不要套用 Gemini CLI 的认证选项。"
        ]
      }
    },
      {
      "title": "提交只影响一个脚本的任务",
      "paragraphs": [
        "先提供文件名、复现输入和预期，再发送下方单文件修改任务。"
      ],
      "prompt": "请检查这个练习脚本的文字输入处理。\n先解释空字符串和纯空格的当前行为。\n只为该脚本补充空输入检查，保留正常输入的输出。\n列出需要运行的测试样例，再执行与修改直接相关的验证。",
      "checkpoint": "修改集中在输入处理逻辑，没有重新生成整个项目。"
    },
      {
      "title": "分别执行三种输入",
      "paragraphs": [
        "打开实际文件差异与运行输出，不能只看工具摘要。"
      ],
      "visual": {
        "title": "同一脚本，运行三个案例",
        "items": [
          {
            "title": "正常文字",
            "text": "原输出保持可用"
          },
          {
            "title": "空字符串",
            "text": "进入空输入处理"
          },
          {
            "title": "纯空格",
            "text": "也能识别为空输入"
          }
        ],
        "label": "测试设计示意 · 非运行结果"
      },
      "supplement": {
        "title": "区分两种错误",
        "paragraphs": [
          "接口鉴权失败先修服务配置；脚本报错检查业务代码。不要把模型服务错误当成输入逻辑错误。"
        ]
      }
    },
    ], exercises: ['启动 qwen 并记录认证方式', '为目标脚本完成最小修改', '验证正常文字、空串和空格输入'], takeaway: 'Qwen Code 的登录、模型配置和脚本验证各有自己的步骤。',
  },
  {
    id: 'copilot-vscode-start', edited: '2026-09-16', title: 'GitHub Copilot：在 VS Code 中体验补全与聊天', description: '从官方扩展和 GitHub 登录开始，理解建议补全与任务修改的区别。', category: 'coding', platform: 'editor', productId: 'copilot', tools: ['copilot'], level: '入门', minutes: 25, color: 'sage', cover: ['在编辑器里学编程', '补全建议，逐条检查'],
    goals: ['在 VS Code 中完成 Copilot 设置', '解释选中函数并核对上下文', '审查一次代码补全与边界行为'], prerequisite: '已安装 VS Code，并有可使用 Copilot 的 GitHub 账号。具体权益按账号页面确认；无需安装 Cursor。',
    sections: [
      {
      "title": "在 VS Code 安装官方扩展并登录",
      "paragraphs": [
        "在 VS Code 扩展市场选择 GitHub 发布的 Copilot，按提示登录 GitHub。"
      ],
      "checkpoint": "VS Code 中能看到 Copilot 入口，当前打开的是练习项目。",
      "actionSteps": [
        "确认编辑器内 Copilot 可用，再打开练习项目。",
        "无权限时先核对账号权益与组织策略。"
      ],
      "visual": {
        "title": "确认三层都准备好",
        "items": [
          {
            "title": "VS Code",
            "text": "打开练习代码"
          },
          {
            "title": "GitHub Copilot",
            "text": "使用官方扩展与登录账号"
          },
          {
            "title": "账号权益",
            "text": "能使用本次补全和聊天功能"
          }
        ]
      }
    },
      {
      "title": "选中函数，用聊天先问懂",
      "paragraphs": [
        "选中一个短函数，把选区加入 Copilot 聊天上下文，再发送下方问题。"
      ],
      "prompt": "请解释选中的函数：\n输入是什么，返回什么，空值时会怎样？\n引用实际代码说明，暂时不要修改。",
      "checkpoint": "回答对应选中的代码，没有解释成另一个同名函数。",
      "visual": {
        "title": "先问懂选中的代码",
        "items": [
          {
            "title": "选中函数",
            "text": "只提供这次要解释的片段"
          },
          {
            "title": "加入上下文",
            "text": "检查引用的是正确文件与选区"
          },
          {
            "title": "询问边界",
            "text": "输入、返回值与空值行为"
          }
        ]
      }
    },
      {
      "title": "体验补全，再决定是否接受",
      "paragraphs": [
        "写一行清晰注释，查看补全建议。按编辑器提示接受或取消；接受后逐行阅读，并运行正常与空值样例。"
      ],
      "visual": {
        "title": "补全和聊天不同",
        "items": [
          {
            "title": "聊天解释",
            "text": "回答问题，不等于写入文件"
          },
          {
            "title": "光标处补全",
            "text": "接受后改变代码，必须检查和运行"
          }
        ],
        "kind": "compare",
        "label": "操作效果对照 · 非编辑器截图"
      }
    },
    ], exercises: ['确认 VS Code 中 Copilot 已可用', '通过选中函数获得准确解释', '审查一条补全并验证边界情况'], takeaway: 'Copilot 的学习重点是编辑器中的选区、光标、建议和修改结果。',
  },
];
