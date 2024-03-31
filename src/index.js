import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { paramsParticles } from './constants';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import './index.css';
import 'particles.js/particles';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

const particlesJS = window.particlesJS;
particlesJS('particles-js', paramsParticles);

reportWebVitals();
