import React from 'react';
import { CompanyMark, ToolMark } from './Shared.jsx';
import { Icon } from './Icon.jsx';

export function CompanyLearningEntries({ company, sections, detailed = false }) {
  return <div className={'company-learning-entries' + (detailed ? ' detailed' : '')}>{sections.map(section => <section className="company-learning-entry" key={section.id} aria-label={`${company.name} ${section.name}`}>
    <h3><Icon name={section.icon} size={19}/>{section.name}</h3>
    <div className="company-entry-content">{detailed && <p>{section.hint}</p>}<div className="company-entry-links">{section.links.map(link => <a key={link.id} href={link.href} aria-label={`${company.name} ${section.name} ${link.label}`}><ToolMark tool={link.tool} size="small"/><span>{link.label}</span><Icon name="chevron" size={13}/></a>)}</div></div>
  </section>)}</div>;
}

export function CompanyLearningCard({ group }) {
  const { company, subtitle, sections } = group;
  return <article className="learning-company-card" aria-labelledby={'company-title-' + company.id}>
    <header><CompanyMark company={company}/><div><h2 id={'company-title-' + company.id}>{company.name}</h2><p>{subtitle}</p></div></header>
    <CompanyLearningEntries company={company} sections={sections}/>
    <a className="learning-company-footer" href={'#/company/' + company.id} aria-label={`${company.name} 全部教程`}>全部教程<Icon name="arrow" size={16}/></a>
  </article>;
}
