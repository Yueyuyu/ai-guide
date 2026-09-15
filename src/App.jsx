import React, { lazy, Suspense, useEffect } from 'react';
import { lessonById, tools, companies, paths, projects } from './data/index.js';
import { useRoute } from './lib/hooks.jsx';
import { Shell } from './components/Shell.jsx';
import { NotFound } from './components/Shared.jsx';
import { Discover } from './pages/Discover.jsx';
import { Catalog } from './pages/Catalog.jsx';
import { ToolDetail } from './pages/Tools.jsx';
import { Tools } from './pages/ToolDirectory.jsx';
import { CompanyDetail } from './pages/Company.jsx';
import { Paths, PathDetail } from './pages/Paths.jsx';
import { Projects, ProjectDetail } from './pages/Projects.jsx';
import { Library } from './pages/Library.jsx';
import { Models, ModelDetail } from './pages/Models.jsx';
import { Search } from './pages/Search.jsx';
import { About } from './pages/About.jsx';

// 首次进入首页时无需下载阅读器与图表交互代码，按路由加载并保留导航。
const Reader = lazy(() => import('./pages/Reader.jsx').then(module => ({ default: module.Reader })));
const Ranking = lazy(() => import('./pages/Ranking.jsx').then(module => ({ default: module.Ranking })));
const Feedback = lazy(() => import('./pages/Feedback.jsx').then(module => ({ default: module.Feedback })));

export function App() {
  const route = useRoute();
  useEffect(() => {
    const title = route.page === 'learn' ? lessonById[route.id]?.title : route.page === 'company' ? companies.find(company => company.id === route.id)?.name : ['tool', 'model'].includes(route.page) ? tools.find(tool => tool.id === route.id)?.name : route.page === 'path' ? paths.find(path => path.id === route.id)?.title : route.page === 'project' ? projects.find(project => project.id === route.id)?.title : ({ feedback: '试用与反馈', models: '模型指南', model: '模型学习', ranking: '模型排名', search: '搜索教程与工具', discover: '从这里，学会 AI。', tutorials: '全部教程', tools: '工具教程', paths: '学习路线', projects: '实战项目', library: '我的学习' })[route.page];
    document.title = `${route.page === 'about' ? '关于与来源' : title || '页面未找到'} — AIGuide`;
  }, [route]);
  let content;
  switch (route.page) {
    case 'feedback': content = <Feedback key={route.params.get('track')} route={route}/>; break;
    case 'discover': content = <Discover/>; break;
    case 'tutorials': content = <Catalog route={route}/>; break;
    case 'tools': content = <Tools route={route}/>; break;
    case 'company': content = <CompanyDetail key={route.id} id={route.id}/>; break;
    case 'tool': content = tools.find(t => t.id === route.id)?.kind === 'model' ? <ModelDetail id={route.id}/> : <ToolDetail id={route.id} route={route}/>; break;
    case 'models': content = <Models/>; break;
    case 'model': content = <ModelDetail id={route.id}/>; break;
    case 'ranking': content = <Ranking route={route}/>; break;
    case 'search': content = <Search route={route}/>; break;
    case 'about': content = <About/>; break;
    case 'paths': content = <Paths/>; break;
    case 'path': content = <PathDetail id={route.id}/>; break;
    case 'projects': content = <Projects/>; break;
    case 'project': content = <ProjectDetail id={route.id}/>; break;
    case 'learn': content = <Reader key={route.id + (route.params.get('path') || '') + (route.params.get('section') || '')} id={route.id} pathId={route.params.get('path')} startSection={route.params.get('section')}/>; break;
    case 'library': content = <Library route={route}/>; break;
    default: content = <NotFound/>;
  }
  return <Shell route={route}><Suspense fallback={<div className="soft-panel" role="status">正在打开页面…</div>}>{content}</Suspense></Shell>;
}
