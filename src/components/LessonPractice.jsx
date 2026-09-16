import React from 'react';
import { useLearning, copyText } from '../lib/hooks.jsx';
import { MAX_RESULT_LENGTH, practiceResultText } from '../lib/practice-files.js';
import { Icon } from './Icon.jsx';
import { ApiResponseLab } from './ApiResponseLab.jsx';
import { NoticeReviewLab } from './NoticeReviewLab.jsx';

function ResultEditor({ lesson }) {
  const { learning, dispatch, notify } = useLearning();
  const value = learning.drafts?.[lesson.id] || '';
  const fileText = practiceResultText(lesson, value);
  const download = () => {
    if (!fileText) return;
    const url = URL.createObjectURL(new Blob(['\uFEFF', fileText], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = lesson.resultSaving.filename;
    document.body.appendChild(link); link.click(); link.remove();
    // 下载交给浏览器后再释放，避免尚未读取 Blob 就被撤销。
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    notify('已发起下载，请打开文件确认内容已保存。');
  };
  return <div className="lesson-result-editor"><label htmlFor={'result-' + lesson.id}>{lesson.resultSaving.label || '我的整理结果'}</label><p id="result-help">填写自己实际完成的结果；最多 {MAX_RESULT_LENGTH.toLocaleString('zh-CN')} 字。内容随学习记录保存在当前浏览器。</p><textarea id={'result-' + lesson.id} aria-describedby="result-help" value={value} maxLength={MAX_RESULT_LENGTH} placeholder={lesson.resultSaving.placeholder || '把已经核对的回答粘贴到这里……'} onChange={event => dispatch({ type: 'draft', id: lesson.id, text: event.target.value })}/><div className="lesson-result-actions"><button type="button" className="button primary" disabled={!fileText} onClick={download}><Icon name="download"/>下载我的成果（TXT）</button><button type="button" className="button secondary" disabled={!fileText} onClick={() => copyText(fileText, notify)}>复制成果全文</button></div><p className="fine-print">下载文件包含练习材料和你填写的结果。完成情况仍需自己核对。</p><a className="text-link" href="#/library?tab=drafts">查看我的全部成果<Icon name="arrow" size={16}/></a></div>;
}

export function LessonPractice({ section, lesson }) {
  return <>
    {section.reference && <details className="lesson-reference"><summary>对照人工参考答案<Icon name="down" size={16}/></summary><p>{section.reference.label}</p><div className="lesson-reference-scroll" tabIndex={0} role="region" aria-label="人工参考答案，可横向滚动"><table><caption className="sr-only">{section.reference.label}</caption><thead><tr>{section.reference.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{section.reference.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div></details>}
    {section.resultEditor && <ResultEditor lesson={lesson}/>}
    {section.apiLab && <ApiResponseLab/>}
    {section.noticeReview && <NoticeReviewLab/>}
    {section.faq && <div className="lesson-faq">{section.faq.map(([question, answer]) => <details key={question}><summary>{question}<Icon name="down" size={17}/></summary><p>{answer}</p></details>)}</div>}
    {section.links && <div className="lesson-resource-links">{section.links.map(link => <a className="text-link" key={link.href} href={link.href} {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{link.label}<Icon name={link.external ? 'external' : 'arrow'} size={16}/></a>)}</div>}
  </>;
}
