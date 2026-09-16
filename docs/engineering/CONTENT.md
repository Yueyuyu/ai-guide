# 教程与产品内容维护

## 开始前找对数据源

课程最终从 `src/data/index.js` 导出。原始课程按主题拆分，部分课被入口说明或实操内容覆盖。新增和修改先确认最终 `lessonById[id]`，不要只改一份已被覆盖的基础对象。

| 内容 | 主要位置 |
| --- | --- |
| 公司、产品、入口 | `src/data/companies.js`、`products.js` |
| 路线、顺序、选学 | `src/data/catalog.js` |
| 项目阶段、自查 | `src/data/project-stages.js` |
| 新手概念与入门 | `src/data/starter-lessons.js` |
| 豆包网页实操 | `src/data/doubao-notice.js` |
| 网站、研究、办公、API 实操 | `src/data/*-practice.js` |
| 准备条件和问题帮助 | `src/data/learning-guidance.js` |
| 练习材料 | `src/data/practice-resources.js` |
| 来源登记 | `src/data/source-review.json` |

## 课程字段

| 字段 | 要求 |
| --- | --- |
| `id` | 全站唯一、稳定；不因改标题而改 ID |
| `title`、`description` | 中文说明具体任务和成果，避免只有产品名 |
| `category`、`level`、`minutes` | 使用现有分类；时长为阅读／练习建议，不作效果承诺 |
| `lessonType` | `concept`、`setup`、`operation`、`api`、`project` |
| `platform` | 使用 `products.js` 中已有的平台值；与教程实际操作入口一致 |
| `tools`、`productId` | 工具 ID 必须存在；产品专属课标明 `productId` |
| `goals`、`prerequisite` | 写明学习目标、设备、账号、访问与费用条件 |
| `sections` | 每节有 `title` 与 `paragraphs` 数组，可增加材料、截图、提示词、FAQ |
| `exercises`、`takeaway` | 自查是用户自己确认，不称为系统自动验收 |
| `edited` | 实际整理日期，不能替代官方资料或产品实测日期 |

支持的章节字段见 `Reader.jsx`、`LessonPractice.jsx` 与 `server/reading-pages.js`：`actionSteps`、`list`、`prompt`／`promptLabel`、`code`／`language`、`screenshot`、`reference`、`downloads`、`faq`、`links`、`checkpoint`、`resultEditor` 等。

新增一种章节类型时，检查互动版和独立阅读版是否都有合理显示；交互控件可在独立页提供回到对应章节的链接。

## 新增一篇课

1. 选定“谁用什么入口完成什么任务”，准备真实来源与练习材料。
2. 在适合的内容模块写课程对象，通过 `index.js` 接入。
3. 有产品归属时维护产品的来源登记；通用方法课不伪装成特定产品实测。
4. 如需进入路线或项目，更新 `sequence`、选学或阶段关系。
5. 有成果草稿时配置 `resultSaving`，并且恰好提供对应的保存章节。
6. 运行 `pnpm resources`（仅材料变化时）、`pnpm check`。
7. 检查目录发现、打开正文、复制材料、完成自查、返回路线、独立阅读。

已有章节用 `section-N` 保存位置，调整顺序可能让老记录跳到错误章节。优先在原位置补充内容；确需重排时一并处理兼容。不要更换学习记录存储键绕过迁移。

## 来源与证据

`source-review.json` 的 `sources` 保存 URL、标题、获取时间、核对时间、源更新日期、状态、范围和 SHA-256；`products` 用 `sourceIds` 关联来源，并写 `scope` 与 `limit`。

- `documented`：关键步骤有官方资料依据，不代表账号内实测。
- `partial`：部分步骤待核对，列明已确认和未确认范围。
- `practice`：本站方法练习，由组装逻辑计算，不冒充官方输出。
- 未披露日期用 `null`，不得将抓取日期填成源更新时间。
- 哈希来自实际保存或读取的内容，不编造；保存证据时附带获取方式与范围。
- HTTP 200 只说明可达；不能自动把该产品所有教程升级为已核对。

真实实测记录至少包括日期、系统、产品版本或界面范围、登录状态、实际操作、结果和证据位置。不得保存密码、验证码、密钥或私人对话。

## 材料和品牌

练习尽量使用明确标注的虚构数据。`practice-resources.js` 是六份 TXT 的内容源，运行生成命令后提交源文件与生成材料。豆包通知的单独材料保持与正文一致。

截图与示意图分别标注。截图记录时间、登录状态和适用设备；参考答案说明是人工整理。品牌保留原色，不用生成工具重绘第三方商标；来源见[资产说明](../ASSETS.md)。

公司下只向新手突出网页版、桌面版、API、模型。终端、云端执行等进阶差异在对应教学中解释，不重新增加一层复杂入口分类。

## 审计与纠错

```sh
pnpm audit:content
pnpm audit:content --links --output .local/content-audit.json
```

Windows 可加 `--system-http`。退出码：0 为所选检查通过，1 为内容引用错误或 GET 确认失效，2 为有来源仍需复核。HEAD 404/410 需用 GET 确认；403、429和网络失败不直接判定失效。

来源超过 30 天会提醒，依据最早一份已核对来源；仅修改文案或检查可达性不会刷新日期。网页末尾的问题记录只在本地生成，未来接收端设计见[迭代计划](../ROADMAP.md)。

## 简明图文写法

正文优先采用一句目的、最多三个短操作、对应截图与一句完成标准。图片与操作在宽屏并排、手机上下排列；截图必须能点击查看大图。必要限制写在操作旁，背景、版本说明放进 `supplement: { title, paragraphs, list }`，不要机械截断重要操作。

`LessonSection.jsx` 负责图文与补充折叠，`TutorialImage.jsx` 支持可选的 `markers`、通用弹窗 `title`、`sourceUrl`。编号默认顺序，可用 `marker.number` 对应操作编号；原图不变。人工参考答案默认折叠，供读者自己核对后再展开。

首轮精修豆包与 WorkBuddy，其他课程共享紧凑导读和折叠准备区，但不等于每篇都已逐句精修或补齐真实截图。已有章节顺序、记录与草稿入口保持不变。官方截图必须注明来源日期与示例性质，不能用生成图片代替操作证据。
