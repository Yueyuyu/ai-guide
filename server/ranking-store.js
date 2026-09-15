import { mkdir, readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import * as tls from 'node:tls';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { fetchRankings } from './ranking-source.js';
import { validateRankingSnapshot } from '../src/lib/rankings.js';

// 使用本机已受信任的系统证书；不关闭 TLS 校验。
if (tls.setDefaultCACertificates && tls.getCACertificates) tls.setDefaultCACertificates([...tls.getCACertificates('default'), ...tls.getCACertificates('system')]);

export async function readSnapshot(directory) {
  try { return validateRankingSnapshot(JSON.parse(await readFile(join(directory, 'current.json'), 'utf8'))); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

export async function refreshSnapshot(directory, fetcher = fetchRankings) {
  const attemptedAt = new Date().toISOString();
  let temporary;
  await mkdir(directory, { recursive: true });
  try {
    const snapshot = validateRankingSnapshot(await fetcher());
    // 新数据完整通过校验后才更新 current；失败不会把空结果写成最新榜单。
    const name = snapshot.retrievedAt.replace(/[:.]/g, '-');
    await mkdir(join(directory, 'history'), { recursive: true });
    await writeFile(join(directory, 'history', name + '.json'), JSON.stringify(snapshot, null, 2));
    temporary = join(directory, 'current-' + randomUUID() + '.tmp');
    await writeFile(temporary, JSON.stringify(snapshot, null, 2));
    // Windows 读取静态文件时可能暂时占用目标；只重试原子替换，绝不先删除旧快照。
    for (let attempt = 0; ; attempt++) {
      try { await rename(temporary, join(directory, 'current.json')); break; }
      catch (error) {
        if (!['EPERM', 'EBUSY', 'EACCES'].includes(error.code) || attempt >= 4) throw error;
        await delay(100 * (attempt + 1));
      }
    }
    const refresh = { status: 'ok', attemptedAt, message: '已从评测来源更新' };
    await writeFile(join(directory, 'status.json'), JSON.stringify(refresh, null, 2));
    return { snapshot, refresh };
  } catch (error) {
    const message = error.code ? '无法保存新快照，请稍后重试；保留已有数据。' : error.message?.includes('fetch') ? '无法连接评测来源，请稍后重试' : error.message;
    const refresh = { status: 'error', attemptedAt, message };
    await writeFile(join(directory, 'status.json'), JSON.stringify(refresh, null, 2));
    return { snapshot: await readSnapshot(directory).catch(() => null), refresh };
  } finally { if (temporary) await unlink(temporary).catch(() => {}); }
}
