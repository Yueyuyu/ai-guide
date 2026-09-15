import React from 'react';
import { reviewDate, reviewLabels } from '../data/source-review.js';
import { Icon } from './Icon.jsx';
import { reviewFreshness } from '../lib/content-maintenance.js';

export function SourceReview({ review }) {
  if (!review) return null;
  const freshness = reviewFreshness(review);
  return <div className={'source-review ' + review.status}>
    <div className="review-heading"><strong>{reviewLabels[review.status]}</strong><span>本次核对：{reviewDate(review.checkedAt)}</span></div>
    <p>{review.scope}</p>
    {freshness.stale && <p className="review-age-note">有资料已超过 {freshness.interval} 天未复核，最早一份距今 {freshness.age} 天。操作前请重新核对官方入口与界面。</p>}
    {freshness.age === null && <p className="review-age-note">部分资料的核对日期无法确认，请以当前官方说明为准。</p>}
    <details><summary>查看来源与核对范围<Icon name="down" size={16}/></summary>
      <div className="review-sources">{review.sources.map(source => <div key={source.id}>
        <a href={source.url} target="_blank" rel="noreferrer">{source.title}<Icon name="external" size={15}/></a>
        <small>{source.status === 'reviewed' ? '已读取官方资料' : '仅作入口参考'} · 来源更新：{reviewDate(source.sourceUpdatedAt)}{source.retrievedAt && <> · 获取：{reviewDate(source.retrievedAt)}</>}</small>
        <p>{source.scope}</p>
      </div>)}</div>
      <p className="review-limit">{review.limit}</p>
    </details>
  </div>;
}
