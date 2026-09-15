export function analyticsMarkup(token = '') {
  if (!token) return '';
  if (!/^[a-f0-9]{32}$/iu.test(token)) throw new Error('Cloudflare Web Analytics 需要 32 位站点公开 token；不要填写账户 API 密钥。');
  // 首版只统计整页加载，不把 Hash 路由切换冒充独立访客或课程完成。
  return `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token, spa: false })}'></script>`;
}

export function analyticsPlugin({ token = '', hostname = '' } = {}) {
  const markup = analyticsMarkup(token);
  return {
    name: 'aiguide-web-analytics',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(options, bundle) {
        if (!markup) return;
        if (!hostname || ['localhost', '127.0.0.1'].includes(hostname)) throw new Error('启用统计需要配置正式站点地址。');
        for (const asset of Object.values(bundle)) {
          if (asset.type === 'asset' && asset.fileName.endsWith('.html')) asset.source = String(asset.source).replace('</body>', markup + '</body>');
        }
      },
    },
  };
}
