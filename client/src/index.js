import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import { ContextProvider } from './SocketContext';
import App from './App';

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>, document.getElementById('root')
);