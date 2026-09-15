# README 展示与预览资产

更新日期：2026-09-15。

## 名称与品牌

- 网站品牌：`AIGuide`，沿用现有蓝色书页标识，不随仓库更名重做品牌。
- GitHub 仓库：`ai-guide`，使用小写和横线分隔两个单词，方便辨认与输入。
- 包名：`ai-guide`。学习记录键与网站路由保持兼容，仓库名不影响已有学习记录。

## 参考依据

2026-09-15 读取以下项目的公开 README，仅参考其信息组织方式，未复制第三方品牌或宣传图片：

| 项目 | 观察 | 本项目采用 |
| --- | --- | --- |
| [freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) | 品牌封面、清晰的学习使命、课程和贡献说明 | 首屏说明学习目标，提供清晰入口 |
| [The Odin Project](https://github.com/TheOdinProject/theodinproject) | 品牌名与仓库名写法不同，强调课程范围和贡献 | 品牌与仓库名称分别规范，保留简明说明 |
| [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) | 描述性仓库名用横线，封面、徽章、前置条件齐全 | 使用 `ai-guide`，补充前置条件与徽章 |
| [Dify](https://github.com/langgenius/dify) | 品牌封面、快捷链接、能力介绍与运行方式 | 产品预览前置，维护细节折叠 |

五个徽章分别说明工程检查状态、MIT 许可、React、Vite 与欢迎贡献。版本依据 package.json；工程检查使用 GitHub 动态徽章，不写死“通过”。尚无线上体验地址、覆盖率报告或正式 Release，因此不展示相应徽章；社区规模由 GitHub 自身展示。

## 实际截图

截图来自源码提交 `3a57411` 对应的本地生产构建，使用内置浏览器默认 1280 × 720 视口。首页与排名截取完整页面，其余为可见区域。截图保留原始内容，未添加不存在的功能或替换分数。

| 文件 | 页面与范围 |
| --- | --- |
| [home.jpg](home.jpg) | `/#/`，首页与入门入口 |
| [tools.jpg](tools.jpg) | `/#/tools`，首行公司卡片与四类入口 |
| [lesson.jpg](lesson.jpg) | `/#/learn/doubao-notice?path=starter`，提示词、练习原文与章节目录 |
| [ranking.jpg](ranking.jpg) | `/#/ranking?purpose=intelligence&source=aa&count=all`，完整页面及图表当前可见范围 |

截图只是本站界面的证据，不表示第三方产品的登录、生成、安装或 API 调用已实测。保留图片中的来源日期；更新数据后不能把旧图片改称最新截图。

## 更新约定

页面有显著变化时重新截图并更新本页日期与源码版本。沿用真实页面、无个人资料的状态；不要把历史设计稿作为当前实现。品牌标识直接引用 public/favicon.svg，避免产生新的不一致副本。

图片放在本目录并使用相对链接。GitHub 上检查正文、图片、折叠区域与跳转，同时检查窄屏阅读。临时验收截图和日志仍放 .local/，不进入展示资产。
