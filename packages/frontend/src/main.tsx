import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from './livekit';
import { HashRouter as Router } from 'react-router-dom';

const root = document.getElementById('root');

const init = (element: HTMLElement) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <Router>
        <Provider>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  );
};

if (root) {
  init(root);
}
