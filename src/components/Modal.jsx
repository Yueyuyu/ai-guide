import React, { useEffect, useRef } from 'react';
import { Icon } from './Icon.jsx';

// 原生 dialog 管理焦点边界和 Escape；关闭后回到原来的触发控件。
export function Modal({ open, onClose, title, className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; if (trigger?.isConnected) trigger.focus(); };
  }, [open]);
  return <dialog ref={ref} className={'guide-dialog ' + className} aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><div className="dialog-content"><header><h2>{title}</h2><button type="button" className="icon-button" aria-label={'关闭' + title} onClick={onClose}><Icon name="close"/></button></header>{open && children}</div></dialog>;
}
