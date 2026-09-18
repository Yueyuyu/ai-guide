import captures from './tutorial-images.json' with { type: 'json' };

// 仅控制网页中的查看区域；原始截图字节与放大弹窗中的完整画面保持不变。
const focusAreas = {
  'workbuddy-workspace-menu': { x: 22, y: 24, width: 58, height: 43 },
  'workbuddy-workspace-selected': { x: 22, y: 24, width: 58, height: 43 },
  'workbuddy-check-prompt': { x: 22, y: 24, width: 58, height: 43 },
  'workbuddy-plan': { x: 20, y: 12, width: 60, height: 67 },
  'workbuddy-confirm': { x: 20, y: 71, width: 60, height: 27 },
  'workbuddy-result': { x: 0, y: 7, width: 100, height: 55 },
  'workbuddy-revised': { x: 3, y: 14, width: 50, height: 39 },
};
const images = Object.fromEntries(captures.map(({ id, src, width, height, title, alt, caption, sourceUrl, markers, focus }) => [id, { src, width, height, title, alt, caption, sourceUrl, markers, focus: focus || focusAreas[id] }]));
export const capture = id => images[id];
export const photoStep = (id, title, action, checkpoint) => ({ title, action, checkpoint, screenshot: capture(id) });
