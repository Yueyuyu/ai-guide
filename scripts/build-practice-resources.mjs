import { mkdir, readFile, writeFile } from 'node:fs/promises';
// Vite 开发模式不能从 public 导入 JSON；证据原件留在 public，前端使用生成索引。
const manifests = ['live-20260916', 'doubao-live-20260918'];
const captures = (await Promise.all(manifests.map(async directory =>
  JSON.parse(await readFile(new URL('../public/tutorials/' + directory + '/images.json', import.meta.url), 'utf8')),
))).flat();
await writeFile(new URL('../src/data/tutorial-images.json', import.meta.url), JSON.stringify(captures, null, 2) + '\n');
console.log(`已生成 ${captures.length} 张截图的前端索引。`);

// 课程材料间存在引用，先生成索引再载入课程，支持索引缺失时重新生成。
const { resourceFiles } = await import('../src/data/practice-resources.js');
const directory = new URL('../public/practice/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const [filename, content] of Object.entries(resourceFiles)) {
  await writeFile(new URL(filename, directory), '\uFEFF' + content + '\n', 'utf8');
}
console.log(`已生成 ${Object.keys(resourceFiles).length} 份中文练习材料。`);
