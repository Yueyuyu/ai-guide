import { personalBrief, websiteChecklist } from './practice-resources.js';
import { photoStep } from './tutorial-captures.js';

export const codexPractice = {
  "title": "用 ChatGPT 桌面版，创建第一个本地网页",
  "description": "用一份完整需求单，创建无需安装依赖、能在本地打开的个人主页。",
  "edited": "2026-09-16",
  "prerequisite": "电脑浏览器能正常访问官方服务，拥有可用账号，并按官方下载页安装当前系统支持的桌面应用。先准备空的练习文件夹；尚不满足条件时可以阅读示例，或先学豆包网页路线。",
  "exercises": [
    "在独立目录中创建页面",
    "实际打开页面并检查内容和链接",
    "检查手机宽度，并记录发现的问题或实际结果"
  ],
  "resultSaving": {
    "material": personalBrief,
    "filename": "AIGuide-我的网页创建记录.txt",
    "label": "我的创建记录",
    "placeholder": "练习文件夹：\n生成了哪些文件：\n页面打开方式：\n检查到的问题："
  },
  "sections": [
    {
      "title": "安装 ChatGPT，选好练习目录",
      "paragraphs": [
        "本课使用 ChatGPT 桌面应用里的 Codex；官网打不开时先做网络准备。以下两图为官方中文说明，桌面按钮实拍待补。"
      ],
      "links": [
        {
          "href": "https://learn.chatgpt.com/docs/app",
          "label": "ChatGPT 官方桌面安装与入门",
          "external": true
        },
        {
          "href": "https://learn.chatgpt.com/docs/windows/windows-app",
          "label": "Windows 官方说明",
          "external": true
        },
        {
          "href": "#/path/network",
          "label": "服务还打不开？先做网络准备"
        },
        {
          "href": "#/path/starter",
          "label": "还没准备好？先从网页入门"
        }
      ],
      "prompt": "不要修改文件。只报告当前完整工作目录和已有文件。",
      "promptLabel": "先确认目录 · 可直接发送",
      "supplement": {
        "title": "系统、权限与云端区别",
        "paragraphs": [
          "Windows 按原生桌面流程使用，本课不要求先安装 WSL。保留应用原有审批与沙盒设置，涉及文件或命令时阅读用途。",
          "本课做的是电脑上的本地网页；云端任务需另外配置仓库。系统支持和账号权益以官方当前说明为准。"
        ]
      },
      "walkthrough": [
        photoStep("chatgpt-quickstart-zh", "安装登录", "从官方入口安装适合系统的 ChatGPT，并使用自己的账号登录。", "进入应用主界面；遇到登录或额度问题先按官方提示处理。"),
        photoStep("chatgpt-folder-guide-zh", "选择目录", "新建空目录 AIGuide-practice/personal-page，在应用中打开它。", "进入 Codex 新建聊天，发送下方只读检查，返回路径与练习目录一致。")
      ]
    },
    {
      "title": "先看要做出什么",
      "paragraphs": [
        "这是本次 Codex 会话按需求生成的实际网页，可打开或下载对照；不代表已实拍桌面安装和登录。"
      ],
      "downloads": [
        {
          "href": "practice/personal-brief.txt",
          "filename": "AIGuide-personal-brief.txt",
          "label": "下载完整需求单"
        }
      ],
      "links": [
        {
          "href": "practice/codex-session/index-before-tags.html",
          "label": "打开本次生成的初稿",
          "external": true
        }
      ],
      "supplement": {
        "title": "完整要求在哪里",
        "paragraphs": [
          "完整需求单可下载；下一节“复制完整内容”已经包含全部材料。无需重复粘贴两次。"
        ]
      },
      "walkthrough": [
        photoStep("codex-before", "先看成品", "打开示例网页，认识简介、三个项目与联系说明的位置。", "三个板块都有中文内容，人物与联系信息均为虚构练习。")
      ]
    },
    {
      "title": "把完整任务交给 Codex",
      "paragraphs": [
        "复制完整任务，发到刚才的 Codex 会话。先读它给出的计划，再检查生成文件。"
      ],
      "prompt": "请在当前练习目录中完成这份需求。\n先检查目录，说明计划与文件范围，再开始创建。若已有同名文件，先说明内容，保留原文件。\n只生成index.html和README.md：样式写在HTML中，无构建步骤，无需npm或其他依赖。\n完成后给出两个文件的位置和双击HTML的打开方式；只报告实际完成的检查。\n\n个人主页需求单（虚构练习信息）\n名字：林同学\n简介：正在学习用AI整理资料、改进日常工作和制作小网页。\n项目一：读书清单｜给想读的书做分类与简短笔记。\n项目二：活动计划｜把活动准备事项整理成可核对的清单。\n项目三：学习手记｜记录每周学会的一项小技能。\n联系说明：练习页面，暂不提供真实联系方式。\n\n页面要求：简介、三个项目、联系说明三个部分；中文界面；导航跳到对应板块。\n实现要求：只创建index.html和README.md，样式写在HTML中，不安装依赖，不请求外部图片、字体或接口。\n验收：双击index.html可打开；320px和1440px宽度内容完整；Tab可聚焦链接；刷新正常。\n边界：本地练习，不添加登录、支付、表单或公开部署。",
      "checkpoint": "目录内出现实际文件；聊天中的代码片段不等于文件已创建。",
      "promptPreview": "创建中文个人主页：简介、三个项目、联系说明。\n只生成 index.html 与 README.md，不安装依赖。\n完整内容包含虚构资料与验收要求。",
      "visual": {
        "title": "实际文件与打开方式",
        "items": [
          {
            "title": "personal-page/",
            "text": "你的练习使用自己的目录"
          },
          {
            "title": "index.html",
            "text": "双击用浏览器打开的网页"
          },
          {
            "title": "README.md",
            "text": "记录打开方式和已做检查"
          }
        ],
        "kind": "files",
        "label": "本次已生成文件 · 可下载核对"
      },
      "downloads": [
        {
          "href": "practice/codex-session/index-before-tags.html",
          "filename": "index-before-tags.html",
          "label": "下载本次初稿 HTML"
        },
        {
          "href": "practice/codex-session/README.md",
          "filename": "README.md",
          "label": "下载实际检查说明"
        }
      ]
    },
    {
      "title": "打开实际文件，核对三个板块",
      "paragraphs": [],
      "faq": [
        [
          "出现命令请求，该怎么办？",
          "先阅读命令用途。本练习无需安装第三方依赖；如果工具提出安装，请它解释当前静态页面为什么需要，再对照需求调整。"
        ],
        [
          "页面能打开，算已经上线了吗？",
          "这里只完成本地作品。公开访问需要另外选择部署服务、核对发布内容与域名。"
        ],
        [
          "能直接拿参考作品当成我的结果吗？",
          "参考作品用于理解目标。实操应在自己的练习目录完成生成、修改和核对，保存实际检查记录。"
        ]
      ],
      "supplement": {
        "title": "出现源码、空白或依赖提示",
        "paragraphs": [
          "先显示文件扩展名，确认文件不是 .txt；核对打开位置与生成路径。若要求安装依赖，让 Codex 按需求恢复为单文件静态页面。"
        ]
      },
      "walkthrough": [
        photoStep("codex-before", "打开并点导航", "用浏览器打开实际 index.html，依次点击“简介、项目、联系”。", "看到真实网页，三处导航到达对应板块；只有聊天代码不算完成。")
      ]
    },
    {
      "title": "保存创建记录，继续修改",
      "checkpoint": "已经打开 index.html，保存了两个实际文件和创建记录；接下来沿用同一目录添加标签。",
      "paragraphs": [
        "网页文件保存在电脑目录；下方只保存创建记录。下一课沿用相同目录，继续添加标签。"
      ],
      "resultEditor": true
    }
  ]
};

export const websiteLessons = [
  {
    "id": "codex-iterate",
    "productId": "codex",
    "platform": "desktop",
    "lessonType": "operation",
    "title": "继续用 ChatGPT，完成一次明确修改",
    "description": "在同一个网页上提出小范围改动，查看文件差异并复查。",
    "category": "coding",
    "level": "入门",
    "minutes": 25,
    "tools": [
      "codex"
    ],
    "color": "peach",
    "cover": [
      "让网页再好一点",
      "说清范围，检查差异"
    ],
    "edited": "2026-09-16",
    "goals": [
      "写出修改范围与完成标准",
      "检查实际文件差异",
      "对比修改前后的网页"
    ],
    "prerequisite": "完成上一课的本地网页，保留index.html和README.md。沿用同一Codex练习目录。",
    "resultSaving": {
      "material": "修改任务：给三个项目依次增加“阅读”“计划”“记录”标签，其余文字与板块保持原样。",
      "filename": "AIGuide-我的网页修改记录.txt",
      "label": "我的修改记录",
      "placeholder": "修改要求：\n修改了哪些文件：\n修改前后差异：\n实际复查结果："
    },
    "sections": [
      {
        "title": "先留一份修改前的对照",
        "paragraphs": [
          "先复制 index.html 为 index-before-tags.html，保留修改前的版本。已有版本控制也可以用它备份。"
        ],
        "checkpoint": "原始文件有备份；接下来只修改 index.html。",
        "downloads": [
          {
            "href": "practice/codex-session/index-before-tags.html",
            "filename": "index-before-tags.html",
            "label": "下载本次修改前文件"
          }
        ]
      },
      {
        "title": "在同一任务里说明修改范围",
        "paragraphs": [
          "在原 Codex 会话发送下方要求，先看修改位置，再让它动手。"
        ],
        "prompt": "请阅读当前index.html，仅修改项目板块：\n读书清单增加“阅读”标签；活动计划增加“计划”标签；学习手记增加“记录”标签。\n标签在手机宽度不溢出。保留其他文案、导航、配色与布局。\n先说明改动位置；完成后列出实际修改文件和需要复查的地方，不安装依赖。"
      },
      {
        "title": "查看差异并重新打开页面",
        "paragraphs": [
          "本次文件差异只有三个标签及所需样式，下面可切换前后截图。"
        ],
        "supplement": {
          "title": "没有差异视图，或刷新没变化",
          "paragraphs": [
            "可以对照 index-before-tags.html 查看变化。刷新没变化时，核对浏览器打开路径是否就是工具修改的路径。"
          ]
        },
        "walkthrough": [
          photoStep("codex-before", "修改前", "打开备份网页，确认三个项目目前没有标签。", "保留原始版本，以便和修改结果逐项对照。"),
          photoStep("codex-after", "修改后", "刷新 index.html，核对“阅读、计划、记录”三个新增标签。", "标签与项目对应，简介、联系方式和导航保持原样。")
        ],
        "downloads": [
          {
            "href": "practice/codex-session/index.html",
            "filename": "index.html",
            "label": "下载本次修改后文件"
          },
          {
            "href": "practice/codex-session/changes.diff",
            "filename": "changes.diff",
            "label": "下载实际文件差异"
          }
        ]
      },
      {
        "title": "记录变化与复查结果",
        "paragraphs": [
          "写下改动文件、实际看到的变化和未测设备，下一课继续验收。"
        ],
        "resultEditor": true
      }
    ],
    "exercises": [
      "给当前网页提交一项范围明确的修改",
      "对照实际文件检查变化范围",
      "刷新并核对三个标签与导航"
    ],
    "takeaway": "一次修改越具体，越容易判断它是否完成。"
  },
  {
    "id": "website-check",
    "title": "把网页从“能打开”检查到“能使用”",
    "description": "按桌面、手机、键盘与内容清单验收，保存自己的交付记录。",
    "category": "coding",
    "lessonType": "project",
    "platform": "general",
    "level": "入门",
    "minutes": 25,
    "tools": [
      "codex",
      "cursor"
    ],
    "color": "sage",
    "cover": [
      "完成第一个作品",
      "逐项核对，再交付"
    ],
    "edited": "2026-09-16",
    "goals": [
      "检查内容和链接",
      "在不同宽度和键盘下复查",
      "保存运行说明与未测项"
    ],
    "prerequisite": "能在本地打开自己的网页。使用现有浏览器即可，不要求安装另一款编程工具。",
    "resultSaving": {
      "material": websiteChecklist,
      "filename": "AIGuide-我的网页验收记录.txt",
      "label": "我的网页验收记录",
      "placeholder": "文件与打开方法：\n已检查的宽度：\n内容与导航：\n键盘操作：\n发现的问题与复查：\n尚未检查："
    },
    "sections": [
      {
        "title": "按需求单检查，而不是凭印象",
        "paragraphs": [],
        "downloads": [
          {
            "href": "practice/website-checklist.txt",
            "filename": "AIGuide-website-checklist.txt",
            "label": "下载网页验收清单"
          }
        ],
        "walkthrough": [
          photoStep("codex-after", "内容与导航", "对照需求单，点击简介、项目、联系三个导航。", "内容完整，每个链接到达对应板块。")
        ]
      },
      {
        "title": "检查手机宽度与放大阅读",
        "paragraphs": [
          "本次已在 1440、390、320px 检查实际网页；文字放大与真实手机仍需另测。"
        ],
        "supplement": {
          "title": "如何测准确的宽度",
          "paragraphs": [
            "在 Chromium 浏览器的开发者工具中开启设备工具栏，分别设为 390px 和 320px。尚不会操作时记录“仅缩窄窗口观察”。浏览器模拟不能写成真实手机实测。"
          ]
        },
        "walkthrough": [
          photoStep("codex-mobile", "窄屏检查", "把浏览器切到 390px 和 320px，检查标题、标签与页尾。", "无整页横向滚动，文字与标签可读；这张图是浏览器模拟，不是真手机。")
        ]
      },
      {
        "title": "再用键盘走一遍",
        "paragraphs": [
          "按 Tab 移到导航链接，确认焦点清晰；按 Enter 检查能否跳转。"
        ],
        "visual": {
          "title": "只用键盘也能操作",
          "items": [
            {
              "title": "Tab",
              "icon": "terminal",
              "text": "移动到下一个链接"
            },
            {
              "title": "看到焦点框",
              "icon": "search",
              "text": "知道当前选中哪里"
            },
            {
              "title": "Enter",
              "icon": "terminal",
              "text": "完成与鼠标点击相同的动作"
            }
          ]
        },
        "supplement": {
          "title": "如果以后添加表单",
          "paragraphs": [
            "本练习没有真实表单，无需临时添加。自己的项目有表单时，另检查输入、错误提示与实际提交状态。"
          ]
        }
      },
      {
        "title": "把问题写成工具能复现的描述",
        "paragraphs": [
          "把真实问题填进模板，发回原任务。修复后重做相同操作，并检查相邻内容。"
        ],
        "prompt": "请修复我在当前网页发现的问题。\n环境与宽度：[填写实际环境]\n复现步骤：[填写操作]\n实际结果：[填写问题]\n预期结果：[填写目标]\n只修改相关区域，保留其他内容。完成后说明改动文件，并复查相同操作。",
        "promptLabel": "问题描述模板 · 方括号处换成实际记录"
      },
      {
        "title": "保存本地交付记录",
        "checkpoint": "两个源文件与验收记录都已另行保存；未测设备如实记录，不把设备模拟写成真人手机体验。",
        "paragraphs": [
          "分别保存网页源文件、README.md 和下方验收记录；没有测过的设备如实写明。"
        ],
        "resultEditor": true,
        "links": [
          {
            "href": "#/project/personal-page",
            "label": "完成个人主页项目自查"
          },
          {
            "href": "#/feedback?track=codex",
            "label": "反馈 ChatGPT 网页练习的实际体验"
          },
          {
            "href": "#/learn/cursor-debug",
            "label": "选学：用 Cursor 排查表单问题"
          }
        ],
        "downloads": [
          {
            "href": "practice/codex-session/README.md",
            "filename": "README.md",
            "label": "下载本次检查范围"
          }
        ]
      }
    ],
    "exercises": [
      "逐个检查内容与导航",
      "检查不同宽度和键盘操作并记录实际范围",
      "保存页面文件、运行说明与验收记录"
    ],
    "takeaway": "能复现、能核对、能交接，作品才方便继续完善。"
  }
];
