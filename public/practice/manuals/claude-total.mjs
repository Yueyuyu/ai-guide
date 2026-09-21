// 教学起始文件：故意保留类型错误，供 Claude Code 练习定位与修复。
// 约定：接受非负安全整数，以及仅由十进制数字组成、数值为安全整数的字符串。
// 其他元素抛出 TypeError；本练习输入的总和不会超过安全整数范围。
export function sumCounts(values) {
  return values.reduce((total, value) => total + value, 0);
}
