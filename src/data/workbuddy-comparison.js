const original = { label: '练习原文', href: 'practice/workbuddy-session/weekly-records.txt' };
const before = { label: '真实初稿', href: 'practice/workbuddy-session/weekly-summary-before.txt' };
const after = { label: '真实修正版', href: 'practice/workbuddy-session/weekly-summary.txt' };

// 摘录必须逐字对应已公开的实测文件；维护时由测试核对，避免把讲解写成模型输出。
export const workbuddyComparison = {
  title: '这次到底改了哪里？',
  caption: '2026-09-16 实测文件摘录 · 展开一项，对照三份文件。',
  items: [
    {
      title: '补回“虚构练习材料”标识',
      takeaway: '保留材料来源，避免把教学案例当成真实工作记录。',
      versions: [
        { ...original, excerpts: ['本周记录（2026年9月7日至11日，虚构练习材料）'] },
        { ...before, excerpts: ['来源：weekly-records.txt'], note: '初稿未保留“虚构练习材料”标识。' },
        { ...after, excerpts: ['来源：weekly-records.txt（原文标注为虚构练习材料；编号沿用原文来源编号，原始记录未改动）'] },
      ],
    },
    {
      title: 'W4：在事项中保留“下周”',
      takeaway: '初稿分组标题已有“下周计划”；修正后单独复制这一项，也不会丢失时间范围。',
      versions: [
        { ...original, excerpts: ['W4｜9月10日｜小陈｜计划｜下周安排一次FAQ评审，具体日期待确认。'] },
        { ...before, excerpts: ['W4｜9月10日｜小陈｜安排一次FAQ评审，具体日期：待确认。'] },
        { ...after, excerpts: ['W4｜9月10日｜小陈｜下周安排一次FAQ评审，具体日期：待确认。'] },
      ],
    },
    {
      title: '把两项未知日期集中列出',
      takeaway: '未知日期继续写“待确认”；整理成单独列表，方便下一次询问。',
      versions: [
        { ...original, excerpts: ['W3｜9月9日｜小林｜阻塞｜产品截图更新等待设计稿，交付时间未定。', 'W4｜9月10日｜小陈｜计划｜下周安排一次FAQ评审，具体日期待确认。'] },
        { ...before, excerpts: ['W3｜9月9日｜小林｜产品截图更新等待设计稿，交付时间：待确认。', 'W4｜9月10日｜小陈｜安排一次FAQ评审，具体日期：待确认。'], note: '初稿已写“待确认”，但分散在各组中。' },
        { ...after, excerpts: ['1. W3｜产品截图更新的交付时间——原文为“未定”，记作待确认。', '2. W4｜FAQ评审的具体日期——原文为“待确认”。'], note: '修正版集中放在“五、待确认事项”。' },
      ],
    },
  ],
};
