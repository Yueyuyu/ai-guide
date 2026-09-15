# AIGuide 全站设计目录

更新：2026-09-15。工具目录与公司详情已采用新的 [公司玻璃卡片](../ui-tools-glass/design-notes.md)，下表相应旧稿仅作历史参考。

首页视觉基准已由用户选定。2026-09-14 已将首页和 14 种内页接入本地可点击原型。设计稿仍供逐页审阅；本地交互通过不表示第三方产品步骤或实时模型数据已经核实。

## 已有设计稿

| 页面 | 原图 | 内容重点 |
| --- | --- | --- |
| 首页 | [已选首页 V3](aiguide-pages-v3-home.png) | 明确的入门起点、三色基础课程 |
| 学习路线总览 | [选择学习路线](aiguide-paths-overview-v1.png) | 推荐入门、适用对象、条件与学完成果 |
| 路线详情 | [AI 入门路线](aiguide-route-detail-v1.png) | 六课顺序、准备条件、开始学习 |
| 教程正文 | [软件与模型](aiguide-tutorial-reader-v1.png) | 解释、关系图、练习、下一课 |
| 产品学习页 | [豆包工作](aiguide-product-doubao-work-v1.png) | 具体使用入口、准备与分步教程 |
| 工具目录 | [玻璃卡片桌面稿](../ui-tools-glass/concept-desktop.png) · [手机稿](../ui-tools-glass/concept-mobile.png) | 每家公司一张卡，只分网页版、桌面版、API、模型 |
| 公司专题 | [当前手机效果](../ui-tools-glass/company-mobile.png) · [旧 Anthropic 稿](aiguide-company-anthropic-v1.png) | 当前沿用四类入口，进阶编程教程默认折叠 |
| 模型排名 | [榜单结构](aiguide-model-ranking-v1.png) | 历史视觉稿；当前实现已接入 AA 综合与终端编程数据 |
| 模型指南 | [模型知识导航](aiguide-model-guide-v1.png) | 基础概念、按需选择、模型系列 |
| 模型学习页 | [GPT 模型系列](aiguide-model-detail-gpt-v1.png) | 任务、版本、核对方法、软件与 API 入口 |
| 全部教程 | [课程目录](aiguide-tutorial-catalog-v1.png) | 搜索筛选、不同教程类型与适用入口 |
| 搜索结果 | [Claude 查询示例](aiguide-search-results-v1.png) | 工具、教程、模型与路线分组呈现 |
| 实战项目总览 | [成果与项目入口](aiguide-projects-overview-v2.png) | 研究笔记、个人主页、周报流程 |
| 项目任务页 | [研究笔记四阶段](aiguide-project-research-task-v1.png) | 材料、阶段任务、对应教程与验收 |
| 我的学习 | [继续学习与记录](aiguide-my-learning-v1.png) | 继续阅读、收藏、已完成、记录导入导出 |

当前为首页加 14 种内页，共 15 张主页面的桌面初稿。内容蓝图列出的主页面类型均已出稿，视觉仍待用户逐项审阅。

## 手机端与状态初稿

| 方案板 | 原图 | 覆盖画面 |
| --- | --- | --- |
| 找到学习起点 | [起点与路线 V2](aiguide-mobile-start-v2.png) | 首页、路线总览、路线详情 |
| 跟着教程学 | [阅读与学习](aiguide-mobile-learning-v1.png) | 教程正文、产品学习页、我的学习 |
| 查找工具与模型 | [工具与模型](aiguide-mobile-discovery-v1.png) | 工具目录、公司专题、模型排名 |
| 完成第一个成果 | [实战流程](aiguide-mobile-practice-v1.png) | 项目总览、项目任务进行中、完成后 |
| 遇到空白也能继续 | [空状态与异常](aiguide-mobile-states-v1.png) | 搜索无结果、无学习记录、榜单更新失败且无历史快照 |
| 先认识模型，再选择入口 | [模型指南与模型学习](aiguide-mobile-model-pages-v1.png) | 模型指南、GPT 模型学习页 |
| 找到你的下一篇教程 | [教程与搜索](aiguide-mobile-catalog-search-v1.png) | 全部教程、正常搜索结果 |
| 找得到，也回得去 | [菜单与筛选过程](aiguide-mobile-navigation-filters-v1.png) | 导航菜单、筛选面板、应用筛选后 |

共 8 张手机方案板、22 个画面，覆盖 15 种主页面的代表布局与 7 个附加状态。15 种主页面现均有桌面和手机代表稿；画面仍为节选，不表示完整长页、全部交互和屏幕尺寸已经验收。

## 平板代表布局

| 场景 | 原图 | 布局重点 |
| --- | --- | --- |
| 竖屏首页 | [平板首页](aiguide-tablet-home-v1.png) | 推荐区与三课分层，课程并列，页头导航折叠 |
| 横屏阅读 | [平板正文](aiguide-tablet-reader-v1.png) | 正文保持可读行宽，空间允许时显示侧边目录 |

这两张展示平板的关键组织方式，其他页面和平板尺寸仍需在前端原型中逐页检查。

## 当前实现与剩余工作

本地入口：`http://127.0.0.1:4186/#/`。15 类页面已接入，学习、搜索筛选、收藏、复制、项目自查和记录导入导出可以实际操作。15 类页面已检查桌面、平板、手机五种宽度，详细验证见 [本轮验收](../../design-qa.md)。

| 范围 | 当前状态 |
| --- | --- |
| 页面与响应式 | 已实现完整页面内容；主页面完成 1440／1024／768／390／320 像素布局检查 |
| 学习与查找 | 六课路线、当前路线的下一课、搜索分组、筛选草稿与应用、返回位置已接入 |
| 交互反馈 | 菜单、关系图放大、收藏、复制、练习解析、完成与撤销、项目阶段和记录预览已接入 |
| 空状态与恢复 | 无结果、无对应入口教程、旧链接失效、空学习记录、导入异常与损坏记录保护已接入 |
| 第三方产品内容 | 40 篇内容有核对记录；20 个产品有关键官方依据、11 个有待核对项，账号内操作未实测 |
| 模型排名 | 已接入 AA 公开综合与终端编程数据，支持实际刷新、日期来源、历史快照和失败保留；其他来源／用途未混用数据 |
| 发布与设备 | 本地 Chromium 验证；尚未公开部署，也未在其他真实浏览器／设备上验收 |

## 分批说明与提示词

- [第一批：路线、正文、产品](aiguide-inner-pages-v1-20260913.md) · [提示词](aiguide-inner-pages-v1-20260913.prompt.md)
- [第二批：工具、公司、排名](aiguide-discovery-pages-v1-20260913.md) · [提示词](aiguide-discovery-pages-v1-20260913.prompt.md)
- [第三批：模型指南、模型学习、全部教程](aiguide-knowledge-pages-v1-20260914.md) · [提示词](aiguide-knowledge-pages-v1-20260914.prompt.md)
- [第四批：路线总览、搜索、实战与我的学习](aiguide-completion-pages-v1-20260914.md) · [提示词](aiguide-completion-pages-v1-20260914.prompt.md)
- [第五批：手机端与关键状态](aiguide-mobile-pages-v1-20260914.md) · [提示词](aiguide-mobile-pages-v1-20260914.prompt.md)
- [第六批：剩余手机页、平板与弹层](aiguide-responsive-completion-v1-20260914.md) · [提示词](aiguide-responsive-completion-v1-20260914.prompt.md)
- [全站内容蓝图](site-content-blueprint-v1.md)

设计稿内的品牌标识保持原色作为视觉参考；网站实现应使用原始品牌文件。所有产品步骤、版本条件与排名数据需要按对应资料核对，不用生成图片代替真实证据。
