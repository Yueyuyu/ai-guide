import { fileURLToPath } from 'node:url';
import { refreshSnapshot } from '../server/ranking-store.js';
const directory = fileURLToPath(new URL('../public/data/rankings', import.meta.url));
const result = await refreshSnapshot(directory);
console.log(JSON.stringify({ ...result.refresh, retrievedAt: result.snapshot?.retrievedAt, counts: result.snapshot?.metrics.map(metric => ({ id: metric.id, rows: metric.rows.length })) }, null, 2));
if (result.refresh.status !== 'ok') process.exitCode = 1;
