import { defineConfig, loadEnv } from 'vite';
import { rankingPlugin } from './server/ranking-plugin.js';
import { readingPlugin } from './server/reading-plugin.js';

export default defineConfig(({ mode }) => {
  // 正式站点地址只供构建插件使用；不作为 VITE_* 变量暴露到浏览器。
  const env = loadEnv(mode, process.cwd(), 'AIGUIDE_');
  return {
    base: './',
    plugins: [rankingPlugin(), readingPlugin({ siteUrl: env.AIGUIDE_SITE_URL })],
    server: { host: '127.0.0.1', port: 4186, strictPort: true, watch: { ignored: ['**/public/data/rankings/**'] } },
    preview: { host: '127.0.0.1', port: 4186, strictPort: true },
  };
});
