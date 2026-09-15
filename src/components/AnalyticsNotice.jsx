import React from 'react';
export function AnalyticsNotice() {
  return <p>{import.meta.env.AIGUIDE_ANALYTICS_ENABLED
    ? '本站已配置 Cloudflare Web Analytics，用于了解整页访问、来源和加载性能，不使用分析 Cookie。它不读取练习草稿、反馈正文或其他工具中的对话。当前未统计 Hash 页面切换、课程完成或账号人数；访问量不能当作独立学习者人数。统计脚本被屏蔽时可能漏记。'
    : '网站访问统计尚未启用，暂无可报告的访客数或完成率。浏览器里的个人进度和 GitHub 仓库访问量都不等于网站真实受众。'}</p>;
}
