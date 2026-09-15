import React from 'react';
import { lessons, tools, companies, paths } from '../data/index.js';
import { PageHeading } from '../components/Shared.jsx';
import { Icon } from '../components/Icon.jsx';
import { AnalyticsNotice } from '../components/AnalyticsNotice.jsx';

export function About() {
  return <div className="about-page"><PageHeading title="先学会使用，再慢慢深入。" description="AIGuide 是一份面向中文读者的 AI 学习手册。"/>
    <section className="soft-panel"><h2>找到起点，完成一件小事</h2><p>第一次接触AI，可以从豆包网页整理通知开始。已有基础，可以用Codex做一个网页。希望把模型接入产品，再学习API、数据约束与错误处理。</p><p>目前包含 {paths.length} 条路线、{lessons.length} 篇教程、{companies.length} 家公司和 {tools.length} 个产品与模型入口。按公司归类，按实际任务学习。</p><a className="text-link" href="#/paths">找到适合你的路线<Icon name="arrow" size={16}/></a></section>
    <section><h2>怎样看教程中的来源</h2><dl className="about-definitions"><div><dt>关键步骤有官方依据</dt><dd>公开官方资料支持文中关键操作；不表示已经在每个账号、系统和版本逐项实测。</dd></div><div><dt>部分步骤待核对</dt><dd>已确认的范围与仍待确认的功能分开记录。使用时继续核对自己的账号、版本和官方说明。</dd></div><div><dt>本站通用练习</dt><dd>材料、提示词和参考答案由本站编写。人工参考作品、界面示意和官网实拍分别标注。</dd></div></dl><p>每篇教程末尾提供来源链接、核对日期与核对范围。品牌图标保留对应品牌原色；AIGuide为独立教学网站，不代表所收录公司。</p></section>
    <section><h2>排名的日期意味着什么</h2><p>模型排名显示具体来源和获取时间；获取时间是本站取得该快照的时间，不是所有模型的评测时间。源站没有披露的日期如实写“来源未披露”。不同指标的分数不混排。</p><p>当前接入Artificial Analysis综合能力和终端编程评测。其他用途没有可靠数据时显示空状态，更新失败时保留旧快照。网站没有后台定时更新；静态版本显示构建时快照。</p><a className="text-link" href="#/ranking">查看榜单与来源<Icon name="arrow" size={16}/></a></section>
    <section><h2>你的学习记录放在哪里</h2><p>阅读位置、收藏、自查进度和填写的成果保存在当前浏览器。本站没有账号系统，也不会自动同步到另一台设备；切换浏览器、切换站点地址或清除网站数据可能看不到原记录。</p><p>在“我的学习”导出JSON备份，可以在另一浏览器导入；成果也可逐份下载为TXT。导入会合并记录，同一课程已存在的草稿优先保留。本站不会读取你在豆包、ChatGPT或其他工具中的对话。</p><a className="text-link" href="#/library?tab=drafts">查看我的成果与备份<Icon name="arrow" size={16}/></a></section>
    <section><h2>内容如何保持可复核</h2><p>教程正文会提示超过30天未复核的来源；榜单快照超过7天会提醒更新。日期按资料实际核对和快照获取计算，不会因为修改文案自动刷新。当前仍需维护者主动更新。</p><p>每篇教程末尾都能生成问题记录，附带教程、章节和你的描述。可预览后到 GitHub 提交公开问题，也可复制或下载记录留存。需要读者在 GitHub 确认发布，以 Issue 编号作为接收凭证。</p><a className="text-link" href={import.meta.env.BASE_URL + 'read/index.html'}>打开独立阅读目录<Icon name="arrow" size={16}/></a><p>每篇独立阅读页有自己的网址、标题和摘要，关闭JavaScript也能阅读。互动练习与本地进度继续在互动版使用。</p></section>
    <section><h2>试用、数据与商业内容</h2><p>公开试用版优先完善网络准备、豆包和 Codex 三条主线。真人试用与维护测试分别记录，赞助内容会明确标识，当前没有已实测推荐的订阅商。</p><AnalyticsNotice/><a className="text-link" href="#/feedback">参加试用并反馈问题<Icon name="arrow" size={16}/></a></section>
    <section><h2>学习之后，自己再核对一次</h2><p>工具与模型会更新，教程里的实操结果仍需要自己验证。应用会员与API费用分别核对；参考答案不代表真实产品输出。完成勾选仅代表你的自查记录，不是系统自动验收。</p></section>
  </div>;
}
