import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execute = promisify(execFile);
export async function windowsFetch(url, options) {
  const script = fileURLToPath(new URL('./windows-public-fetch.ps1', import.meta.url));
  let stdout;
  try {
    ({ stdout } = await execute('powershell.exe', ['-NoProfile', '-NonInteractive', '-File', script, '-Url', url], {
      windowsHide: true, timeout: 15000, maxBuffer: 3_000_000, signal: options.signal, encoding: 'utf8',
    }));
  } catch { throw new Error('Windows 网络方式也未完成，保留上次有效记录。'); }
  const result = JSON.parse(stdout.replace(/^\uFEFF/u, ''));
  const headers = { 'content-type': result.contentType };
  if (result.location) headers.location = result.location;
  const bytes = Buffer.from(result.body, 'base64');
  return new Response([204, 205, 304].includes(result.status) ? null : bytes, { status: result.status, headers });
}

export function publicFetcher({ platform = process.platform, fetcher = fetch, fallback = windowsFetch } = {}) {
  return async (url, options) => {
    try { return await fetcher(url, options); }
    catch (error) {
      // Windows 上部分站点的 Node TLS 连接会被中断，使用系统网络栈读取同一公开 URL。
      // 不回退 HTTP 错误或验证页，不修改代理，不降级 TLS，不启动可见窗口。
      if (platform !== 'win32' || error.message !== 'fetch failed' || options.signal.aborted) throw error;
      return fallback(url, options);
    }
  };
}
