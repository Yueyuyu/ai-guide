import { doubaoNotice } from './doubao-notice.js';

export const moreAppLessons = [
  doubaoNotice,
  {
    id: 'glm-web-choice', edited: '2026-09-16', title: '智谱清言网页版：比较两个活动场地', description: '把条件列成对照表，让 AI 先说明缺什么，再提出建议。', category: 'models', platform: 'web', productId: 'glm', tools: ['glm'], level: '入门', minutes: 20, color: 'blue', cover: ['做一次有依据的选择', '用清言比较两个方案'],
    goals: ['进入智谱清言的普通对话', '分开硬性条件和个人偏好', '得到可核对的方案对照表'], prerequisite: '可登录 chatglm.cn。准备两个场地的测试信息，无需开发者 API Key，也不需要选择 GLM 接口地址。',
    sections: [
      {
      "title": "在清言网页新建对话",
      "paragraphs": [
        "打开 chatglm.cn 的普通文字对话，本课无需开发者 API。"
      ],
      "actionSteps": [
        "分别标明场地 A、B，并写出人数与预算上限。",
        "缺失字段留空，要求写“待确认”。"
      ],
      "visual": {
        "title": "硬条件与偏好分开",
        "items": [
          {
            "title": "必须满足",
            "text": "容纳 20 人；费用不超 800 元"
          },
          {
            "title": "额外加分",
            "text": "距离近、交通方便"
          }
        ],
        "kind": "compare",
        "label": "选择条件示意 · 非产品实测"
      }
    },
      {
      "title": "先比较条件，再给建议",
      "paragraphs": [
        "先排除不满足硬条件的场地，再比较交通等偏好。"
      ],
      "prompt": "帮我比较两个读书会场地。\n人数20，场地预算800元，交通近是加分项。\nA：容纳25人，费用600元，步行10分钟。\nB：容纳15人，费用500元，步行5分钟。\n请列出对照表，分别标明满足或不满足的条件。\n缺失的开放时间写待确认，先不要下预订结论。",
      "checkpoint": "B 虽然便宜且近，仍被指出容量不满足；开放时间没有被编造。"
    },
      {
      "title": "变更人数，看建议是否随条件变化",
      "paragraphs": [
        "在同一对话把人数改成 12 人，重新比较并保存两轮结果。"
      ],
      "visual": {
        "title": "人数变化，会改变可选方案",
        "items": [
          {
            "title": "20 人时",
            "text": "B 只能容纳 15 人，不能选"
          },
          {
            "title": "12 人时",
            "text": "A、B 都满足容量，再比费用与交通"
          }
        ],
        "kind": "compare",
        "label": "人工核对示例 · 非产品实测"
      }
    },
    ], exercises: ['在清言网页输入两组场地条件', '检查硬性条件与缺失项', '改为12人后重新核对建议'], takeaway: '先把条件写清楚，模型建议才有可以判断的依据。',
  },
];
