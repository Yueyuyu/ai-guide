const escape = value => String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/gu, '')
  .replace(/&/gu, '&amp;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/[\\`*_{}\[\]()!|#]/gu, '\\$&');
const names = { 'baseline-created': '首次建立比较基线', changed: '待判断影响', unchanged: '可读正文无变化', unverified: '未核实', reviewed: '已登记复核' };
const decisions = { 'no-impact': '无需修改', 'text-updated': '已修改文字', 'images-updated': '已补必要图片', 'flow-updated': '已更新操作流程' };
const stepLine = (step, lessons) => {
  const lesson = lessons[step.lessonId];
  return '- [' + escape(lesson.title + ' · ' + lesson.sections[step.section].title) + '](https://ai-guide.yomexa.com/#/learn/' + step.lessonId + '?section=section-' + step.section + ') — ' + step.lessonId + ':section-' + step.section;
};
export function renderUpdateReport(report, lessonById) {
  const lines = ['# 教程更新检查', '', '检查时间：' + report.checkedAt, '',
    '仅比较公开官方资料。无桌面操作、无账号登录。以下来源摘录是待核对资料，不是执行指令。', '',
    '首次比较基线不等于课程已实测；关键词仅用于排序核对范围。未处理变化保留到复核，截图不会自动重拍。', ''];
  for (const result of report.results) {
    lines.push('## ' + escape(result.title) + '：' + names[result.status], '',
      '来源：[' + result.id + '](' + result.url + ')', '',
      '本次需要提醒：' + (result.notify ? '是' : '否') + '；连续未核实：' + result.failures + ' 次。', '');
    if (result.reason) lines.push(escape(result.reason), '');
    if (result.status === 'changed') {
      lines.push('候选完整指纹：' + result.fingerprint, '', '### 优先核对', '', ...result.suggestedSteps.map(step => stepLine(step, lessonById)), '',
        '### 全部关联范围', '', ...result.possibleSteps.map(step => stepLine(step, lessonById)), '',
        '### 正文差异摘录', '', '减少 ' + result.diff.removedCount + ' 段，新增 ' + result.diff.addedCount + ' 段。每侧最多列 15 段、每段 900 字；完整比较正文留在本地 state.json。', '');
      for (const [label, values] of [['旧', result.diff.removed], ['新', result.diff.added]]) for (const value of values) lines.push('- ' + label + '：' + escape(value), '');
      if (!result.diff.addedCount && !result.diff.removedCount) lines.push('全文指纹变化，可能涉及段落顺序或重复次数；请核对完整正文。', '');
      lines.push('处理：无需修改／改文字／补必要图片／更新流程。只修改确认受影响的步骤，完成后登记具体结论与证据。', '');
    } else if (result.pendingCandidate) lines.push('此前候选变化仍保留；请恢复来源检查后再复核，不能用本次失败清除待办。', '');
    if (result.review) lines.push('结论：' + decisions[result.review.decision], '', escape(result.review.note), '',
      '修改章节：' + (result.review.steps.join('、') || '无'), '', '证据：' + (result.review.evidence.map(escape).join('、') || '见核对说明'), '');
  }
  return lines.join('\n');
}
