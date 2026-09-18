import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fingerprint } from './update-source.js';

export async function readState(directory) {
  let raw;
  try { raw = await readFile(join(directory, 'state.json'), 'utf8'); }
  catch (error) {
    if (error.code === 'ENOENT') return { schemaVersion: 1, sources: {}, reviews: [] };
    throw error;
  }
  const state = JSON.parse(raw);
  if (state.schemaVersion !== 1 || !state.sources || typeof state.sources !== 'object' || Array.isArray(state.sources) || !Array.isArray(state.reviews)) throw new Error('维护记录结构无效，原文件已保留');
  for (const [id, source] of Object.entries(state.sources)) {
    if (!/^[a-z][a-z0-9-]+$/u.test(id) || !source || !Number.isInteger(source.failures) || source.failures < 0) throw new Error('维护记录损坏：' + id);
    if (!['baseline-created', 'changed', 'unchanged', 'unverified', 'reviewed'].includes(source.lastStatus)) throw new Error('维护状态无效：' + id);
    if (!source.baseline && source.lastStatus !== 'unverified') throw new Error('维护基线缺失：' + id);
    if (source.baseline && !/^[a-f0-9]{64}$/u.test(source.identity)) throw new Error('来源标识无效：' + id);
    if (source.lastStatus === 'changed' && !source.candidate) throw new Error('候选正文缺失：' + id);
    for (const snapshot of [source.baseline, source.candidate].filter(Boolean)) {
      if (typeof snapshot.text !== 'string' || fingerprint(snapshot.text) !== snapshot.fingerprint || !Number.isFinite(Date.parse(snapshot.observedAt))) throw new Error('正文指纹或日期无效：' + id);
    }
    if (source.candidate && !source.baseline) throw new Error('候选正文没有比较基线：' + id);
  }
  for (const review of state.reviews) {
    if (!review || !state.sources[review.sourceId] || !/^[a-f0-9]{64}$/u.test(review.fingerprint) || !Array.isArray(review.steps) || !Array.isArray(review.evidence) || typeof review.note !== 'string') throw new Error('复核记录损坏，原文件已保留');
  }
  return state;
}

export async function atomicWrite(directory, name, text) {
  if (!/^[a-z-]+\.(?:json|md)$/u.test(name)) throw new Error('无效的维护文件名');
  await mkdir(directory, { recursive: true });
  const temporary = join(directory, name + '.' + randomUUID() + '.tmp');
  try {
    const file = await open(temporary, 'wx');
    try { await file.writeFile(text, 'utf8'); await file.sync(); } finally { await file.close(); }
    await rename(temporary, join(directory, name));
  } finally { await rm(temporary, { force: true }); }
}

export async function withStateLock(directory, action) {
  await mkdir(directory, { recursive: true });
  const path = join(directory, 'check.lock');
  let file;
  try { file = await open(path, 'wx'); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error('已有维护任务或遗留锁，请确认原进程状态后再处理 check.lock');
    throw error;
  }
  try {
    await file.writeFile(JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }));
    return await action();
  } finally { await file.close(); await rm(path, { force: true }); }
}
