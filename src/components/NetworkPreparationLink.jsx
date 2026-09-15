import React from 'react';
import { Icon } from './Icon.jsx';
import '../styles-start.css';

export function NetworkPreparationLink() {
  return <aside className="network-preparation-link" aria-label="工具使用前的网络准备"><span className="network-preparation-icon"><Icon name="globe" size={23}/></span><div><strong>使用前准备 · 网络环境</strong><p>目标工具打不开时，了解客户端、订阅、连接验证与恢复。已能正常使用时可跳过。</p></div><a className="text-link" href="#/path/network">查看准备教程<Icon name="arrow" size={17}/></a></aside>;
}
