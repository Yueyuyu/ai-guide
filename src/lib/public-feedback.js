export const feedbackRepository = 'https://github.com/Yueyuyu/ai-guide';
export const feedbackTracks = [
  { id: 'network', name: '网络准备', href: '#/path/network', task: '分清客户端和订阅，完成一次导入与网络验证；没有订阅可只反馈阅读卡点。' },
  { id: 'doubao', name: '豆包第一份清单', href: '#/learn/doubao-notice?path=starter', task: '发送材料、核对回答、追问一次，保存并打开自己的 TXT。' },
  { id: 'codex', name: 'Codex 第一个网页', href: '#/path/builder', task: '创建两个实际文件、增加三个标签，再核对导航和手机宽度。' },
];

// 公共 Issue 的正文会进入 URL。先移除常见凭据和链接，再交给读者预览；规则不能代替人工检查。
export function redactFeedback(text) {
  return String(text || '')
    .replace(/(?:https?:\/\/|(?:ss|ssr|vmess|vless|trojan|clash):\/\/)[^\s<>]+/giu, '[链接已移除]')
    .replace(/\bsk-[A-Za-z0-9_-]+/gu, '[密钥已移除]')
    .replace(/\bBearer\s+\S+/giu, 'Bearer [已移除]')
    .replace(/((?:api[_ -]?key|token|password|密码|验证码|订阅链接)\s*[:：=]\s*)\S+/giu, '$1[已移除]')
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu, '[邮箱已移除]');
}

export function publicIssueUrl({ title, body }) {
  if (!title?.trim() || !body?.trim()) return null;
  const params = new URLSearchParams({ title: title.slice(0, 120), body: redactFeedback(body) });
  const url = `${feedbackRepository}/issues/new?${params}`;
  // 长中文记录容易超过中间代理的 URL 上限；转为手动粘贴，不静默截断问题。
  return url.length <= 7500 ? url : `${feedbackRepository}/issues/new`;
}
