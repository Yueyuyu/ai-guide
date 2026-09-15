import { defineConfig, loadEnv } from 'vite';
import { rankingPlugin } from './server/ranking-plugin.js';
import { readingPlugin } from './server/reading-plugin.js';
import { analyticsPlugin } from './server/analytics-plugin.js';

export default defineConfig(({ mode, command }) => {
  // 正式站点地址只供构建插件使用；不作为 VITE_* 变量暴露到浏览器。
  const env = loadEnv(mode, process.cwd(), 'AIGUIDE_');
  const analyticsToken = command === 'build' ? env.AIGUIDE_CF_ANALYTICS_TOKEN || '' : '';
  return {
    base: './',
    define: { 'import.meta.env.AIGUIDE_ANALYTICS_ENABLED': JSON.stringify(Boolean(analyticsToken)) },
    plugins: [rankingPlugin(), readingPlugin({ siteUrl: env.AIGUIDE_SITE_URL }), analyticsPlugin({ token: analyticsToken, hostname: env.AIGUIDE_SITE_URL ? new URL(env.AIGUIDE_SITE_URL).hostname : '' })],
    server: { host: '127.0.0.1', port: 4186, strictPort: true, watch: { ignored: ['**/public/data/rankings/**'] } },
    preview: { host: '127.0.0.1', port: 4186, strictPort: true },
  };
});
