import React, { useId, useState } from 'react';
import { feedbackRepository, publicIssueUrl, redactFeedback } from '../lib/public-feedback.js';
import { copyText, useLearning } from '../lib/hooks.jsx';

export function FeedbackDelivery({ title, record }) {
  const [preview, setPreview] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const id = useId();
  const { notify } = useLearning();
  const currentBody = redactFeedback(record);
  const valid = preview?.body === currentBody && preview?.title === title;
  const url = valid ? publicIssueUrl(preview) : null;
  const manual = url === `${feedbackRepository}/issues/new`;
  return <div className="feedback-delivery">
    <button className="button primary" type="button" disabled={!record} onClick={() => { setPreview({ title, body: currentBody }); setConfirmed(false); }}>预览并提交反馈</button>
    {valid && <section aria-label="公开反馈预览" className="feedback-preview">
      <h3>先检查将公开的内容</h3><p>下一步会打开 GitHub，需要登录。正文将写入新建 Issue 页面，只有你在那里点击提交才会发布。不要公开订阅链接、密钥、账号或私人对话；下面已移除常见链接和凭据，仍请逐字检查。</p>
      <pre tabIndex={0}>{preview.body}</pre>
      <label className="feedback-consent"><input id={id} type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)}/>我已检查内容，知道提交后所有人都能看到</label>
      {manual && <p>记录较长，请先复制下方内容，再粘贴到 GitHub 的正文框。完整内容不会被截断。</p>}
      <div className="guide-actions"><button className="button secondary" type="button" onClick={() => copyText(preview.body, notify, '公开记录已复制；尚未提交。')}>复制预览内容</button>
        {confirmed ? <a className="button primary" href={url} target="_blank" rel="noopener noreferrer">到 GitHub 提交{manual ? '（手动粘贴）' : ''}</a> : <button className="button primary" disabled>检查内容后继续</button>}
      </div><p>提交后以 GitHub 显示的 Issue 编号为接收凭证。没能打开或不想登录？仍可复制或下载记录留存，本站不会显示虚假的“发送成功”。</p>
    </section>}
  </div>;
}
