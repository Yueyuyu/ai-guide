import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const confirmWithGet = new Set([404, 405, 410, 501]);
export async function checkPublicLink(url, { systemHttp = false, fetcher = fetch } = {}) {
  try {
    let httpStatus, finalUrl;
    if (systemHttp) {
      if (process.platform !== 'win32') throw new Error('system-http-requires-windows');
      const script = fileURLToPath(new URL('check-link.ps1', import.meta.url));
      // 使用参数数组传递 URL，不把来源地址拼成可执行的 PowerShell 代码。
      const { stdout } = await execute('powershell.exe', ['-NoProfile', '-NonInteractive', '-File', script, '-Url', url], { windowsHide: true, timeout: 30000, maxBuffer: 65536 });
      ({ httpStatus, finalUrl } = JSON.parse(stdout.replace(/^\uFEFF/u, '').trim()));
      if (!Number.isInteger(httpStatus)) throw new Error('no-response');
    } else {
      let response = await fetcher(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000) });
      // 部分帮助站点 HEAD 返回404但 GET 正常，确认正文响应后才判断失效。
      if (confirmWithGet.has(response.status)) {
        await response.body?.cancel();
        response = await fetcher(url, { redirect: 'follow', signal: AbortSignal.timeout(12000) });
      }
      httpStatus = response.status;
      finalUrl = response.url;
      await response.body?.cancel();
    }
    return { url, status: httpStatus >= 200 && httpStatus < 300 ? 'reachable' : [404, 410].includes(httpStatus) ? 'missing' : 'manual-review', httpStatus, ...(finalUrl ? { finalUrl } : {}) };
  } catch { return { url, status: 'unverified', reason: '网络检查未完成，请用浏览器或系统网络方式复核' }; }
}
