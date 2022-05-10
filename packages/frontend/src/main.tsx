import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from './livekit';

const root = document.getElementById('root');

const init = (element: HTMLElement) => {
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

if (root) {
  init(root);
}
