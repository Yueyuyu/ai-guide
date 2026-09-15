import { officialSources as sources } from './products.js';

export const codingEntries = [
  {
    id: 'codex-cloud-start', title: 'Codex 云端网页版：连接仓库，完成一次小改动', description: '从选择仓库和环境开始，检查云端结果与本地项目的区别。', category: 'coding', platform: 'web', productId: 'codex-cloud', tools: ['codex-cloud'], level: '进阶', minutes: 30, color: 'peach', cover: ['在云端修改项目', '连接仓库，检查差异'], sources: [sources.cloud],
    goals: ['为练习仓库创建云端环境', '发起一项可检查的文档修改', '区分云端差异、合并与本地同步'], prerequisite: '一个你有权访问的练习 Git 仓库与可用的 Codex 账号。本教程涉及仓库授权，请只选这次练习需要的仓库。',
    sections: [
      { title: '从网页连接练习仓库', paragraphs: ['打开 chatgpt.com/codex，用 ChatGPT 账号登录。按页面提示连接 GitHub 或 GitLab（Beta）入口，选择练习仓库。', '这一步授权的是远程仓库访问。不能把电脑上的文件夹路径发进去，期待云端自动读取尚未上传的本地代码。'], checkpoint: '页面显示的是目标练习仓库，授权范围与选择相符。' },
      { title: '创建环境，核对运行条件', paragraphs: ['进入环境设置，为该仓库创建环境。根据项目 README 配置必要的依赖、工具和启动准备；本次只改文档，可以先使用项目需要的最小配置。', '不要把本地环境变量直接贴进任务。若项目真的需要密钥，应使用平台专门的安全配置入口；练习任务优先使用不含秘密的数据。'] },
      { title: '选择环境，发起说明文档任务', paragraphs: ['回到 Codex，选中刚才的环境和目标仓库，再发起任务。观察任务日志，确认检查的是正确文件。'], prompt: '请阅读这个练习仓库的 README 和构建配置。\n仅补充一段有文件依据的本地运行说明。\n不修改业务代码，不猜测命令。\n完成后列出变更文件、差异和未确认事项。', checkpoint: '结果中只有计划内文档变化，每条命令都可在仓库配置中找到依据。' },
      { title: '审查云端差异，决定下一步', paragraphs: ['打开 summary（摘要）和 diff（修改差异），逐行阅读。需要修改就继续追问；准备好之后再通过项目正常流程创建或审查合并请求。', '云端任务完成、合并请求创建、代码合入分支、本地拉取是四个不同状态。本篇以检查云端差异为完成点，不把它说成电脑上的项目已经更新。'] },
    ], exercises: ['为练习仓库选择或创建云端环境', '完成一次仅涉及说明文档的任务', '阅读差异并说明本地是否已同步'], takeaway: '云端教程的核心是仓库、环境和差异，桌面文件夹步骤不能直接照搬。',
  },
  {
    id: 'codex-cli-start', title: 'Codex CLI：从终端启动一次项目阅读', description: '进入正确目录，用 codex 开始，核对运行说明与已有文件。', category: 'coding', platform: 'terminal', productId: 'codex-cli', tools: ['codex-cli'], level: '进阶', minutes: 25, color: 'peach', cover: ['在终端使用 Codex', '先确认目录，再执行'],
    goals: ['按 CLI 文档完成安装认证', '从练习目录启动 codex', '得到有文件依据的项目地图'], prerequisite: '能使用终端，按官方 CLI 文档完成系统对应的安装与认证。本篇不要求在桌面应用中新建项目，也不使用云端仓库环境。',
    sections: [
      { title: '先核对位置和 CLI 是否可用', paragraphs: ['打开官方 CLI 文档的安装区，切换到自己的系统或 npm 标签，按该标签安装；不要把 macOS/Linux 命令直接照搬到 PowerShell。安装后在终端进入练习项目目录，运行 pwd 查看位置，再使用 codex --version 检查是否安装成功。若提示找不到命令，回到安装步骤检查路径，而不是粘贴到 ChatGPT 网页输入框。'], code: 'pwd\ncodex --version\ncodex', language: '终端逐行执行', checkpoint: '版本命令有返回，codex 在目标目录中打开交互会话。' },
      { title: '先请 Codex 阅读项目', paragraphs: ['首次运行 codex 时选择 Sign in with ChatGPT（使用 ChatGPT 登录）或文档支持的其他认证方式。登录后要求先阅读 AGENTS.md、README 和构建配置，不修改文件。把运行入口、测试命令和不确定项分别列出，核对路径是否存在。'], prompt: '请阅读当前目录的项目说明与约定，不修改文件。\n说明运行入口、主要模块和测试命令。\n每项附对应文件路径，未执行的命令标为未运行。', checkpoint: '说明引用真实文件，没有把未执行的测试说成通过。' },
      { title: '结束任务，检查工作区状态', paragraphs: ['按照 CLI 当前提示退出会话，再在终端查看 Git 状态，确认这次只读任务没有引入意外修改。若项目本身有旧改动，不要为了练习清理它们。', '下一次启动仍然先确认目录。CLI 的上下文与终端当前工作位置有关，不要因为桌面应用打开了某个项目就假定终端也在同一路径。'], code: 'git status --short', language: 'Git 项目中检查状态' },
    ], exercises: ['在正确目录启动 Codex CLI', '核对项目地图中的三个文件', '结束会话并检查已有修改状态'], takeaway: '终端里最先要确认的是工作目录，随后才是任务和模型。',
  },
  {
    id: 'qwen-code-start', title: 'Qwen Code：核对认证配置，修好一个小脚本', description: '用 qwen 启动，分清网页账号与模型服务，再验证脚本输入。', category: 'coding', platform: 'terminal', productId: 'qwen-code', tools: ['qwen-code'], level: '进阶', minutes: 30, color: 'lilac', cover: ['用 Qwen 修改脚本', '认证、输入与验证'],
    goals: ['启动 Qwen Code 并确认认证方式', '让工具只修改目标脚本', '检查正常和空输入结果'], prerequisite: '按 Qwen Code 官方文档完成当前系统的安装。准备一个可独立运行、读取文字输入的测试脚本。',
    sections: [
      { title: '运行 qwen，确认使用哪种模型服务', paragraphs: ['官方 README 提供独立安装器和 npm 安装。使用 npm 时要求 Node.js 22 或以上，在终端执行 npm install -g @qwen-code/qwen-code@latest；安装后重新打开终端。进入练习目录运行 qwen，再在会话中输入 /auth 配置认证方式和模型服务。不要套用 Gemini CLI 的认证选项，也不要把 Qwen 网页会员当成 API 余额。', '如果使用兼容接口，分别核对服务地址、准确模型 ID 和认证方式；密钥只放在文档要求的安全配置位置。不要把密钥粘贴到任务正文。'], code: 'pwd\nqwen', language: 'Qwen Code 启动', checkpoint: '会话可以正常回答，且你知道使用的是哪种认证和服务。' },
      { title: '提交只影响一个脚本的任务', paragraphs: ['先提供脚本文件名、当前复现输入和预期行为。让工具找到读入文本的地方，解释空输入为什么出错，再提出修改。'], prompt: '请检查这个练习脚本的文字输入处理。\n先解释空字符串和纯空格的当前行为。\n只为该脚本补充空输入检查，保留正常输入的输出。\n列出需要运行的测试样例，再执行与修改直接相关的验证。', checkpoint: '修改集中在输入处理逻辑，没有重新生成整个项目。' },
      { title: '分别执行三种输入', paragraphs: ['运行正常文字、空字符串和纯空格三个案例，核对结果。不要只查看工具的最终摘要，打开实际脚本差异和运行输出。', '若接口鉴权失败，先修正服务配置；若脚本报错，检查脚本。把模型服务错误和业务代码错误分开，能减少无效修改。'] },
    ], exercises: ['启动 qwen 并记录认证方式', '为目标脚本完成最小修改', '验证正常文字、空串和空格输入'], takeaway: 'Qwen Code 的登录、模型配置和脚本验证各有自己的步骤。',
  },
  {
    id: 'copilot-vscode-start', title: 'GitHub Copilot：在 VS Code 中体验补全与聊天', description: '从官方扩展和 GitHub 登录开始，理解建议补全与任务修改的区别。', category: 'coding', platform: 'editor', productId: 'copilot', tools: ['copilot'], level: '入门', minutes: 25, color: 'sage', cover: ['在编辑器里学编程', '补全建议，逐条检查'],
    goals: ['在 VS Code 中完成 Copilot 设置', '解释选中函数并核对上下文', '审查一次代码补全与边界行为'], prerequisite: '已安装 VS Code，并有可使用 Copilot 的 GitHub 账号。具体权益按账号页面确认；无需安装 Cursor。',
    sections: [
      { title: '在 VS Code 安装官方扩展并登录', paragraphs: ['从 VS Code 扩展市场找到由 GitHub 发布的 Copilot 扩展，按编辑器提示登录 GitHub。回到编辑器确认 Copilot 已可用，再打开练习代码文件。', '如果没有可用权限，先检查 GitHub 账号和组织策略。编辑器、扩展和模型是三层，下载一个编辑器不会自动获得所有模型使用额度。'], checkpoint: 'VS Code 中能看到 Copilot 入口，当前打开的是练习项目。' },
      { title: '选中函数，用聊天先问懂', paragraphs: ['选中一个短函数，通过 Copilot 聊天把选区作为上下文，询问输入、返回值和边界情况。先查看它引用的代码是否正是你选中的函数。'], prompt: '请解释选中的函数：\n输入是什么，返回什么，空值时会怎样？\n引用实际代码说明，暂时不要修改。', checkpoint: '回答对应选中的代码，没有解释成另一个同名函数。' },
      { title: '体验补全，再决定是否接受', paragraphs: ['在练习函数旁写一行清晰注释，观察编辑器的补全建议。按当前编辑器提示接受或取消，阅读插入的每一行，再运行正常与空值样例。', '补全是在光标位置提供代码建议；聊天解释和 Agent 多文件修改范围不同。本课以一次可检查的补全为目标，不把聊天回答当成已经写入文件。'] },
    ], exercises: ['确认 VS Code 中 Copilot 已可用', '通过选中函数获得准确解释', '审查一条补全并验证边界情况'], takeaway: 'Copilot 的学习重点是编辑器中的选区、光标、建议和修改结果。',
  },
];
