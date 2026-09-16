import React, { useState } from 'react';
import { Modal } from './Modal.jsx';

export function TutorialImage({ screenshot, showNotes = true }) {
  const [open, setOpen] = useState(false);
  const markers = screenshot.markers || [];
  const picture = <div className="tutorial-image-frame"><img src={import.meta.env.BASE_URL + screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy"/>{markers.map((marker, i) => <span className="tutorial-image-marker" key={marker.title} style={{ left: marker.x + '%', top: marker.y + '%' }} aria-hidden="true">{marker.number || i + 1}</span>)}</div>;
  return <figure className="tutorial-figure"><button className="tutorial-image-button" type="button" onClick={() => setOpen(true)} aria-label={'放大截图：' + screenshot.alt}>{picture}<span className="tutorial-zoom-hint">点击看大图 ↗</span></button><figcaption>{screenshot.caption}{screenshot.sourceUrl && <> · <a href={screenshot.sourceUrl} target="_blank" rel="noreferrer">官方来源</a></>}</figcaption>{showNotes && markers.length > 0 && <ol className="tutorial-image-notes">{markers.map((marker, i) => <li key={marker.title}><span>{marker.number || i + 1}</span><div><strong>{marker.title}</strong><p>{marker.description}</p></div></li>)}</ol>}<Modal open={open} onClose={() => setOpen(false)} title={screenshot.title || '操作截图'} className="tutorial-image-dialog">{picture}<p className="fine-print">{screenshot.caption}</p></Modal></figure>;
}
