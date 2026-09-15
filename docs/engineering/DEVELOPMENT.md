# 开发指南

## 环境与安装

- Node.js 24 LTS，推荐使用 [.node-version](../../.node-version) 的版本。
- pnpm 11.19.0，版本写入 [package.json](../../package.json) 的 `packageManager`。
- Git；Windows 联网审计的可选系统模式使用系统 PowerShell。

在项目根目录执行：

```sh
npm install --global pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

锁文件随代码一起提交，不通过删除锁文件解决安装错误。`pnpm-workspace.yaml` 仅允许所需的 esbuild 安装构建；不要开放所有依赖的构建脚本。

默认开发地址是 `http://127.0.0.1:4186/`。不在启动时请求模型密钥，不需要数据库。

## 环境变量

复制 [.env.example](../../.env.example) 为 `.env.local`。本地学习时可以全部留空。

| 变量 | 读取端 | 默认 | 用途 |
| --- | --- | --- | --- |
| `AIGUIDE_SITE_URL` | Vite 配置／构建 | 空 | 正式 HTTPS 站点根地址，支持子目录；生成 canonical 和 sitemap |

地址不能带账号、查询参数或 Hash。部署到子目录时包含完整子路径。操作系统环境变量优先于 `.env.local`。修改后重新启动开发服务或重新构建。

应用不读取 API Key。将来新增在线接口时，密钥必须由服务端管理，不能放进 `src/`、`public/` 或 `VITE_*`。

## 日常修改流程

1. 查看当前目录和 Git 状态，确认不是外层总仓库。
2. 找到实际模块与最终组装数据，阅读相关测试。
3. 实现一个明确问题，沿用现有依赖、样式与状态约定。
4. 运行相关测试，再运行 `pnpm check`。
5. UI 改动用浏览器检查；记录具体路径、宽度、交互与未测范围。
6. 更新对应文档和待办，查看 diff 后再提交。

统一检查入口是 `scripts/check-project.mjs`。它通过当前 Node 可执行文件启动子任务，不依赖开发者个人的绝对路径，也不要求在 PowerShell 中使用 Bash 语法。

## 生产预览

```sh
pnpm build
pnpm preview --port 4190
```

生产预览默认也使用 4186；开发服务仍运行时改用 4190。测试进度与日常浏览进度最好使用不同端口或独立浏览器配置，防止测试填写影响自己的记录。

开发服务刷新排名写入 `public/data/rankings/`；生产预览刷新写入 `dist/data/rankings/`。要把新快照交付到下一次构建，应运行 `pnpm refresh:rankings`。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| `pnpm` 未找到 | 核对 Node/npm，安装文档指定 pnpm；重开终端刷新 PATH |
| Node 版本不满足 | 切换 Node 24，重新安装锁定依赖；不要通过忽略 engine 约束运行 |
| 4186 被占用 | 先确认是已有服务还是其他程序；复用原服务或显式换端口，不直接杀掉未知进程 |
| Vite 配置加载异常 | 脚本已使用 `--configLoader native`；核对 Node 与依赖安装 |
| 原记录突然消失 | 核对协议、主机名、端口是否变化；到原来源导出备份，再导入目标来源 |
| 新内容没出现在页面 | 查看 `src/data/index.js` 后置覆盖；独立页的生产版本需重新构建 |
| 资料链接审计不稳定 | 403、429、超时可能是访问限制；Windows 可用 `--system-http`，保留真实状态 |
| 榜单更新失败 | 查看来源和快照状态，不能用新日期覆盖旧快照；详见排名维护 |

## 历史设计工具

`docs/ui-redesign/render-brand-reference.cjs` 是历史素材排版工具，不参与运行、构建或 CI。它额外需要调用者自行提供 `sharp`；主项目不为历史工具新增图像依赖。

详细验证要求见[质量与验收](QUALITY.md)，首次上传 GitHub 见[发布指南](RELEASE.md)。
