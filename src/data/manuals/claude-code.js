import { claudeCodeWorkflows } from './claude-code-workflows.js';

export const claudeCodeManual = {
  scope: '已核对 Claude Code 官方快速开始、工作流程、项目指令与最佳实践。本篇限定终端入口；新增代码和测试为本站教学材料，未让 Claude Code 执行修复，不代表产品账号实测。',
  sources: [
    ...claudeCodeWorkflows.sources,
    { id: 'overview', title: 'Claude Code：概述与使用平台', url: 'https://code.claude.com/docs/zh-CN/overview' },
    { id: 'quickstart', title: 'Claude Code：快速开始', url: 'https://code.claude.com/docs/zh-CN/quickstart' },
  ],
  sections: [
    { id: 'install', title: '准备终端和可用账号', paragraphs: ['Claude Code 可用于终端、IDE、桌面和网页。本手册只演示终端工作方式，需要能访问相关服务的网络，以及适用的订阅、Console 或组织提供的访问方式。'], steps: ['打开本节官方快速开始，选择自己的操作系统及终端对应的安装方式。', '安装完成后，在终端检查 Claude Code 的版本。', '准备一个练习项目副本，避免第一次操作就使用重要项目。', '进入练习目录后运行 claude，按提示完成登录或组织规定的认证。'], promptLabel: '在终端检查安装', prompt: 'claude --version', check: '终端能显示版本号；启动后能确认工作目录和当前登录方式。', sourceIds: ['quickstart'] },
    { id: 'read', title: '进入项目后，先了解结构', paragraphs: ['把终端切换到练习项目目录，再运行 claude。第一次任务先让它解释项目，不急着改代码。不要把聊天中的建议命令当作已经执行成功的结果。'], prompt: '请只阅读当前项目，说明项目用途、入口文件、目录结构，以及现有的启动和测试命令。每个判断给出文件依据。不修改文件，也不要安装依赖。找不到的信息请明确写出来。', steps: ['核对回答中的项目目录是否正确。', '查看它引用的说明文件或配置，确认命令确实存在。', '如果项目没有测试，记录缺口，不要求它声称测试已经通过。'], check: '你能找到入口文件，并知道实际有哪些验证命令。', sourceIds: ['quickstart'] },
    { id: 'plan', title: '把修改范围控制在一个目标内', paragraphs: ['选择一个能检查的小变化，例如改正一处标题或修复一个布局问题。描述现象、预期结果、允许修改的位置和不能改变的行为。'], prompt: '请定位首页主标题的来源，说明把它改成“我的阅读角”需要修改哪个文件。只列计划，先不要修改。保持其他文案、链接、页面结构和依赖不变；同时说明修改后怎么验证。', check: '计划明确指出修改文件和验证方法，不把简单文字修改扩展成重构。', sourceIds: ['quickstart'] },
    { id: 'change', title: '执行修改，检查差异与结果', paragraphs: ['确认计划后继续执行。不同账号或组织可能采用不同权限模式；在当前界面核对实际设置，出现操作确认时先阅读范围。任务最终是否成功，以文件和运行结果为依据。'], steps: ['确认刚才的修改计划，让 Claude 完成限定变化。', '查看修改文件和差异，检查是否包含无关变化。', '执行项目已有的相关检查；页面变化还需要打开浏览器查看。', '检查失败时保留错误，继续定位原因，避免用跳过检查来结束任务。'], prompt: '现在按确认的计划修改。完成后列出改动文件、实际运行的检查及其结果。未执行的验证单独说明，不要自动提交或推送。', check: '标题在实际页面中已更新，原有链接仍可用；检查结果对应本次文件。', sourceIds: ['quickstart'] },
    { id: 'continue', title: '继续任务，或在结束前留下交接', paragraphs: ['在 Claude Code 会话中，/help 可以查看可用命令，/resume 可以继续之前的对话。重新开始前先检查工作目录，避免把另一项目的要求带入当前任务。'], steps: ['同一修改尚未结束时，继续提供失败信息和明确的下一步要求。', '需要离开时，让它总结已改文件、检查结果和剩余事项。', '回来后使用 /resume 选择对应会话，再核对文件的实际状态。', '遇到陌生命令用 /help 查询；不要把会话命令输入到系统 Shell 中。'], prompt: '请给这次任务留一份简短交接：目标、已修改文件、已完成检查、尚未验证的部分和下一步。只总结实际发生的事情，不新增修改。', check: '交接能帮助你找回正确项目，并区分已完成和待处理事项。', sourceIds: ['quickstart'] },
  ],
  extensions: claudeCodeWorkflows.sections,
  lessons: [],
};
