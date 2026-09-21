export const claudeCodeWorkflows = {
  sources: [
    { id: 'workflows', title: 'Claude Code：常见工作流程', url: 'https://code.claude.com/docs/zh-CN/common-workflows' },
    { id: 'memory', title: 'Claude Code：项目指令与记忆', url: 'https://code.claude.com/docs/zh-CN/memory' },
    { id: 'best', title: 'Claude Code：最佳实践', url: 'https://code.claude.com/docs/zh-CN/best-practices' },
  ],
  sections: [
    {
      id: 'plan-mode', kind: 'feature', title: '用 Plan Mode 和文件引用限定范围',
      paragraphs: ['不熟悉项目或改动涉及多个文件时，先进入 Plan Mode，检查方案再执行。下面的启动命令输入系统终端；@ 文件引用和后续自然语言任务输入 Claude Code 会话，不要把两种输入位置混淆。'],
      steps: ['先进入练习项目目录，用下方命令启动；已有会话可按 Shift+Tab，直到状态栏明确显示 plan mode on。', '用 @ 选择需要分析的文件，要求说明影响范围与验证方法。目录引用提供文件列表，不等于每份正文都已阅读。', '检查计划中的文件、预期行为和测试；确认后按当前界面批准计划或切换出 Plan Mode，再执行修改。', '完成后查看差异与实际检查输出，确认没有顺带修改无关文件。'],
      promptLabel: '在系统终端运行 · 先进入练习目录', prompt: 'claude --permission-mode plan',
      check: '状态栏确实处于计划模式；计划引用实际文件，执行与检查只围绕已确认的目标。', sourceIds: ['workflows', 'best'],
    },
    {
      id: 'project-rules', kind: 'feature', title: '用 CLAUDE.md 保存项目约定',
      paragraphs: ['CLAUDE.md 适合记录构建命令、代码约定和反复强调的工作规则；自动记忆则保存从交互中学到的偏好。两者都是上下文，不能代替实际权限控制。'],
      steps: ['在项目中运行 /init 生成起始建议，逐项核对文件里的命令是否真实存在，再保留必要约定。已有文件时先查看建议和差异。', '保持说明简短；把仅适用于少量文件的规则分到 .claude/rules/，复杂的可复用流程再考虑 Skill。', '在会话中运行 /context，检查 Memory files 是否包含目标文件；用 /memory 查看或编辑已保存的记忆。', '已有 AGENTS.md 的项目可在 CLAUDE.md 中用 @AGENTS.md 导入。Claude Code 不会仅因文件叫 AGENTS.md 就自动采用它。'],
      promptLabel: '项目 CLAUDE.md 内容示例 · 按真实项目调整',
      prompt: '# 项目工作约定\n- 修改前先阅读相关文件，只处理当前任务。\n- 使用项目已有的验证命令；没有命令时说明缺口，不编造成功结果。\n- 保留其他人的未提交改动。\n- 修改后列出文件、验证结果和未测项。\n- 不自动提交、推送或部署。',
      check: '规则来源可在 /context 中确认；新会话能沿用必要约定，文件里没有凭据或过时命令。', sourceIds: ['memory'],
    },
    {
      id: 'context', kind: 'advanced', title: '压缩、恢复与回退：先分清要保留什么',
      paragraphs: ['同一任务变长时，可压缩对话并保留关键决定；切换不相关任务时再清理上下文。对话恢复、上下文压缩和文件回退解决的是不同问题，不能互相替代。'],
      steps: ['用 /rename 给会话起明确名字；离开后在同一目录用 claude --continue 继续最近任务，或 claude --resume 选择历史会话。', '压缩前保存改动文件、关键决定和未通过的检查，再用 /compact 附带保留要求。压缩后重新读取实际文件。', '不相关任务使用 /clear 前，先留好交接；清空上下文不会把文件变回原样。', '需要回看检查点时打开 /rewind，仔细选择要恢复的范围。它只覆盖 Claude 文件编辑工具记录的改动，不能撤销所有 Shell 或外部程序操作，也不能代替 Git 和备份。'],
      promptLabel: '在 Claude Code 会话中发送',
      prompt: '/compact 保留本次目标、允许修改的文件、已确认的原因、实际测试命令与结果、尚未解决的问题和下一步。不要把未执行的检查写成已通过。',
      check: '恢复后目录正确；压缩后的摘要仍能指导下一步；需要回退时先确认文件变更来自哪里。', sourceIds: ['best', 'workflows'],
    },
    {
      id: 'faq', kind: 'faq', title: '常见问题：规则未加载、跑偏与验证失败',
      paragraphs: ['下面集中处理学习 Claude Code 时容易混淆的几类情况。把复现命令、错误与目标放在一起，比反复要求“再试一次”更便于定位。'],
      faq: [
        { question: '写了 CLAUDE.md，为什么还是没有按要求做？', answer: '先用 /context 检查是否加载，再核对启动目录和文件作用范围。删除矛盾、过时或太笼统的规则。指令文件是上下文，不是能保证每次执行的权限开关。' },
        { question: '它一直读文件，却没有开始解决问题？', answer: '缩小调查范围，给出目标文件、具体症状和判断标准；先要求说明已发现什么、还缺什么。对话已有大量无关信息时，先保存交接，再压缩或新开会话。' },
        { question: '测试失败后，它建议跳过测试怎么办？', answer: '提供原始复现命令、错误和预期结果，要求定位根因。依赖或环境不齐时单独记录；不能把删除断言、屏蔽错误或没运行测试当作修复成功。' },
        { question: '退出后如何继续？/rewind 能撤销所有操作吗？', answer: '在正确目录使用 claude --continue 或 claude --resume，运行中的会话也可用 /resume。/rewind 的检查点只跟踪指定文件编辑工具的变化，Shell 命令和外部程序的变化需要另外核对与恢复。' },
      ],
      check: '能用文件来源、复现命令和实际输出描述问题；知道恢复对话不等于恢复文件。', sourceIds: ['memory', 'best', 'workflows'],
    },
    {
      id: 'case', kind: 'case', title: '实战练习：修复数量汇总的类型错误',
      paragraphs: ['下面提供实现与测试两个文件，使用 Node.js 24 即可运行，不需要安装依赖。起始实现故意把数字字符串直接相加，用来练习“复现 → 定位 → 最小修复 → 回归检查”。'],
      caseStudy: { status: 'practice', scope: '本站编写的可复现代码练习，测试用于表达目标行为。尚未让 Claude Code 执行修复；预期结果是人工设定的验收条件，不是产品实测报告。', result: '目标：sumCounts([2, "3", 4]) 返回数字 9，空数组返回 0；负数、空字符串和其他非法值抛出 TypeError。修复后原有五项测试全部通过。' },
      steps: ['下载练习 ZIP 并解压到独立目录，确认其中有 claude-total.mjs 和 claude-total.test.mjs；在该目录的系统终端运行 node --test claude-total.test.mjs，先阅读失败位置。', '在此目录启动 Claude Code，引用实现与测试，让它先解释字符串参与加法的原因及输入约定，再确认修改计划。', '只修改 claude-total.mjs。不得改掉测试预期或安装依赖；重新运行同一命令，并核对数字结果与非法输入。', '保存修改前后的差异、实际测试结果和未测项，形成自己的练习记录。'],
      prompt: '请读取 @claude-total.mjs 和 @claude-total.test.mjs。先运行 node --test claude-total.test.mjs，说明失败原因与输入约定，再给出最小修复计划。确认后只修改实现文件，不修改测试、不跳过断言、不安装依赖。再次执行同一命令并报告实际结果，不自动提交。',
      links: [
        { label: '下载完整练习 ZIP（实现与测试）', path: 'practice/manuals/claude-total-practice.zip', download: 'claude-total-practice.zip' },
        { label: '下载待修复实现', path: 'practice/manuals/claude-total.mjs', download: 'claude-total.mjs' },
        { label: '下载验收测试', path: 'practice/manuals/claude-total.test.mjs', download: 'claude-total.test.mjs' },
      ],
      check: '能解释修复前为何失败；修复后五项通过，测试文件保持不变，结果对应本次实现。', sourceIds: ['workflows', 'best'],
    },
  ],
};
