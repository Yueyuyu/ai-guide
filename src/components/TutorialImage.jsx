import React, { useState } from 'react';
import { Modal } from './Modal.jsx';

export function TutorialImage({ screenshot }) {
  const [open, setOpen] = useState(false);
  const picture = <div className="tutorial-image-frame"><img src={import.meta.env.BASE_URL + screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy"/>{screenshot.markers.map((marker, i) => <span className="tutorial-image-marker" key={marker.title} style={{ left: marker.x + '%', top: marker.y + '%' }} aria-hidden="true">{i + 1}</span>)}</div>;
  return <figure className="tutorial-figure"><button className="tutorial-image-button" type="button" onClick={() => setOpen(true)} aria-label={'放大截图：' + screenshot.alt}>{picture}</button><figcaption>{screenshot.caption}</figcaption><ol className="tutorial-image-notes">{screenshot.markers.map((marker, i) => <li key={marker.title}><span>{i + 1}</span><div><strong>{marker.title}</strong><p>{marker.description}</p></div></li>)}</ol><Modal open={open} onClose={() => setOpen(false)} title="豆包网页版操作截图" className="tutorial-image-dialog">{picture}<p className="fine-print">{screenshot.caption}</p></Modal></figure>;
}
