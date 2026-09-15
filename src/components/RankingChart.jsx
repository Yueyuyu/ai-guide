import React, { useCallback, useEffect, useRef, useState } from 'react';
import { tools } from '../data/index.js';
import rankingBrands from '../data/ranking-brands.json';
import { familyByCreator } from '../lib/rankings.js';
import { rankingChartScale, visibleRankingRows } from '../lib/ranking-chart.js';
import { ToolMark } from './Shared.jsx';
import { Icon } from './Icon.jsx';
import { Modal } from './Modal.jsx';

function ModelDetails({ row, unit }) {
  const family = tools.find(tool => tool.id === familyByCreator[row.creator]);
  const app = family?.related.map(id => tools.find(tool => tool.id === id)).find(tool => tool?.kind === 'app');
  return <div className="bar-model-details"><span className="tag">{row.creator} · 本页第 {row.rank} 名</span><h3>{row.name}</h3>
    <p>原始分数：<strong>{row.score}{unit === '%' ? '%' : ' 分'}</strong></p>
    <p>这条记录是模型评测配置，不代表同名应用会员中的全部功能或可用性。显示分数相近，也不代表能力差异具有统计显著性。</p>
    <a className="text-link" href={row.sourceUrl} target="_blank" rel="noreferrer">在来源中核对这条记录<Icon name="external"/></a>
    <div className="button-row">{family && <a href={'#/model/' + family.id} className="button secondary">模型学习页<Icon name="arrow"/></a>}{app && <a href={'#/tool/' + app.id} className="button secondary">应用教程<Icon name="arrow"/></a>}<a href="#/learn/api-first" className="text-link">API 入门<Icon name="arrow"/></a></div>
  </div>;
}

export function RankingChart({ metric, count, busy }) {
  const [selected, setSelected] = useState('');
  const viewport = useRef(null);
  const [scroll, setScroll] = useState({ previous: false, next: false });
  const { maximum, ticks } = rankingChartScale(metric);
  const rows = visibleRankingRows(metric.rows, count);
  const selectedRow = metric.rows.find(row => row.id === selected);
  const updateScroll = useCallback(() => {
    const element = viewport.current;
    if (element) setScroll({ previous: element.scrollLeft > 1, next: element.scrollLeft + element.clientWidth < element.scrollWidth - 1 });
  }, []);
  useEffect(() => {
    const element = viewport.current;
    element.scrollLeft = 0;
    const observer = new ResizeObserver(updateScroll);
    observer.observe(element);
    updateScroll();
    return () => observer.disconnect();
  }, [count, rows.length, updateScroll]);
  const browse = direction => viewport.current.scrollBy({ left: direction * viewport.current.clientWidth * 0.8, behavior: 'auto' });
  const onChartKeyDown = event => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      browse(event.key === 'ArrowLeft' ? -1 : 1);
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      viewport.current.scrollLeft = event.key === 'Home' ? 0 : viewport.current.scrollWidth;
    }
  };
  return <section className="rank-column-chart" aria-label="模型得分竖向柱状图" aria-describedby="rank-chart-caption" aria-busy={busy}>
    <div className="column-axis-title">{metric.unit === '%' ? '通过率（%）' : '分数'}</div>
    <div className="column-chart-layout">
      <div className="column-y-axis" aria-hidden="true"><div>{ticks.map(tick => <span key={tick} style={{ bottom: `${tick / maximum * 100}%` }}>{tick}{metric.unit === '%' ? '%' : ''}</span>)}</div></div>
      <div ref={viewport} className="column-chart-viewport" role="region" aria-label="模型排名图表，可用左右方向键浏览" tabIndex={0} onScroll={updateScroll} onKeyDown={onChartKeyDown}>
        <div className="column-chart-canvas" style={{ '--model-count': rows.length }}>
          <div className="column-grid" aria-hidden="true">{ticks.map(tick => <span key={tick} style={{ bottom: `${tick / maximum * 100}%` }}/>)}</div>
          <ol className="column-ranking-list">{rows.map(row => {
            const name = row.shortName || row.name;
            const split = name.indexOf(' (');
            const brand = rankingBrands[row.creator];
            const family = tools.find(tool => tool.id === familyByCreator[row.creator]);
            const score = row.score.toFixed(2);
            return <li key={row.id}><button type="button" className="column-model" title={name} aria-label={`本页第 ${row.rank} 名，${name}，${score}${metric.unit === '%' ? '%' : ' 分'}，查看完整配置`} aria-haspopup="dialog" onClick={() => setSelected(row.id)}>
              <span className="column-plot" aria-hidden="true"><span className="column-fill" style={{ height: `${row.score / maximum * 100}%` }}><span className="column-value">{score}</span></span></span>
              <span className="column-model-label">
                <span className="column-brand-rank"><span className={'column-rank ' + (row.rank <= 3 ? 'leading' : '')} aria-hidden="true">{String(row.rank).padStart(2, '0')}</span>{brand ? <img className="column-brand" src={import.meta.env.BASE_URL + 'brands/rankings/' + brand.file} alt=""/> : family ? <ToolMark tool={family} size="small"/> : <Icon name="box" size={18}/>}</span>
                <span className="column-model-text"><strong>{split < 0 ? name : name.slice(0, split)}</strong><small>{split < 0 ? row.creator : name.slice(split + 1)}</small></span>
              </span>
            </button></li>;
          })}</ol>
        </div>
      </div>
    </div>
    <div className="column-chart-footer"><span>模型 <span className="column-order-note">· 按得分从高到低排列</span></span>{(scroll.previous || scroll.next) && <div className="column-browse"><span>左右浏览更多模型</span><button type="button" aria-label="查看左侧模型" disabled={!scroll.previous} onClick={() => browse(-1)}><Icon name="chevron" size={15}/></button><button type="button" aria-label="查看右侧模型" disabled={!scroll.next} onClick={() => browse(1)}><Icon name="chevron" size={15}/></button></div>}</div>
    <p id="rank-chart-caption" className="bar-chart-caption">显示 {rows.length} / {metric.rows.length} 个配置 · 柱高从 0 起算 · 点选柱子或模型查看详情</p>
    <Modal open={!!selectedRow} onClose={() => setSelected('')} title="模型评测配置" className="ranking-model-dialog">{selectedRow && <ModelDetails row={selectedRow} unit={metric.unit}/>}</Modal>
  </section>;
}
