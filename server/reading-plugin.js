import { readFile } from 'node:fs/promises';
import { lessons } from '../src/data/index.js';
import { renderReadingPage, renderReadingIndex, renderSitemap, siteBase } from './reading-pages.js';

export function readingPlugin({ siteUrl = process.env.AIGUIDE_SITE_URL } = {}) {
  const base = siteBase(siteUrl);
  const stylesheet = new URL('../src/styles-reading.css', import.meta.url);
  return {
    name: 'aiguide-readable-pages',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0];
        if (!path?.startsWith('/read/') || !['GET', 'HEAD'].includes(request.method)) return next();
        if (path === '/read/styles.css') { response.setHeader('Content-Type', 'text/css; charset=utf-8'); response.end(await readFile(stylesheet, 'utf8')); return; }
        const id = path.slice('/read/'.length).replace(/\.html$/u, '');
        const html = ['', 'index'].includes(id) ? renderReadingIndex(base) : path.endsWith('.html') ? renderReadingPage(id, base) : null;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (!html) { response.statusCode = 404; response.end('<!doctype html><html lang="zh-CN"><meta charset="UTF-8"><h1>教程未找到</h1><a href="/read/index.html">返回阅读目录</a></html>'); return; }
        response.end(request.method === 'HEAD' ? '' : html);
      });
    },
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'read/styles.css', source: await readFile(stylesheet, 'utf8') });
      this.emitFile({ type: 'asset', fileName: 'read/index.html', source: renderReadingIndex(base) });
      for (const lesson of lessons) this.emitFile({ type: 'asset', fileName: 'read/' + lesson.id + '.html', source: renderReadingPage(lesson.id, base) });
      if (base) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(base) });
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', base).href}\n` });
      }
    },
  };
}
