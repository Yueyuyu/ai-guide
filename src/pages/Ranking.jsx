import React from 'react';
import { PageHeading, EmptyState } from '../components/Shared.jsx';
import { Icon } from '../components/Icon.jsx';
import { RankingChart } from '../components/RankingChart.jsx';
import { rankingSources, rankingPurposes, resolvePurpose, dateTime } from '../lib/rankings.js';
import { rankingCounts, resolveRankingCount } from '../lib/ranking-chart.js';
import { useRankings } from '../lib/useRankings.js';
import { ageInDays } from '../lib/content-maintenance.js';
import '../styles-ranking.css';

export function Ranking({ route }) {
  const { snapshot, busy, error, attempt, load, refresh } = useRankings();
  const purpose = resolvePurpose(route.params.get('purpose'));
  const count = resolveRankingCount(route.params.get('count'));
  const source = rankingSources.find(item => item.id === route.params.get('source')) || rankingSources[0];
  const metric = source.id === snapshot?.sourceId ? snapshot.metrics.find(item => item.id === purpose) : null;
  const snapshotAge = snapshot ? ageInDays(snapshot.retrievedAt) : null;
  const update = patch => { window.location.hash = '#/ranking?' + new URLSearchParams({ purpose, source: source.id, count, ...patch }); };
  return <div className="ranking-page">
    <PageHeading title="按用途，看模型排名。" description="柱子越高，这项评测得分越高。先看表现，再选适合自己的模型。"/>
    <div className="rank-controls"><div className="type-tabs" aria-label="评测用途">{rankingPurposes.map(item => <button key={item.id} type="button" aria-pressed={purpose === item.id} onClick={() => update({ purpose: item.id })}>{item.title}</button>)}</div>
      <div className="rank-source-controls"><label><span className="sr-only">榜单来源</span><select aria-label="榜单来源" value={source.id} onChange={event => update({ source: event.target.value })}>{rankingSources.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>{source.id === 'aa' && <button type="button" className="button secondary" disabled={!!busy} onClick={refresh}>{busy === 'refresh' ? '更新中…' : '更新榜单'}<Icon name="down" size={15}/></button>}</div>
    </div>
    <div className="rank-provenance"><a href={source.url} target="_blank" rel="noreferrer">{source.name} 原始榜单<Icon name="external" size={13}/></a>{source.id === 'aa' && <><span>获取：{snapshot ? dateTime(snapshot.retrievedAt) : '尚未获取'}（北京时间）</span><span>评测更新：{snapshot ? dateTime(snapshot.sourceUpdatedAt) : '尚未获取'}</span></>}</div>
    {source.id === 'aa' && snapshotAge >= 7 && <p className="review-age-note">这份快照已获取 {snapshotAge} 天。可尝试更新榜单，或前往原始来源查看近期变化；当前没有自动更新。</p>}
    {source.id === 'aa' && busy && <p role="status" className="fine-print rank-loading">{busy === 'load' ? '正在读取榜单快照…' : '正在获取并校验来源，保留当前榜单供查看。'}</p>}
    {source.id === 'aa' && error && <div className="notice warning" role="alert"><Icon name="file"/><div><strong>{snapshot ? '更新暂未成功，保留已有数据' : '暂时无法读取榜单'}</strong><p>{error}</p>{attempt?.attemptedAt && <p>最近尝试：{dateTime(attempt.attemptedAt)}</p>}<button type="button" className="text-link" onClick={load} disabled={!!busy}>重新读取快照<Icon name="arrow"/></button></div></div>}
    {source.id === 'arena' ? <EmptyState title="Arena 暂无已核实快照" description="本次读取公开榜单返回 HTTP 403，尚未获得可验证数据。此处不使用其他来源的分数代替 Arena 排名。" href={source.url} action="前往 Arena 查看"/> : !metric && !busy ? <EmptyState title={snapshot ? '这个用途还没有接入可核实数据' : '还没有可显示的榜单'} description={snapshot ? '目前接入综合能力和终端编程评测。中文、图像、视频需要各自的评测来源，不能沿用综合分数。' : '可以更新来源，或先了解模型选择方法。'} href="#/models" action="先看模型指南"/> : metric && <>
      <div className="rank-chart-toolbar"><div><h2>{purpose === 'coding' ? '终端编程' : '综合能力'}</h2><span>{purpose === 'coding' ? 'Terminal-Bench v4.0' : 'Intelligence Index v4.3'}</span></div><div className="rank-counts" aria-label="显示名次范围">{rankingCounts.map(value => <button key={value} type="button" aria-pressed={count === value} onClick={() => update({ count: value })}>{value === 'all' ? '全部' : '前 ' + value + ' 名'}</button>)}</div></div>
      <RankingChart key={source.id + ':' + metric.id} metric={metric} count={count} busy={busy === 'refresh'}/>
      <details className="rank-method"><summary>评测方法与排名说明<Icon name="down" size={15}/></summary><h3>{metric.name}</h3><p>{metric.description}</p><p>{snapshot.selection}</p><p>名次仅在本页收录的配置中计算，筛选范围与源站默认视图可能不同。前 10 或 20 名遇到并列时会一起展示。</p><p>{snapshot.sourceDateNote}</p><p>显示分数保留两位小数，排序和柱高使用原始精度。相同显示分数不一定完全同分，细小差距不能证明有显著能力差异。不同推理强度和 fallback 配置分别列出。</p><a href={metric.methodologyUrl} target="_blank" rel="noreferrer" className="text-link">阅读来源的评测方法<Icon name="external" size={15}/></a></details>
    </>}
    <div className="rank-learning-link"><p>看完排名，还要核对入口、账号和任务需求。</p><a className="text-link" href="#/models">去模型指南学习<Icon name="arrow" size={16}/></a></div>
  </div>;
}
