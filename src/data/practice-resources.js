import { noticeMaterial } from './doubao-notice.js';

export const researchMaterial = `材料 A｜读书会原通知（虚构练习材料）
来源：本站练习文件；发布日期：材料未提供
${noticeMaterial}

材料 B｜读书会补充通知（虚构练习材料）
来源：本站练习文件；发布日期：材料未提供；顺序：晚于材料 A
10月12日读书会开始时间由14:00调整为14:30。
活动地点确定为社区图书馆二楼活动室。
报名截止时间和携带书籍要求不变。
主持人仍未确定。`;

export const writingMaterial = `改写任务：把下面的活动介绍写成给社区居民看的简短通知。
只修改表达，不补报名链接、年份、结束时间或联系人。

原稿：我们非常隆重地告诉大家，读书会即将震撼开启！10月12日14:30，社区图书馆二楼活动室。欢迎带一本自己想分享的书。报名请在10月10日18:00前填写报名表。一定要认真注意，这个机会特别值得大家关注。主持人还没确定。

希望得到：120字以内的通知正文，以及没有材料依据的待确认事项。`;

export const weeklyMaterial = `本周记录（2026年9月7日至11日，虚构练习材料）
W1｜9月7日｜小林｜完成｜整理12条客户问题，已交给小陈。
W2｜9月8日｜小陈｜进行中｜FAQ草稿完成8条，还有4条待核对。
W3｜9月9日｜小林｜阻塞｜产品截图更新等待设计稿，交付时间未定。
W4｜9月10日｜小陈｜计划｜下周安排一次FAQ评审，具体日期待确认。
W5｜9月11日｜小林｜完成｜修正3条问题分类。这3条属于W1中的12条，不是新增问题。
W2（重复记录）｜9月8日｜小陈｜进行中｜FAQ草稿完成8条，还有4条待核对。

任务：整理本周周报；保留来源编号；相同W2去重；不要把12条和3条相加，不把计划写成已完成。`;

export const personalBrief = `个人主页需求单（虚构练习信息）
名字：林同学
简介：正在学习用AI整理资料、改进日常工作和制作小网页。
项目一：读书清单｜给想读的书做分类与简短笔记。
项目二：活动计划｜把活动准备事项整理成可核对的清单。
项目三：学习手记｜记录每周学会的一项小技能。
联系说明：练习页面，暂不提供真实联系方式。

页面要求：简介、三个项目、联系说明三个部分；中文界面；导航跳到对应板块。
实现要求：只创建index.html和README.md，样式写在HTML中，不安装依赖，不请求外部图片、字体或接口。
验收：双击index.html可打开；320px和1440px宽度内容完整；Tab可聚焦链接；刷新正常。
边界：本地练习，不添加登录、支付、表单或公开部署。`;

export const websiteChecklist = `网页验收记录（请按实际结果填写）
项目文件夹：
打开方式：
核对日期：

1. 内容：姓名、简介、三个项目和联系说明与需求单一致？
2. 导航：简介、项目、联系链接分别到达正确板块？
3. 桌面：1440px宽度有无文字重叠、图片缺失、整页横向滚动？
4. 手机：320px及390px宽度是否能完整阅读？
5. 键盘：用Tab逐个聚焦，用Enter打开链接，焦点是否可见？
6. 刷新：重新打开、刷新后是否仍正常？
7. 差异：只修改了计划中的文件？

已确认的问题：
复现步骤：
实际结果：
预期结果：
修复后复查：
尚未检查的设备与操作：

保存这份记录与网页文件；未做的检查写“未检查”，不填“通过”。`;

export const apiContract = `输出校验练习（本地模拟，不调用模型）
业务：把一条通知整理为任务列表。
输入示例：小林周五前整理报名表，活动地点未定。
返回结构：{"tasks":[{"title":"整理报名表","owner":"小林","due":"周五前"}],"questions":["活动地点"]}
约束：tasks为数组，每项只含title、owner、due；title为1至200字的非空文本；owner、due缺失时为null；questions为非空文本数组。
长度：最多20个任务、20个问题；每个文本最多200字；原始响应最多12000字符。
空任务：tasks可以为空，但不能把无任务结果当作任务创建成功。
边界：结构校验不能证明事实正确，仍需对照原通知。
处理方案：格式错误不继续写入；401检查认证；429按服务说明有限等待；超时记录为结果未确认。`;

export const resourceFiles = {
  'research-material.txt': researchMaterial,
  'writing-material.txt': writingMaterial,
  'weekly-records.txt': weeklyMaterial,
  'personal-brief.txt': personalBrief,
  'website-checklist.txt': websiteChecklist,
  'api-contract.txt': apiContract,
};

export const resourceLink = (filename, label) => ({ href: 'practice/' + filename, filename: 'AIGuide-' + filename, label });
export const projectResources = {
  'research-note': { lesson: 'research-first', path: 'office', links: [resourceLink('research-material.txt', '下载两份练习通知')] },
  'personal-page': { lesson: 'website-check', path: 'builder', links: [resourceLink('personal-brief.txt', '下载网页需求单'), resourceLink('website-checklist.txt', '下载验收清单')], preview: 'practice/personal-page-reference.html' },
  'weekly-workflow': { lesson: 'workflow-basics', path: 'office', links: [resourceLink('weekly-records.txt', '下载本周工作记录')] },
};
