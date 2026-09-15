import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const steps = [
  ['运行测试', ['--test', 'tests/*.test.js']],
  ['检查内容与本地资源', ['scripts/audit-content.mjs']],
  ['检查工程文档', ['scripts/audit-docs.mjs']],
  ['构建生产版本', ['node_modules/vite/bin/vite.js', 'build', '--configLoader', 'native']],
];
for (const [label, args] of steps) {
  console.log(`\n${label}`);
  // 使用当前 Node 和参数数组，在 Windows／Linux 下保持相同的失败传播。
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit', env: process.env });
  if (result.error || result.signal || result.status !== 0) {
    console.error(`${label}未通过，检查停止。`);
    process.exit(result.status || 1);
  }
}
console.log('\n项目检查通过。浏览器、第三方账号实操和公开部署需另行验收。');
