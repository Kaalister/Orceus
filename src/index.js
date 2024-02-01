import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { paramsParticles } from './constants';

import './index.css';
import 'particles.js/particles';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const particlesJS = window.particlesJS;
particlesJS('particles-js', paramsParticles);

reportWebVitals();
