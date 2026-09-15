import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { refreshSnapshot } from './ranking-store.js';

export function rankingPlugin() {
  let root, outputDirectory, pending;
  const install = (server, preview = false) => {
    const directory = resolve(root, preview ? outputDirectory : 'public', 'data/rankings');
    // 快照是运行时数据，由 JSON 接口读取，不进入 Vite 的模块转换与文件持有流程。
    server.middlewares.use(async (req, res, next) => {
      const path = req.url?.split('?')[0];
      const file = path === '/data/rankings/current.json' ? 'current.json' : path === '/data/rankings/status.json' ? 'status.json' : null;
      if (!file || req.method !== 'GET') return next();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      try { res.end(await readFile(resolve(directory, file))); }
      catch { res.statusCode = 404; res.end(JSON.stringify({ error: '没有可读取的快照记录' })); }
    });
    server.middlewares.use('/api/model-rankings/refresh', async (req, res, next) => {
      if (req.method !== 'POST') return next();
      const host = req.headers.host;
      if (req.headers.origin !== 'http://' + host && req.headers.origin !== 'https://' + host) { res.statusCode = 403; res.end(); return; }
      try {
        // 并发点击复用一次请求，避免同时写快照和对来源重复抓取。
        pending ||= refreshSnapshot(directory).finally(() => { pending = null; });
        const result = await pending;
        res.statusCode = result.refresh.status === 'ok' ? 200 : 503;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify(result));
      } catch { res.statusCode = 500; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ error: '保存榜单时发生错误，请保留当前快照并稍后重试。' })); }
    });
  };
  return { name: 'aiguide-ranking-source', configResolved(config) { root = config.root; outputDirectory = config.build.outDir; }, configureServer: server => install(server), configurePreviewServer: server => install(server, true) };
}
