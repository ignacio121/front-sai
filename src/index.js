// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa desde 'react-dom/client'
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Usa createRoot correctamente

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
