import React, { useState } from 'react';
import { feedbackRepository, feedbackTracks } from '../lib/public-feedback.js';
import { FeedbackDelivery } from '../components/FeedbackDelivery.jsx';
import { AnalyticsNotice } from '../components/AnalyticsNotice.jsx';
import { PageHeading } from '../components/Shared.jsx';
import { copyText, useLearning } from '../lib/hooks.jsx';
import '../styles-guidance.css';
import '../styles-feedback.css';

export function Feedback({ route }) {
  const [track, setTrack] = useState(feedbackTracks.some(item => item.id === route.params.get('track')) ? route.params.get('track') : 'doubao');
  const [outcome, setOutcome] = useState('还没完成，卡在某一步');
  const [experience, setExperience] = useState('第一次使用这类工具');
  const [minutes, setMinutes] = useState('');
  const [detail, setDetail] = useState('');
  const { notify } = useLearning();
  const selected = feedbackTracks.find(item => item.id === track);
  const record = detail.trim() ? `AIGuide 真人试用反馈\n\n主线：${selected.name}\n使用基础：${experience}\n结果：${outcome}\n大约用时：${minutes || '未记录'}\n\n【实际操作与卡点】\n${detail.trim()}\n\n由读者本人填写，尚未提交。请说明实测设备、软件版本和日期；不填写个人订阅、密钥或私人对话。` : null;
  return <div className="feedback-page"><PageHeading title="用过一次，再告诉我们。" description="选一条主线，试着独立完成。卡住、没做完，也都是有价值的反馈。"/>
    <div className="feedback-tracks">{feedbackTracks.map(item => <a href={item.href} key={item.id}><span>试用任务</span><h2>{item.name}</h2><p>{item.task}</p><strong>开始试用 →</strong></a>)}</div>
    <section className="lesson-feedback"><h2>留下你的实际体验</h2><p>建议先独立尝试，再记录卡点。没有做过的步骤请写“未尝试”。这里不会读取你的学习草稿或其他软件中的对话，也不会在填写时上传内容。</p>
      <div className="feedback-fields"><div><label htmlFor="trial-track">这次试了哪条主线</label><select id="trial-track" value={track} onChange={event => setTrack(event.target.value)}>{feedbackTracks.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><div><label htmlFor="trial-experience">开始前的基础</label><select id="trial-experience" value={experience} onChange={event => setExperience(event.target.value)}>{['第一次使用这类工具', '用过 AI 对话，没有做过这项任务', '已经做过类似任务', '维护者或自动化检查（不计真人试用）'].map(item => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="trial-outcome">实际结果</label><select id="trial-outcome" value={outcome} onChange={event => setOutcome(event.target.value)}>{['还没完成，卡在某一步', '独立完成并打开了成果', '借助他人帮助完成', '只阅读了教程，尚未实操'].map(item => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="trial-minutes">大约用了多久（可不填）</label><input id="trial-minutes" value={minutes} onChange={event => setMinutes(event.target.value)} maxLength={30} placeholder="例如：20 分钟"/></div></div>
      <label htmlFor="trial-detail">哪一步顺利，哪一步卡住了？</label><textarea id="trial-detail" maxLength={4000} value={detail} onChange={event => setDetail(event.target.value)} placeholder={"日期、系统和软件版本：\n我做了什么：\n卡在哪个步骤 / 哪句话没看懂：\n最后是否打开了实际成果：\n最希望修改的一处："} aria-describedby="trial-help"/><p id="trial-help">最多 4,000 字。只收集改善教程所需的信息；请勿填写订阅、密码、验证码和私人对话。离开页面前请先保存。</p>
      <FeedbackDelivery title={`[试用反馈] ${selected.name}`} record={record}/><button className="button secondary" type="button" disabled={!record} onClick={() => copyText(record, notify, '试用记录已复制，尚未提交。')}>先复制记录留存</button>
    </section>
    <section className="soft-panel"><h2>反馈会怎么处理</h2><p>反馈发布在公开仓库，我们按无法继续、步骤不符、说明难懂整理问题，并在对应 Issue 更新处理结果。提交成功以 GitHub 的 Issue 编号为准；填写这个页面还不算提交。</p><a className="text-link" href={feedbackRepository + '/issues'} target="_blank" rel="noopener noreferrer">查看已收到的问题与处理进展 →</a></section>
    <section className="feedback-policy"><h2>访问数据与赞助</h2><AnalyticsNotice/><p>以后洽谈赞助时会说明统计时间、来源和样本量，排除维护测试；商业内容会标明“赞助”或“推广”，不以付费换取教程结论。当前没有已实测推荐的订阅商。</p><a className="text-link" href="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" target="_blank" rel="noopener noreferrer">Cloudflare 的数据说明 →</a></section>
  </div>;
}
