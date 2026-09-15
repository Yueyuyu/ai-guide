import { mkdir, writeFile } from 'node:fs/promises';
import { resourceFiles } from '../src/data/practice-resources.js';

const directory = new URL('../public/practice/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const [filename, content] of Object.entries(resourceFiles)) {
  await writeFile(new URL(filename, directory), '\uFEFF' + content + '\n', 'utf8');
}
console.log(`已生成 ${Object.keys(resourceFiles).length} 份中文练习材料。`);
