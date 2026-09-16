import React from 'react';
import { Icon } from './Icon.jsx';
import '../styles-artifact-comparison.css';

export function ArtifactComparison({ comparison, group }) {
  return <div className="artifact-comparison">
    <h3>{comparison.title}</h3>
    <p className="artifact-comparison-caption">{comparison.caption}</p>
    {comparison.items.map(item => <details key={item.title} name={group}>
      <summary>{item.title}<Icon name="down" size={16}/></summary>
      <div className="artifact-versions">{item.versions.map((version, index) => <div className={'artifact-version artifact-version-' + index} key={version.label}>
        <strong className="artifact-version-label"><span aria-hidden="true">{index + 1}</span>{version.label}</strong>
        {version.excerpts.map(text => <blockquote key={text}>{text}</blockquote>)}
        {version.note && <p className="artifact-version-note">{version.note}</p>}
        <a href={import.meta.env.BASE_URL + version.href + '.html'} target="_blank" rel="noreferrer" aria-label={'查看' + version.label + '完整文件（新窗口）'}>查看完整文件<Icon name="external" size={13}/></a>
      </div>)}</div>
      <p className="artifact-takeaway"><Icon name="check" size={16}/>{item.takeaway}</p>
    </details>)}
  </div>;
}
