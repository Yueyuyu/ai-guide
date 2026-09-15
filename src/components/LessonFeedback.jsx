import React, { useId, useState } from 'react';
import { correctionRecord, correctionTypes } from '../lib/content-maintenance.js';
import { copyText, useLearning } from '../lib/hooks.jsx';
import { Icon } from './Icon.jsx';
import { FeedbackDelivery } from './FeedbackDelivery.jsx';
import '../styles-feedback.css';

export function LessonFeedback({ lesson }) {
  const [type, setType] = useState(correctionTypes[0]);
  const [section, setSection] = useState('整篇教程');
  const [description, setDescription] = useState('');
  const { notify } = useLearning();
  const prefix = useId();
  const record = correctionRecord({ lesson, type, section, description });
  const download = () => {
    if (!record) return;
    const url = URL.createObjectURL(new Blob(['\uFEFF', record], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = `AIGuide-问题记录-${lesson.id}.txt`;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    notify('已生成本地问题记录，尚未发送给网站维护者。');
  };
  return <details className="lesson-feedback"><summary>这一步对不上？记录教程问题<Icon name="down" size={16}/></summary>
    <p>记下你卡住的位置。可以预览后到 GitHub 提交公开问题，也可以复制或下载记录留存；离开页面前请先保存。</p>
    <div className="feedback-fields">
      <div><label htmlFor={prefix + '-type'}>问题类型</label><select id={prefix + '-type'} value={type} onChange={event => setType(event.target.value)}>{correctionTypes.map(item => <option key={item}>{item}</option>)}</select></div>
      <div><label htmlFor={prefix + '-section'}>所在章节</label><select id={prefix + '-section'} value={section} onChange={event => setSection(event.target.value)}><option>整篇教程</option>{lesson.sections.map(item => <option key={item.title}>{item.title}</option>)}</select></div>
    </div>
    <label htmlFor={prefix + '-description'}>你做了什么，实际看到了什么？</label><textarea id={prefix + '-description'} value={description} maxLength={4000} onChange={event => setDescription(event.target.value)} placeholder="例如：电脑 Edge，已登录。按第 3 步操作后，页面显示……；我预期应该……。" aria-describedby={prefix + '-help'}/><p id={prefix + '-help'}>最多 4,000 字。请勿填写密码、验证码、密钥或私人对话。</p>
    <FeedbackDelivery title={`[教程纠错] ${lesson.title}`} record={record}/>
    <div className="guide-actions"><button type="button" className="button secondary" disabled={!record} onClick={() => copyText(record, notify, '问题记录已复制，尚未发送。')}>复制问题记录<Icon name="copy" size={16}/></button><button type="button" className="button secondary" disabled={!record} onClick={download}>下载问题记录（TXT）<Icon name="download" size={16}/></button></div>
  </details>;
}
