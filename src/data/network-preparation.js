export const networkPreparation = {
  id: 'network-prepare', title: '网络准备：用 Clash Party 配置自己的订阅',
  description: '分清客户端与订阅，按 Windows 安装、导入、选节点、验证，并学会恢复网络。',
  category: 'basics', platform: 'desktop', lessonType: 'setup', tools: [],
  level: '入门', minutes: 25, color: 'blue', edited: '2026-09-16',
  cover: ['先把网络准备好', '客户端 · 订阅 · 验证'],
  goals: ['分清开源客户端和收费订阅服务', '按步骤导入自己的订阅并验证', '知道失败时查哪里、如何恢复网络'],
  prerequisite: '本课以 Windows 电脑为例。准备能取得官方安装包的网络，以及你自己选择的、与 Mihomo / Clash 配置兼容的订阅。已经能正常使用目标服务的读者可跳过；豆包网页入门不以配置代理为前提。',
  resultSaving: { material: '记录日期、系统、客户端版本、导入是否成功、目标服务是否可用、关闭代理后能否恢复。不要记录个人订阅链接、节点地址、密码或 Token。', filename: 'AIGuide-网络准备检查记录.txt', label: '我的网络检查记录', placeholder: '日期与系统：\n客户端版本：\n订阅导入：成功 / 失败 / 未尝试\n目标服务：可使用 / 仅可打开 / 不可用\n关闭代理后的普通网页：\n尚未解决的问题（不含凭据）：' },
  sections: [
    {
      "title": "先分清：客户端、订阅、节点",
      "paragraphs": [
        "客户端负责连接；订阅提供配置；节点是配置里的连接选项。安装客户端后，还要准备自己的兼容订阅。"
      ],
      "checkpoint": "我知道下载客户端之后，还需要自己准备兼容订阅。",
      "visual": {
        "title": "三个东西，各有来源",
        "items": [
          {
            "title": "客户端",
            "icon": "desktop",
            "logo": "clash-party.png",
            "text": "从官方来源安装 Clash Party"
          },
          {
            "title": "订阅配置",
            "icon": "link",
            "text": "从自己的服务商账户取得"
          },
          {
            "title": "节点",
            "icon": "network",
            "text": "导入后，在配置里选择"
          }
        ]
      },
      "supplement": {
        "title": "费用与测速怎么看",
        "paragraphs": [
          "开源客户端免费，不等于订阅服务免费。节点有延迟只表示探测得到回应，不代表目标 AI 服务一定可用。"
        ]
      }
    },
    {
      "title": "从官方入口下载 Windows 安装包",
      "actionSteps": [
        "打开下方官方发行页，展开 Assets（安装文件）。",
        "按系统选择 x64 或 arm64 的正式版 .exe，安装并打开。",
        "记下客户端版本，方便后面核对界面。"
      ],
      "links": [
        {
          "label": "Clash Party 官方发行页",
          "href": "https://github.com/mihomo-party-org/clash-party/releases",
          "external": true
        },
        {
          "label": "官方安装指南",
          "href": "https://clashparty.org/docs/install",
          "external": true
        }
      ],
      "paragraphs": [
        "先在 Windows“设置 → 系统 → 系统信息”查看系统类型。"
      ],
      "checkpoint": "软件已经打开，并且我知道自己安装的版本。",
      "visual": {
        "title": "安装包怎么选",
        "items": [
          {
            "title": "系统类型",
            "icon": "desktop",
            "text": "x64 与 arm64 要对应电脑"
          },
          {
            "title": "正式版本",
            "icon": "check",
            "text": "跳过标为 Pre-release 的预发布"
          },
          {
            "title": ".exe 安装包",
            "icon": "download",
            "text": "首次使用更方便；.7z 需自行解压"
          }
        ]
      },
      "supplement": {
        "title": "Mac、Linux 或安装失败",
        "paragraphs": [
          "Mac 与 Linux 按官方安装指南切换系统标签。安装失败先核对发行说明与系统支持，不反复安装来源不明的同名软件。文件命名以当前发行页为准。"
        ]
      }
    },
    {
      "title": "准备自己的订阅，先看兼容和费用",
      "paragraphs": [
        "登录自己的服务商账户，取得 Clash / Mihomo 兼容订阅。已有订阅先核对有效期，无需重复购买。"
      ],
      "list": [
        "个人订阅链接只粘贴到客户端，不放到本站草稿、反馈或公共 Issue。"
      ],
      "checkpoint": "我在自己的账户中取得了兼容配置；个人链接只在客户端中使用。",
      "visual": {
        "title": "复制前检查",
        "items": [
          {
            "title": "格式兼容",
            "icon": "file",
            "text": "选择 Clash / Mihomo 配置"
          },
          {
            "title": "套餐有效",
            "icon": "check",
            "text": "核对到期时间、流量与设备限制"
          },
          {
            "title": "个人订阅地址",
            "icon": "link",
            "text": "不是官网首页，也不是付款页面"
          }
        ]
      },
      "supplement": {
        "title": "没有订阅或链接泄露时",
        "paragraphs": [
          "没有订阅时先比较费用、试用或退款规则以及目标服务支持情况。本站没有已实测推荐的订阅商或合作返佣链接。",
          "无法确认格式时询问服务商，不把个人链接交给在线转换站。链接曾泄露，应在原服务商账户重置后重新导入。"
        ]
      }
    },
    {
      "title": "导入订阅，确认配置真正加载",
      "actionSteps": [
        "打开订阅管理，选择订阅卡片。",
        "粘贴自己的订阅地址，点击“导入”。",
        "等配置加载后选用它，确认节点列表不是空的。"
      ],
      "links": [
        {
          "label": "官方快速上手：导入订阅与开启代理",
          "href": "https://clashparty.org/docs/handson",
          "external": true
        }
      ],
      "paragraphs": ["下图沿用官方旧版界面说明位置，请导入自己的订阅。"],
      "checkpoint": "能看到并选用自己的配置，节点列表不是空的。",
      "screenshot": {
        "src": "tutorials/visual-guide/clash-import.png",
        "alt": "官方导入示例：订阅卡片、地址输入处、导入按钮",
        "width": 2166,
        "height": 1442,
        "title": "Clash Party 官方操作图",
        "sourceUrl": "https://clashparty.org/docs/handson",
        "caption": "官方旧版配图（图内名为 Mihomo Party）；2026-09-16 获取，非本课实测。当前版本布局可能不同，图中服务商不是本站推荐。"
      },
      "supplement": {
        "title": "导入失败怎么办",
        "paragraphs": [
          "先检查链接是否复制完整、套餐是否有效、格式是否兼容。记录脱敏错误，只有配置名称或空列表不算成功。"
        ]
      }
    },
    {
      "title": "选择节点，再打开系统代理",
      "actionSteps": [
        "打开“代理组”，展开分组并选择自己的节点。",
        "开启“系统代理”，保持客户端运行。",
        "回到浏览器，按下一节验证实际访问。"
      ],
      "paragraphs": [
        "先按配置的规则模式连接；本次不需要同时调整 TUN、覆写或 DNS。"
      ],
      "checkpoint": "选中了节点，系统代理已开启，客户端仍在运行。",
      "screenshot": {
        "src": "tutorials/visual-guide/clash-nodes.png",
        "alt": "官方连接示例：代理组、节点列表与系统代理开关",
        "width": 2166,
        "height": 1442,
        "title": "Clash Party 官方操作图",
        "sourceUrl": "https://clashparty.org/docs/handson",
        "caption": "官方旧版配图（图内名为 Mihomo Party）；2026-09-16 获取，非本课实测。当前版本布局可能不同，图中服务商不是本站推荐。"
      },
      "supplement": {
        "title": "浏览器能用，桌面软件不一定能用",
        "paragraphs": [
          "系统代理只影响遵循系统设置的应用。桌面软件和命令行可能有自己的网络设置；全局模式与 TUN 也不是同一机制。节点测速不能替代目标服务检查。"
        ]
      }
    },
    {
      "title": "按三个层次验证，再进入 Codex",
      "links": [
        {
          "label": "检查 OpenAI 官方桌面入口",
          "href": "https://learn.chatgpt.com/docs/app",
          "external": true
        },
        {
          "label": "准备好了：进入 Codex 编程路线",
          "href": "#/path/builder"
        },
        {
          "label": "先做国内网页练习：豆包",
          "href": "#/learn/doubao-notice?path=starter"
        }
      ],
      "paragraphs": [
        "每通过一层再检查下一层。出现明确地区或账号限制时，按产品官方说明处理。"
      ],
      "checkpoint": "已记录成功到哪一层；登录或测速成功不等于任务可用。",
      "visual": {
        "title": "三层检查，逐个确认",
        "items": [
          {
            "title": "基础网络",
            "icon": "globe",
            "text": "打开一个原本可用的普通网页"
          },
          {
            "title": "官方服务",
            "icon": "user",
            "text": "打开目标官网，核对能否登录"
          },
          {
            "title": "真实任务",
            "icon": "message",
            "text": "发送一句测试问题，实际收到回答"
          }
        ]
      }
    },
    {
      "title": "不通时只改一个地方，也要会恢复",
      "paragraphs": [
        "每次只改一个设置，记下原值。普通网页异常时先恢复本次代理改动。"
      ],
      "faq": [
        [
          "导入失败或列表是空的？",
          "核对订阅格式、链接完整性和有效期。若配置来自服务商，向其反馈客户端版本和脱敏后的错误，不发送截图中的个人订阅链接。"
        ],
        [
          "节点有延迟，但目标网页打不开？",
          "先确认当前配置与节点已选中、系统代理开启。换一个服务商提供的可用节点后重试同一个页面；记录差异，不一次修改所有设置。"
        ],
        [
          "浏览器能用，Codex 不行？",
          "记录 Codex 的具体错误和版本，核对产品登录与服务状态，以及应用是否使用系统代理。不能仅凭这个现象断定必须开启 TUN。"
        ],
        [
          "退出客户端后普通网页也打不开？",
          "先重新打开客户端并关闭系统代理，再正常退出。仍不恢复时，检查 Windows“设置 → 网络和 Internet → 代理”中是否残留这次配置的手动代理；恢复本次改动前的设置，保留原有单位或学校网络配置。"
        ]
      ],
      "links": [
        {
          "label": "官方常见问题：开机没网、无法订阅",
          "href": "https://clashparty.org/docs/issues/common",
          "external": true
        }
      ],
      "checkpoint": "普通网页恢复可用；原有单位或学校网络配置保留。",
      "visual": {
        "title": "退出前，先恢复网络",
        "items": [
          {
            "title": "关闭系统代理",
            "icon": "network",
            "text": "先在 Clash Party 里关开关"
          },
          {
            "title": "正常退出客户端",
            "icon": "desktop",
            "text": "重新打开普通网页"
          },
          {
            "title": "仍打不开",
            "icon": "search",
            "text": "检查 Windows 代理设置，仅恢复本次改动"
          }
        ]
      }
    },
    {
      "title": "留下检查记录，按实际情况完成自查",
      "paragraphs": [
        "填写版本、检查结果和脱敏错误；没做过的写“未尝试”。不要保存个人订阅链接或配置内容。"
      ],
      "resultEditor": true
    },
    {
      "title": "以后再学的设置与其他客户端",
      "paragraphs": [
        "基础流程完成后，再按需要学习规则、TUN 或其他客户端。换客户端前先确认订阅兼容。"
      ],
      "links": [
        {
          "label": "Clash Party 官方指南",
          "href": "https://clashparty.org/docs/handson",
          "external": true
        },
        {
          "label": "Clash Verge Rev 开源仓库",
          "href": "https://github.com/clash-verge-rev/clash-verge-rev",
          "external": true
        },
        {
          "label": "提交这次试用的卡点",
          "href": "#/feedback?track=network"
        }
      ],
      "checkpoint": "基础流程完成后，再决定是否需要进阶设置。",
      "supplement": {
        "title": "其他客户端",
        "paragraphs": [
          "Clash Verge Rev 可作开源客户端参考，本课没有混用它的按钮步骤。进阶设置请按当前软件版本阅读官方说明。"
        ]
      }
    },
  ],
  exercises: ['我能分清客户端、订阅和节点，并从官方来源安装软件', '我已导入自己的配置，并记录目标服务的实际可用层次', '我已检查关闭代理后的网络恢复，记录中不含订阅或凭据'],
  takeaway: '先把每一层验证清楚，再开始工具实操。',
};
