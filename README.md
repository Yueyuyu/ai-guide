# AIGuide · AI 学习手册

**从这里，学会 AI。**

面向中文读者的 AI 教程网站：按路线完成一件小事，按公司找到产品，分清应用、模型与 API，再把练习成果保存下来。

当前为 **0.1.0 本地可复核版本**，尚未公开部署。第三方账号内实操与新手真人试用仍在后续计划中。详见[项目状态](docs/STATUS.md)与[迭代计划](docs/ROADMAP.md)。

## 当前能力

| 板块 | 已实现 |
| --- | --- |
| 学习路线 | AI 入门、AI 编程、办公提效、模型接入；前置设备、账号、费用和成果说明 |
| 工具教程 | 12 家公司、31 个产品与模型入口，按网页版、桌面版、API、模型组织 |
| 教程实操 | 44 篇教程；豆包网页与 Codex 桌面主线提供材料、中文步骤、核对与问题帮助 |
| 我的学习 | 阅读位置、收藏、自查、项目进度和 8 篇成果草稿；JSON 备份与 TXT 导出 |
| 模型排名 | Artificial Analysis 综合能力与终端编程快照，保留来源、指标与日期 |
| 独立阅读 | 44 篇独立 HTML 教程及阅读目录，无需 JavaScript 即可阅读正文与来源 |

教程数量不代表实操覆盖率。人工参考答案、教学示意、官网截图和实际操作证据分别标识。本站没有在线 AI 对话、账号同步或付费服务。

## 快速开始

使用 **Node.js 24 LTS** 和 **pnpm 11.19.0**。版本见 [.node-version](.node-version) 与 [package.json](package.json)。本地启动无需密钥、数据库或环境变量。

```sh
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```

打开 [http://127.0.0.1:4186/](http://127.0.0.1:4186/)。请通过开发服务访问，直接双击源码 `index.html` 不能运行 JSX。

首次拉取后运行完整检查：

```sh
pnpm check
```

这个命令依次运行测试、站内内容审计、工程文档检查和生产构建，失败即停止；不会刷新外部榜单或推送代码。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 本地开发，默认 `127.0.0.1:4186` |
| `pnpm test` | Node 内置测试，无需外部账号 |
| `pnpm audit:content` | 检查教程、路线、章节与练习资源 |
| `pnpm audit:docs` | 检查维护文档中的本地链接及机器专属路径 |
| `pnpm check` | 测试 → 内容审计 → 文档审计 → 构建 |
| `pnpm resources` | 从内容源生成六份中文 TXT 材料 |
| `pnpm refresh:rankings` | 联网刷新榜单，失败保留有效快照 |
| `pnpm build` | 生成 `dist/`，含互动站与独立阅读页 |
| `pnpm preview --port 4190` | 在独立端口检查生产构建 |

外链检查独立于默认 CI：

```sh
pnpm audit:content --links --output .local/content-audit.json
```

Windows 上 Node 网络受限时增加 `--system-http`，使用系统 PowerShell 网络方式。403、限流、超时不会直接判成失效。详见[内容维护](docs/engineering/CONTENT.md)。

## 工程结构

```text
src/
  pages/          页面与路由视图
  components/     导航、教程、图表和交互组件
  data/           课程、产品、公司、练习与来源登记
  lib/            学习记录、筛选、排名校验和维护规则
  styles*.css     共享与分页面样式
server/           Vite 插件、阅读页生成、榜单获取与存储
scripts/          材料生成、审计和项目检查
public/           品牌资产、教程证据、练习文件和榜单快照
tests/            Node 测试与小型测试数据
docs/             工程文档、内容证据和历史设计资料
.github/          CI、Issue 模板和 PR 模板
```

`server/` 是构建工具和本地开发／预览中间件，不是已部署的业务后端。数据流、路由和存储约定见[架构说明](docs/engineering/ARCHITECTURE.md)。

## 文档导航

| 我要做什么 | 文档 |
| --- | --- |
| 找到模块和数据流 | [文档目录](docs/README.md)、[架构说明](docs/engineering/ARCHITECTURE.md) |
| 配置环境、运行与排错 | [开发指南](docs/engineering/DEVELOPMENT.md) |
| 增加教程、产品、材料或截图 | [内容维护规范](docs/engineering/CONTENT.md) |
| 刷新或扩展榜单 | [排名数据维护](docs/engineering/RANKINGS.md) |
| 回归与实测 | [质量与验收](docs/engineering/QUALITY.md) |
| 独立建仓、推送和发布 | [GitHub 与发布指南](docs/engineering/RELEASE.md) |
| 安排后续工作 | [迭代计划](docs/ROADMAP.md) |
| 提交修改、让 AI 继续维护 | [贡献说明](CONTRIBUTING.md)、[项目规则](AGENTS.md) |
| 核对视觉与资料 | [当前设计](docs/DESIGN.md)、[来源审计](docs/SOURCE-AUDIT.md)、[资产说明](docs/ASSETS.md) |

## 构建与发布

发布目录为 `dist/`，独立阅读入口为 `/read/index.html`，互动入口为 `/#/`。相对资源路径支持子目录部署。

确定正式 HTTPS 地址后，将 [.env.example](.env.example) 复制为 `.env.local`，填写 `AIGUIDE_SITE_URL`，再运行 `pnpm build`。有效地址用于生成 canonical、Open Graph 地址、`sitemap.xml` 和 `robots.txt`；未配置时不会写入虚构域名。

GitHub CI 负责安装、检查和保留构建产物，**不自动部署或刷新榜单**。代码推送与网站发布是两个步骤，见[发布指南](docs/engineering/RELEASE.md)。

## 记录、来源与使用边界

- 学习记录使用当前浏览器的 `zhixing-ai-learning-v1`，保留旧键名兼容历史记录；切换浏览器或站点来源不会自动同步。
- JSON 导入合并有效记录，同课已有草稿优先保留；清除网站数据前先备份。
- 内容整理日期、资料核对日期和榜单获取日期不能代替账号实测或评测日期。
- 纯静态网站显示构建快照，没有后台定时刷新。
- 问题记录仅支持本地复制、下载，没有在线接收端。
- 原创代码、文档和练习材料采用 [MIT License](LICENSE) 开源。第三方依赖、标识、资料、截图和榜单数据遵循各自条件，见 [NOTICE.md](NOTICE.md)。
