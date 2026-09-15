import React from 'react';
import { kindNames } from '../data/index.js';
import { Icon } from './Icon.jsx';
import { CompanyMark, ToolMark } from './Shared.jsx';

export function CompanyCard({ company, tools, selected, onCompare }) {
  return <article className="company-card">
    <a className="company-card-heading" href={`#/company/${company.id}`}>
      <CompanyMark company={company}/>
      <div><h2>{company.name}</h2><p>{company.products}</p></div>
      <Icon name="arrow" size={20}/>
    </a>
    <ul className="company-entry-list">
      {tools.map(tool => <li key={tool.id}>
        <a href={`#/tool/${tool.id}`}>
          <ToolMark tool={tool} size="small"/>
          <span><strong>{tool.short}</strong><small>{kindNames[tool.kind]}</small></span>
        </a>
        <label className="compare-check"><input type="checkbox" aria-label={`对照 ${tool.short}`} checked={selected.includes(tool.id)} onChange={() => onCompare(tool.id)}/>对照</label>
      </li>)}
    </ul>
    <a className="company-card-footer" href={`#/company/${company.id}`}>
      <span>查看 {company.name} 全部教程</span><Icon name="chevron" size={16}/>
    </a>
  </article>;
}
