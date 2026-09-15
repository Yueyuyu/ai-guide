import React from 'react';
import { EmptyState, PageHeading, SearchBox } from '../components/Shared.jsx';
import { Icon } from '../components/Icon.jsx';
import { CompanyLearningCard } from '../components/CompanyLearningCard.jsx';
import { NetworkPreparationLink } from '../components/NetworkPreparationLink.jsx';
import { filterLearningCompanies, learningEntries, resolveLearningEntry } from '../lib/company-learning.js';
import '../styles-tools.css';

export function Tools({ route }) {
  const query = route.params.get('q') || '';
  const entry = resolveLearningEntry(route.params);
  const apply = patch => { window.location.hash = '#/tools?' + new URLSearchParams({ q: query, entry, ...patch }); };
  const groups = filterLearningCompanies({ query, entry });
  return <div className="learning-directory">
    <PageHeading title="选一个工具，开始学。" description="按公司找到熟悉的产品，选网页版或桌面版开始。" aside={<a href="#/start" className="directory-start-link">第一次来？选择入门工具<Icon name="arrow" size={16}/></a>}/>
    <NetworkPreparationLink/>
    <div className="learning-directory-controls"><SearchBox query={query} onSearch={q => apply({ q })} placeholder="搜索公司或产品"/>
      <div className="learning-entry-filters" role="group" aria-label="教程分类">{[{ id: 'all', name: '全部' }, ...learningEntries].map(item => <button type="button" key={item.id} aria-pressed={entry === item.id} onClick={() => apply({ entry: item.id })}>{item.name}</button>)}</div>
    </div>
    <div className="learning-directory-caption"><h2>按公司浏览</h2><span role="status">{groups.length} 家公司{(query || entry !== 'all') && <button type="button" onClick={() => apply({ q: '', entry: 'all' })}>清除筛选<Icon name="close" size={13}/></button>}</span></div>
    <div className="learning-company-grid">{groups.map(group => <CompanyLearningCard key={group.company.id} group={group}/>)}</div>
    {!groups.length && <EmptyState title="没有找到匹配的教程" description="换个公司或产品名，或清除筛选后重新浏览。" action="查看全部公司" onAction={() => apply({ q: '', entry: 'all' })}/>}
  </div>;
}
