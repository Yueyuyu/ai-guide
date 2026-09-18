import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonById } from '../src/data/index.js';
import { apiAppRequest, apiExampleCases, apiPracticeNotice } from '../src/data/api-examples.js';
import { validateTaskOutput } from '../src/lib/api-output.js';
import { renderReadingPage, escapeHtml } from '../server/reading-pages.js';

test('API 独立阅读保留三份完整业务样例、核对解释和原练习位置', () => {
  const html = renderReadingPage('api-output-check');
  assert.ok(html.includes(apiPracticeNotice));
  for (const example of apiExampleCases) {
    assert.ok(html.includes(escapeHtml(example.value)));
    assert.ok(html.includes(escapeHtml(example.check)));
    assert.equal(validateTaskOutput(example.value).valid, example.id !== 'missing');
  }
  assert.match(html, /不调用模型，不是厂商原始响应/);
  assert.equal(lessonById['api-output-check'].sections.length, 4);
  assert.equal(lessonById['api-output-check'].sections.findIndex(section => section.resultEditor), 3);
  assert.equal(lessonById['api-output-check'].sections.findIndex(section => section.apiLab), 1);
  assert.equal(lessonById['api-first'].sections.length, 4);
  assert.ok(renderReadingPage('api-first').includes(escapeHtml(apiAppRequest)));
});
