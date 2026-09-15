import React, { useEffect, useState } from 'react';
import { useLearning, copyText } from '../lib/hooks.jsx';
import { Icon } from './Icon.jsx';
import { Modal } from './Modal.jsx';

export function BackupDialog({ open, onClose }) {
  const { learning, notify } = useLearning();
  const [url, setUrl] = useState('');
  const json = JSON.stringify(learning, null, 2);
  const filename = `AIGuide-学习记录-${new Date().toISOString().slice(0, 10)}.json`;
  useEffect(() => {
    if (!open) return;
    const next = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [open, json]);
  return <Modal open={open} onClose={onClose} title="给学习记录留一份备份" className="backup-dialog"><p>包含 {learning.saved.length} 篇收藏、{learning.completed.length} 篇已完成教程、练习进度和 {Object.keys(learning.drafts || {}).length} 份成果草稿。导入时与已有记录合并；同一课程已有的成果草稿优先保留。</p><div className="backup-file"><Icon name="file" size={28}/><span>{filename}</span></div><div className="button-row"><a className="button primary" href={url || undefined} download={filename} onClick={() => notify('备份已生成，请在浏览器下载列表中确认保存。')}><Icon name="download" size={17}/>下载备份文件</a><button className="button secondary" type="button" onClick={() => copyText(json, notify, '备份内容已复制，可保存为 .json 文件后导入。')}><Icon name="copy" size={17}/>复制备份内容</button></div><details><summary>查看备份内容</summary><textarea readOnly aria-label="学习记录备份内容" value={json}/></details></Modal>;
}
