import { tools, platforms } from './products.js';

// 两种阅读页共用符号，品牌图片保持原色。
export const tutorialSymbols = {
  desktop: 'M3 4h18v13H3z M8 21h8 M12 17v4',
  link: 'm9 15 6-6 M8 17l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M13 6l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0',
  network: 'M4 4h5v5H4z M15 15h5v5h-5z M4 15h5v5H4z M6.5 9v6 M9 6.5h8.5V15',
  download: 'M12 3v12 m-5-5 5 5 5-5 M4 17v4h16v-4',
  folder: 'M3 6h7l2 3h9v12H3z',
  file: 'M5 2h9l5 5v15H5z M14 2v6h5 M8 12h8 M8 16h6',
  check: 'm5 12 4 4L19 6',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M15 15l6 6',
  code: 'm7 6-6 6 6 6 m10-12 6 6-6 6 M14 3l-4 18',
  terminal: 'M2 3h20v18H2z m4 5 4 4-4 4 m7 0h5',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-3a8 8 0 0 1 16 0v3',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
  message: 'M3 3h18v14H9l-6 4z M7 8h10 M7 12h7',
  compare: 'M3 4h7v16H3z M14 4h7v16h-7z',
  arrow: 'M4 12h16 m-6-6 6 6-6 6',
  external: 'M14 4h6v6 m0-6-9 9 M10 5H5v14h14v-5',
};

export function visualSymbol(item, visual, index) {
  const fallback = visual.kind === 'commands' ? 'terminal' : visual.kind === 'files' ? (index === 0 ? 'folder' : 'file') : visual.kind === 'compare' ? 'compare' : 'arrow';
  return Object.hasOwn(tutorialSymbols, item.icon) ? item.icon : fallback;
}

export function lessonIdentity(lesson) {
  if (lesson.id === 'network-prepare') return { name: 'Clash Party', logo: 'clash-party.png', brand: 'clash-party', href: 'https://clashparty.org/', platform: 'Windows · 网络准备' };
  const tool = tools.find(item => item.id === (lesson.productId || (lesson.tools?.length === 1 ? lesson.tools[0] : null)));
  if (!tool) return null;
  const name = tool.id === 'codex' ? 'ChatGPT · Codex' : tool.short.replace(/(?:网页版|桌面版|桌面入口)$/u, '').trim();
  return { name, logo: tool.logo || tool.brand + '.svg', brand: tool.brand, href: tool.entry, platform: platforms.find(item => item.id === lesson.platform)?.name || '工具教程' };
}
