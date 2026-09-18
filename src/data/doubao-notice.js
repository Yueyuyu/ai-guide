import { photoStep } from './tutorial-captures.js';
import { doubaoComparison } from './doubao-comparison.js';

export const noticeMaterial = `读书会通知（虚构练习材料）
10月12日14:00举行读书会，地点另行通知。
参加者须在10月10日18:00前填写报名表。
参加者需在活动当天带一本想分享的书。
小林负责收集报名信息。
主持人尚未确定。`;

export const noticePrompt = `请只根据下面的通知，整理一份待办清单。
每项写清楚：事项、负责人、时间、原文依据。
原文没有写明的信息一律写“待确认”，不要补充报名链接、费用或结束时间。
最后单独列出需要追问的问题。

${noticeMaterial}`;

export const noticeFollowup = `请在同一份通知基础上修正刚才的清单：
1. 将“填写报名表”与“参加读书会”分成两项。报名截止是10月10日18:00，读书会时间是10月12日14:00，不能混用。
2. 改为可勾选短句，每项保留事项、负责人、时间和原文依据。
3. 小林收集报名信息的截止时间仍待确认；地点、主持人待确认。
4. 不添加原文没有的报名链接、费用或结束时间。
最后简短说明修正了哪里，并单列待确认问题。`;

const imageRoot = 'tutorials/doubao-notice/';
const entryImage = {
  title: '豆包：登录与对话入口', src: imageRoot + 'web-entry.jpg', width: 1280, height: 720,
  alt: '豆包未登录网页：右上角登录，中间对话选项，底部消息输入框。',
  caption: '豆包官网实拍 · 2026-09-15 · 未登录状态，电脑浏览器。',
};

export const doubaoNotice = {
  id: 'doubao-notice', title: '豆包网页版：整理并保存第一份待办清单',
  description: '打开网页，复制一段通知，核对 AI 的回答，再把自己的成果保存下来。',
  category: 'models', platform: 'web', productId: 'doubao', tools: ['doubao'], lessonType: 'operation',
  level: '入门', minutes: 15, color: 'peach', edited: '2026-09-18',
  cover: ['第一份待办清单', '网页提问 · 核对 · 保存'],
  goals: ['网页提问', '核对回答', '保存清单'],
  prerequisite: '准备能打开豆包官网的浏览器和可用账号。本课截图以电脑浏览器为例；不需要安装桌面软件，不需要 API Key。下面已提供虚构材料。',
  resultSaving: { material: noticeMaterial, filename: 'AIGuide-我的第一份待办清单.txt' },
  sections: [
    {
      title: '打开豆包，找到“对话”',
      paragraphs: ['保留教程标签页，在豆包完成操作后再回来。'],
      walkthrough: [
        { title: '登录', action: '打开豆包官网，点右上角“登录”，按官方提示完成。', checkpoint: '自己的账号已登录；本图仅展示登录入口。', screenshot: { ...entryImage, markers: [{ x: 94, y: 9, title: '登录', description: '按官网提示登录自己的账号。' }] } },
        photoStep('doubao-entry', '选择对话', '登录后选择“对话”，找到底部消息输入框。', '能输入文字；本课使用对话模式。'),
      ],
      supplement: { title: '本次实测与截图说明', paragraphs: ['2026-09-18，在用户本人完成登录后，实际提问、追问、复制回答，并回到本站下载 TXT、核对磁盘文件。界面标签为“豆包 快速”，未核实底层模型 ID。', '登录入口沿用 2026-09-15 的未登录实拍；其余步骤为本次截图，已收起私人侧栏。未录制登录过程，未测试真实手机、附件和搜索。'] },
      links: [{ label: '打开豆包网页版', href: 'https://www.doubao.com/chat/', external: true }],
    },
    {
      title: '准备一份能逐项核对的通知',
      paragraphs: ['读一遍虚构通知：地点、主持人、小林收集报名的截止时间都没确定。下一步已包含原文，不用上传文件。'],
      prompt: noticeMaterial, promptLabel: '练习原文 · 虚构材料',
      downloads: [{ label: '下载练习通知（TXT）', href: imageRoot + 'notice.txt', filename: 'AIGuide-练习通知.txt' }],
    },
    {
      title: '复制完整提示词，发送第一次提问',
      paragraphs: [],
      walkthrough: [photoStep('doubao-prompt', '粘贴并发送', '复制下方完整提示词，粘贴到豆包，再点蓝色向上箭头。', '看到豆包返回的清单，而不只是自己的提问。')],
      prompt: noticePrompt, promptLabel: '第一次提问 · 已包含完整通知',
      promptPreview: '只根据通知整理待办，保留负责人、时间和原文依据。\n复制时会带上完整通知；未知信息写“待确认”。',
    },
    {
      title: '对照原文，检查每一项',
      noticeReview: true,
      paragraphs: ['这次初稿把报名和参加活动合在一项里。你的回答可能不同，按原文逐项检查。'],
      walkthrough: [photoStep('doubao-first-answer', '找出要修正的地方', '对照原文，检查报名截止、活动时间和小林的收集时间。', '能指出报名与活动的时间是否混用；没有依据的信息已标出。')],
      downloads: [{ label: '下载本次真实初稿', href: 'practice/doubao-session/first-answer.txt', filename: '豆包-真实初稿.txt' }],
      reference: {
        label: '人工参考答案 · 用于核对，不是 AI 实测输出',
        columns: ['事项', '负责人', '时间', '原文依据'],
        rows: [
          ['参加读书会', '参加者', '10月12日14:00', '10月12日14:00举行读书会'],
          ['填写报名表', '参加者', '10月10日18:00前', '参加者须在10月10日18:00前填写报名表'],
          ['带一本想分享的书', '参加者', '活动当天；具体准备时间待确认', '参加者需在活动当天带一本想分享的书'],
          ['收集报名信息', '小林', '待确认', '小林负责收集报名信息'],
        ],
      },
      list: ['地点、主持人、收集截止时间：均为“待确认”。', '报名链接、费用、结束时间：不能凭空补充。'],
      supplement: { title: '表达不同，算不算错？', paragraphs: ['措辞和排版可以不同，事实要与原文一致。“联系小林”等额外建议可以标为建议，不能冒充通知安排。参考答案为本站人工整理，不是豆包实测输出。'] },
    },
    {
      title: '追问一次，只修改需要改的地方',
      paragraphs: ['本次追问拆开了两件事。只修正你自己回答中存在的问题。'],
      walkthrough: [
        photoStep('doubao-followup', '发送追问', '在同一对话发送下方修正要求，不必重新开一条对话。', '豆包开始修改上一轮清单。'),
        photoStep('doubao-revised-answer', '复查两项时间', '看修正版的前两项，再核对全部待确认信息。', '报名截止与活动时间各自对应，地点、主持人和收集截止仍未擅自补全。'),
      ],
      prompt: noticeFollowup,
      promptLabel: '第二次提问 · 在原对话中继续',
      promptPreview: '将报名和参加活动分开，分别保留时间。\n改成可勾选短句；继续保留三项待确认信息。',
      comparison: doubaoComparison,
    },
    {
      title: '把自己的成果保存下来',
      checkpoint: '我已打开下载的 TXT，看到原通知、自己的清单，以及地点、主持人和收集截止时间的待确认项。',
      walkthrough: [
        photoStep('doubao-copy-answer', '复制回答', '在修正版回答底部点复制图标。', '复制整条回答，包括末尾的待确认问题。'),
        photoStep('doubao-save-result', '粘贴并下载', '回到本站下方文本框，粘贴回答，再点“下载我的成果（TXT）”。', '浏览器下载列表里出现 TXT；打开后能看到原通知和自己的清单。'),
      ],
      paragraphs: ['内容只保存在当前浏览器，不上传本站服务器。'],
      downloads: [{ label: '下载本次实际保存的成果', href: 'practice/doubao-session/saved-result.txt', filename: '豆包-实测保存成果.txt' }],
      supplement: { title: '实测到哪一步？', paragraphs: ['本次确认下载已落盘，读取文件核对了原通知、完整修正版和中文编码。尚未在系统记事本中打开；你的练习仍需自行打开文件确认。'] },
      resultEditor: true,
    },
    {
      title: '遇到问题时这样处理',
      paragraphs: ['第一次练习不用一次把所有功能学完。先解决当前这一步，再继续。'],
      faq: [
        ['打不开网页或无法登录？', '先检查官网地址和网络是否正常，并按官网提示处理账号问题。你仍可下载材料、阅读参考答案；尚未取得真实回答时，不要勾选“完成网页练习”。'],
        ['发送后没有回答，或者又回到首页？', '先看右上角是否仍显示“登录”，并检查页面的报错或使用限制。本次未登录试发确实返回了首页，不能把材料显示出来当成已经生成成功。'],
        ['回答和参考答案不一样？', '逐项看是否保留了原文事实。表格或清单都可以；有原文依据的不同表达可以接受，凭空补充的信息需要追问纠正。'],
        ['复制或下载没有成功？', '可手动选中文本复制。下载后检查浏览器的下载列表；也可把结果粘贴到记事本，再选择“另存为”，用 UTF-8 编码保存。本站不会仅凭点击下载判断你已保存成功。'],
        ['想继续学豆包工作？', '完成这次网页练习后，再选学豆包桌面版工作模式。安装、账号条件和电脑文件操作在独立教程里说明。'],
      ],
      links: [{ label: '选学：豆包桌面工作模式', href: '#/learn/doubao-work-start' }, { label: '反馈这次豆包实操的卡点', href: '#/feedback?track=doubao' }],
    },
  ],
  exercises: ['我已在豆包网页版取得一次真实回答，并在同一对话中追问', '我已按原文核对日期、负责人和所有待确认项', '我已保存自己的整理结果，并打开文件确认内容完整'],
  takeaway: '把需求说清楚，把答案核对清楚，把成果保存下来，这就完成了第一次 AI 实操。',
};
