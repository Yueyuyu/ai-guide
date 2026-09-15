import React, { useState } from 'react';

const claims = [
  { id: 'registration', statement: '参加者要在10月10日18:00前填写报名表。', supported: true, reason: '原文明确说明了参加者、事项和报名截止时间。' },
  { id: 'owner', statement: '小林必须在10月10日18:00前收集完报名信息。', supported: false, reason: '这个时间是参加者报名的截止时间。小林收集报名信息的截止时间未提供，应写“待确认”。' },
  { id: 'place', statement: '读书会在社区图书馆举行，小林担任主持人。', supported: false, reason: '本课原通知的地点另行通知、主持人尚未确定。不能凭空添加地点或把收集报名的负责人当成主持人。' },
];

export function NoticeReviewLab() {
  const [answers, setAnswers] = useState({});
  const [show, setShow] = useState(false);
  const count = Object.keys(answers).length;
  const correct = claims.filter(claim => answers[claim.id] === claim.supported).length;
  return <div className="notice-review-lab"><h3>先练习：这句话有原文依据吗？</h3><p>下面三句由本站编写，用来练习核对；不是豆包的真实回答。请只看本课原通知。</p>
    {claims.map((claim, index) => <fieldset key={claim.id}><legend>{index + 1}. {claim.statement}</legend>{[[true, '原文支持'], [false, '需要纠正']].map(([value, label]) => <label key={label}><input type="radio" name={'notice-claim-' + claim.id} checked={answers[claim.id] === value} onChange={() => { setAnswers(current => ({ ...current, [claim.id]: value })); setShow(false); }}/>{label}</label>)}{show && <p className="claim-explanation">{answers[claim.id] === claim.supported ? '判断正确。' : '再对照原文看一次。'}{claim.reason}</p>}</fieldset>)}
    <button type="button" className="button secondary" disabled={count !== claims.length} onClick={() => setShow(true)}>核对这三句</button><p role="status">{show ? `${correct} / ${claims.length} 句判断正确。${correct === claims.length ? '现在把同样的方法用到你取得的回答上。' : '修正判断后可以重新核对。'}` : `已判断 ${count} / ${claims.length} 句。全部选完后查看解析。`}</p><small>本练习只在当前页面运行，不会标记课程完成。</small>
  </div>;
}
