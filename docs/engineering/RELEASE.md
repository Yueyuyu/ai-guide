# GitHub 与发布指南

当前公开仓库：[Yueyuyu/ai-guide](https://github.com/Yueyuyu/ai-guide)，主分支 `main`。首次推送已完成；后续从该仓库克隆并正常提交，已有项目无需再执行初始化步骤。

## 推送前的仓库边界

本工程的仓库根应是包含 `package.json`、`src/`、`public/` 的 AIGuide 目录。不要从外层讨论、文档或多项目目录直接 `git add .`。

```sh
git rev-parse --show-toplevel
git status --short
git remote -v
```

如果返回外层目录，先将本项目作为独立仓库初始化，或复制到新的独立目录再建仓。不要继承外层仓库的远程地址。项目根已有 `.git` 时不要重复初始化。

仓库名使用 `ai-guide`，按所有者要求公开开源。原创代码、文档和练习材料采用 [MIT License](../../LICENSE)；第三方素材和商标不因公开托管而获得重新许可，见 [资产说明](../ASSETS.md)。

## 第一次提交与推送

以下命令由维护者在确认工程目录和目标仓库后执行。`<仓库地址>` 需要换成实际地址，不把它原样执行。

```sh
git init -b main
pnpm install --frozen-lockfile
pnpm check
git status --short
git add .
git diff --cached --stat
git diff --cached --check
git diff --cached
git commit -m "chore: 初始化 AIGuide 工程与维护文档"
git remote add origin <仓库地址>
git push -u origin main
```

仅在尚未初始化和没有 `origin` 时运行对应命令。已有仓库遵循已有分支和远程配置，不强推覆盖。让 AI 操作时，提交和推送分别需要当前会话的明确指令。

上传范围：源码、锁文件、工程配置、文档、测试、公开教程资产与有效数据快照。依赖、`dist/`、环境文件、临时报告、日志和凭据已由 `.gitignore` 排除。`.env.example` 是可提交的空白示例。

设计历史约占较大空间，保留它可追溯设计选择。单文件超出 GitHub 限制前应评估资产归档或 LFS，不临时删除仍被引用的资源。当前工程不依赖 LFS。

## GitHub CI

[ci.yml](../../.github/workflows/ci.yml) 在 push、pull request 与手动触发时运行 Linux／Windows 检查，固定 Node 和 pnpm。流程使用只读仓库权限，不写回代码、不自动推送、不刷新外部数据。

Linux 检查成功后保留 `dist/` 构建产物供下载。实际远程结果必须等 Actions 运行后确认。CI 通过不等于浏览器、真实产品或公开部署验收通过。

## 发布静态网站

1. 复核公开文案及资产使用范围。公开试用可先发布，账号实测与真人测试尚未完成的部分必须在课程标明，不能伪装成已完成。
2. 选择真实 HTTPS 站点地址，填入 `.env.local` 的 `AIGUIDE_SITE_URL`，或在构建环境中设置同名变量。
3. 运行 `pnpm refresh:rankings` 并复核数据；来源不可用时明确决定是否发布现有快照，不伪造更新日期。
4. 运行 `pnpm check`，使用 `pnpm preview --port 4190` 复核生产产物。
5. 将 `dist/` 发布到选择的静态托管服务；不要上传 `node_modules/` 或把 Vite 开发服务暴露成生产站。
6. 在真实域名验收主页、Hash 深链接、独立阅读、图片、下载与榜单快照。

GitHub Pages 可以使用 Actions 发布 `dist/`。如果采用仓库子目录地址，`AIGUIDE_SITE_URL` 应包含该子目录；自定义域名则填写域名根或实际部署目录。本仓库由 GitHub Pages 托管，正式地址为 `https://ai-guide.yomexa.com/`。主分支推送或手动运行 [pages.yml](../../.github/workflows/pages.yml)会在检查通过后发布。使用仓库变量 `AIGUIDE_CF_ANALYTICS_TOKEN` 可接入访问统计，详见[反馈与统计](FEEDBACK.md)。不需要部署 Vite 开发服务。

### 自定义域名

- Cloudflare 的 `yomexa.com` 区域：新增 `CNAME ai-guide → yueyuyu.github.io`，仅 DNS、TTL 自动。目标不包含协议或仓库路径。
- GitHub 仓库 Settings → Pages → Custom domain：`ai-guide.yomexa.com`；证书签发后启用 Enforce HTTPS。
- 发布工作流的 `AIGUIDE_SITE_URL`：`https://ai-guide.yomexa.com/`，不再保留 `/ai-guide/` 子目录。
- 当前使用 Actions 自定义工作流，域名由 Pages 设置管理，GitHub 不要求或读取 `CNAME` 文件。官方依据：[管理自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。
- 换域名时同步 README、仓库主页和 Web Analytics 站点，核对旧地址重定向、HTTPS、独立阅读、下载和 sitemap。

浏览器记录按来源隔离。旧 GitHub Pages 地址或本地地址的学习记录不会自动迁移到新域名；已有备份可在新站“我的学习”导入。

## 发布验收清单

- 独立 HTML 的 title、description、canonical 与实际域名一致。
- `sitemap.xml`、`robots.txt` 可访问；构建时未设置地址则不会生成它们。
- `/#/learn/...` 刷新仍能打开，`/read/...html` 不依赖 JavaScript 返回正文。
- 图片和材料链接在根目录／子目录都不指向本机磁盘。
- 榜单获取日期如实展示。静态站点击更新应说明没有后端，不能显示虚假成功。
- 学习记录、备份、导入在正式来源检查；本地旧记录需先导出再导入。
- HTTPS、404行为、缓存与可访问性按所选托管服务核对。

## 回退

保留上一次通过验收的提交与发布 Actions。若新版本异常，先定位最后成功提交，将有问题的提交用 `git revert` 生成一个可审查的恢复提交，经 `pnpm check` 后推送；发布工作流会重新部署。不要强推改写历史。首次公开版本没有更早的公开站点可回退，需要先修正或暂时取消发布。恢复后重新验证核心路径。榜单失败保留有效快照；不能通过修改日期掩盖旧数据。

回退站点文件不会恢复用户已清除的浏览器记录。涉及状态结构变化时必须提前设计兼容方案。
