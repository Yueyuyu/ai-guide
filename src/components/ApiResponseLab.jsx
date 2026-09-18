import React, { useState } from 'react';
import { apiExamples, validateTaskOutput } from '../lib/api-output.js';
import { apiExampleCases, apiPracticeNotice } from '../data/api-examples.js';

export function ApiResponseLab() {
  const [value, setValue] = useState(apiExamples.valid);
  const [result, setResult] = useState(null);
  const change = text => { setValue(text); setResult(null); };
  return <div className="api-response-lab">
    <div className="lab-heading"><strong>响应校验练习台</strong><span>仅在本页检查格式</span></div>
    <p>原通知：{apiPracticeNotice}</p>
    <div className="lab-examples">{apiExampleCases.map(example => <button key={example.id} className="button secondary" type="button" onClick={() => change(example.value)}>填入{example.label}</button>)}</div>
    <label htmlFor="api-response-input">待检查的 JSON</label>
    <textarea id="api-response-input" spellCheck={false} value={value} maxLength={12000} onChange={event => change(event.target.value)} aria-describedby="api-response-help"/>
    <p id="api-response-help">不发送网络请求，不需要密钥，不产生模型调用费用。切换示例会替换框内内容。</p>
    <button className="button primary" type="button" onClick={() => setResult(validateTaskOutput(value))}>检查这份数据</button>
    <div className="lab-result" role="status" aria-live="polite">{result && (result.valid ? <><strong>结构符合约定</strong><p>{result.taskCount} 个任务，{result.questionCount} 个待确认问题。{!result.taskCount && '当前没有可创建的任务。'}还要对照原文核对事实，格式正确不代表内容正确。</p></> : <><strong>请修正后再继续</strong><ul>{result.errors.map(error => <li key={error}>{error}</li>)}</ul></>)}</div>
  </div>;
}
