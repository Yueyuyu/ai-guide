import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { LearningProvider } from './lib/hooks.jsx';
import './styles.css';
import './styles-review.css';

class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <main className="fatal-error"><h1>页面遇到了一点问题</h1><p>已保存的学习记录仍保留在当前浏览器中。</p><button onClick={() => window.location.reload()}>重新加载</button></main> : this.props.children; }
}
createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><LearningProvider><App/></LearningProvider></ErrorBoundary></React.StrictMode>);
