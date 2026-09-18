import registry from '../src/data/source-review.json' with { type: 'json' };

const step = (lessonId, section, keywords) => ({ lessonId, section, keywords });
const doc = (id, steps, options = {}) => ({
  id, title: registry.sources[id].title, url: registry.sources[id].url,
  format: 'html', minChars: 80, ...options, steps,
});

// 关联的是需优先核对的稳定章节，不代表资料一变就要重拍。
export const tutorialWatchlist = [
  doc('chatgpt-app', [
    step('codex-web', 0, ['install', 'sign in', 'folder', 'project']),
    step('codex-web', 2, ['codex', 'task', 'permission']),
    step('chatgpt-desktop-start', 0, ['install', 'sign in', 'download']),
    step('chatgpt-desktop-start', 1, ['chat', 'work', 'mode']),
    step('chatgpt-desktop-start', 2, ['folder', 'file', 'permission']),
  ], { url: registry.sources['chatgpt-app'].url + '.md', format: 'markdown', expected: ['ChatGPT'] }),
  doc('chatgpt-windows', [step('codex-web', 0, ['windows', 'install', 'folder', 'sign in'])],
    { url: registry.sources['chatgpt-windows'].url + '.md', format: 'markdown', expected: ['Windows'] }),
  doc('chatgpt', [
    step('chatgpt-files', 0, ['chat', 'work', 'sign in']),
    step('chatgpt-files', 2, ['file', 'upload', 'download']),
  ], { url: registry.sources.chatgpt.url + '.md', format: 'markdown', expected: ['ChatGPT'] }),
  {
    id: 'clash-release', title: 'Clash Party 稳定版发行说明',
    url: 'https://api.github.com/repos/mihomo-party-org/clash-party/releases/latest',
    format: 'github-release', minChars: 40,
    steps: [
      step('network-prepare', 1, ['windows', 'installer', '安装', '下载']),
      step('network-prepare', 3, ['subscription', 'import', '订阅', '导入']),
      step('network-prepare', 4, ['proxy', 'node', '代理', '节点']),
      step('network-prepare', 6, ['restore', 'system', '恢复', '系统']),
    ],
  },
  doc('clash-install', [step('network-prepare', 1, ['Windows', '安装', '下载'])]),
  doc('clash-handson', [
    step('network-prepare', 3, ['订阅', '导入']),
    step('network-prepare', 4, ['节点', '代理', '模式']),
  ]),
  doc('clash-common', [
    step('network-prepare', 5, ['连接', '访问', '网络']),
    step('network-prepare', 6, ['代理', '系统', '恢复', '错误']),
  ]),
  doc('workbuddy-install', [step('workbuddy-first', 0, ['安装', '登录', 'Windows', '下载'])]),
  doc('workbuddy-task', [
    step('workbuddy-first', 1, ['工作空间', '文件夹', '目录']),
    step('workbuddy-first', 2, ['任务', '计划', '权限']),
  ]),
  doc('workbuddy-task-bar', [
    step('workbuddy-first', 1, ['工作空间', '文件夹']),
    step('workbuddy-first', 2, ['Plan', 'Ask', '模式', '权限', '任务']),
  ]),
  doc('workbuddy-results', [
    step('workbuddy-first', 3, ['文件', '预览', '下载', '打开']),
    step('workbuddy-first', 4, ['修改', '变更', '差异']),
  ]),
  doc('doubao-entry', [
    step('doubao-notice', 0, ['登录', '对话']),
    step('doubao-notice', 2, ['发送', '消息']),
    step('doubao-notice', 4, ['追问', '回答']),
    step('doubao-notice', 5, ['复制', '保存']),
  ]),
  doc('doubao-download', [
    step('doubao-work-start', 0, ['下载', '安装']),
    step('doubao-work-start', 2, ['工作', '文件', '权限']),
  ]),
];
