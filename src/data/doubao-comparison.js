const original = { label: '练习原文', href: 'tutorials/doubao-notice/notice.txt' };
const before = { label: '真实初稿', href: 'practice/doubao-session/first-answer.txt' };
const after = { label: '真实修正版', href: 'practice/doubao-session/revised-answer.txt' };

// 只摘录本次实测文本；说明单独写在 note 和 takeaway 中。
export const doubaoComparison = {
  title: '追问前后，具体改了哪里？',
  caption: '2026-09-18 豆包网页版实测 · 展开看原文、初稿和修正版。',
  items: [
    {
      title: '报名与参加活动：拆开两件事、两个时间',
      takeaway: '报名截止是10月10日18:00，活动时间是10月12日14:00。拆开后，每项都能独立执行。',
      versions: [
        { ...original, excerpts: ['10月12日14:00举行读书会，地点另行通知。', '参加者须在10月10日18:00前填写报名表。'] },
        { ...before, excerpts: ['1. 事项：参加读书会，填写报名表\n负责人：参加者\n时间：10月10日18:00前'], note: '初稿把两件事合在报名截止时间下，容易误读。' },
        { ...after, excerpts: ['- [ ] 事项：填写读书会报名表\n负责人：参加者\n时间：10月10日18:00前', '- [ ] 事项：参加读书会\n负责人：参加者\n时间：10月12日14:00'] },
      ],
    },
    {
      title: '收集截止：保留未知，不猜一个日期',
      takeaway: '原文只说小林负责收集；报名截止不能直接当作小林的工作截止。',
      versions: [
        { ...original, excerpts: ['小林负责收集报名信息。'] },
        { ...before, excerpts: ['2. 事项：收集报名信息\n负责人：小林\n时间：待确认', '2. 收集报名信息的截止时间是否为10月10日18:00？'], note: '初稿已保留“待确认”，但追问问题中提出了一个未确认日期。' },
        { ...after, excerpts: ['- [ ] 事项：收集读书会报名信息\n负责人：小林\n时间：待确认', '2. 小林收集报名信息的截止时间？'], note: '修正版直接询问截止时间，继续保留“待确认”。' },
      ],
    },
  ],
};
