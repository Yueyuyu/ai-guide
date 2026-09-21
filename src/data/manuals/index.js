import { manualCatalog } from '../manual-catalog.js';
import { openaiManual } from './openai.js';
import { workbuddyManual } from './workbuddy.js';
import { zcodeManual } from './zcode.js';
import { claudeCodeManual } from './claude-code.js';

const content = { openai: openaiManual, workbuddy: workbuddyManual, zcode: zcodeManual, 'claude-code': claudeCodeManual };
// 旧章节 ID 与顺序保留，新功能和案例追加在后，已分享的深链继续可用。
export const manuals = manualCatalog.map(item => {
  const { sections, extensions, ...body } = content[item.id];
  return { ...item, ...body, sections: [...sections.map(section => ({ kind: 'basics', ...section })), ...extensions] };
});
export const getManual = id => manuals.find(manual => manual.id === id);
