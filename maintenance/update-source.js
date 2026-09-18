import { createHash } from 'node:crypto';

export const fingerprint = text => createHash('sha256').update(text).digest('hex');
export const sourceIdentity = source => fingerprint(JSON.stringify({
  url: source.url, format: source.format, expected: source.expected || [], minChars: source.minChars,
  extractorVersion: 1,
}));
const normalize = text => text.replace(/\r\n?/gu, '\n').split('\n').map(line => line.replace(/[ \t\u00a0]+/gu, ' ').trim()).filter(Boolean).join('\n');
const entities = text => text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/giu, (all, value) => {
  const known = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  if (Object.hasOwn(known, value.toLowerCase())) return known[value.toLowerCase()];
  const code = value.toLowerCase().startsWith('#x') ? parseInt(value.slice(2), 16) : Number(value.slice(1));
  return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : all;
});
export function extractSource(body, source) {
  let text;
  if (source.format === 'github-release') {
    const release = JSON.parse(body);
    if (release.draft || release.prerelease || !release.tag_name || !release.published_at || typeof release.body !== 'string') throw new Error('发行数据不完整或不是稳定版');
    // 忽略下载次数、资产更新时间等噪声，只比较版本和发行说明。
    text = [release.tag_name, release.name, release.published_at, release.body].filter(Boolean).join('\n');
  } else if (source.format === 'markdown') {
    if (/^\s*<(?:!doctype|html)\b/iu.test(body)) throw new Error('Markdown 地址返回了网页或拦截页');
    text = body.replace(/^> For the complete documentation index,.*$/gmu, '');
  } else if (source.format === 'html') {
    const clean = body.replace(/<!--[\s\S]*?-->/gu, '').replace(/<(script|style|noscript|svg|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1\s*>/giu, '');
    const main = clean.match(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/iu)?.[1] || clean.match(/<article\b[^>]*>([\s\S]*?)<\/article\s*>/iu)?.[1];
    if (!main) throw new Error('没有可读取的正文，可能需要动态渲染或账号登录');
    text = main.replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/giu, (_, href, label) =>
      href.startsWith('#') ? label : label + ' [' + href + ']')
      .replace(/<\/(?:p|div|h[1-6]|li|section|article|tr|blockquote)>|<br\s*\/?>/giu, '\n').replace(/<[^>]*>/gu, '');
    text = entities(text);
  } else throw new Error('不支持的来源格式');
  text = normalize(text);
  if (text.length < source.minChars || /^(?:access denied|just a moment|verify you are human|checking your browser)/iu.test(text)) throw new Error('正文不足或疑似访问验证页');
  for (const expected of source.expected || []) if (!text.toLowerCase().includes(expected.toLowerCase())) throw new Error('正文缺少预期的产品标识');
  return text;
}

export async function fetchSource(source, { fetcher = fetch, timeoutMs = 15000, maxBytes = 2_000_000 } = {}) {
  const original = new URL(source.url);
  if (original.protocol !== 'https:' || original.username || original.password) throw new Error('只检查无凭据的 HTTPS 公开来源');
  const signal = AbortSignal.timeout(timeoutMs);
  let url = original.href;
  for (let redirects = 0; redirects <= 3; redirects++) {
    const response = await fetcher(url, { redirect: 'manual', signal, headers: { accept: 'text/markdown, text/html, application/json', 'user-agent': 'AIGuide-Tutorial-Update-Check/1.0' } });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) throw new Error('跳转缺少目标');
      const next = new URL(location, url);
      if (next.protocol !== 'https:' || next.origin !== original.origin || next.username || next.password) throw new Error('来源跨站跳转，需要重新核对地址');
      url = next.href; continue;
    }
    if (!response.ok) { await response.body?.cancel(); throw new Error('HTTP ' + response.status + '，本次无法核对'); }
    const type = response.headers.get('content-type') || '';
    if (!/text\/(?:html|plain|markdown)|application\/json/iu.test(type)) { await response.body?.cancel(); throw new Error('来源不是可读取的文档'); }
    if (Number(response.headers.get('content-length')) > maxBytes) { await response.body?.cancel(); throw new Error('来源超过大小限制'); }
    const chunks = []; let size = 0;
    const reader = response.body?.getReader();
    if (!reader) throw new Error('来源没有正文');
    try {
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        size += value.length; if (size > maxBytes) throw new Error('来源超过大小限制');
        chunks.push(value);
      }
    } catch (error) { await reader.cancel(); throw error; }
    finally { reader.releaseLock(); }
    return { text: extractSource(Buffer.concat(chunks).toString('utf8'), source), finalUrl: url };
  }
  throw new Error('跳转次数过多');
}
