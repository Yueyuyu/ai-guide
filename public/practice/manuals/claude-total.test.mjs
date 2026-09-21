// 人工编写的教学验收条件，不是 Claude Code 的运行记录。
import test from 'node:test';
import assert from 'node:assert/strict';
import { sumCounts } from './claude-total.mjs';

test('纯数字得到数量总和', () => assert.equal(sumCounts([2, 3, 4]), 9));
test('数字字符串参与数值相加', () => assert.equal(sumCounts([2, '3', 4]), 9));
test('空数组得到零', () => assert.equal(sumCounts([]), 0));
test('拒绝负数', () => assert.throws(() => sumCounts([2, -1]), TypeError));
test('拒绝空值及其他非法数量', () => {
  for (const value of ['', '  ', '3.5', 'oops', null, true, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '9007199254740992']) {
    assert.throws(() => sumCounts([2, value]), TypeError, String(value));
  }
});
