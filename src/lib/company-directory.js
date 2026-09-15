import { companies } from '../data/companies.js';
import { tools } from '../data/products.js';

export function filterCompanyGroups({ kind = 'all', platform = 'all', query = '' } = {}) {
  const keyword = query.trim().toLowerCase();
  return companies.map(company => ({
    company,
    // 先筛具体产品，再移除空公司；类型、使用端和关键词必须同时满足。
    tools: company.toolIds.map(id => tools.find(tool => tool.id === id)).filter(tool =>
      (kind === 'all' || tool.kind === kind) &&
      (platform === 'all' || tool.platforms.includes(platform)) &&
      [company.name, ...(company.aliases || []), tool.name, tool.maker, ...(tool.aliases || []), ...tool.use].join(' ').toLowerCase().includes(keyword)
    ),
  })).filter(group => group.tools.length > 0);
}
