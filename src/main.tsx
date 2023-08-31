import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('app') as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
