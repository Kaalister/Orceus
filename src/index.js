import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { paramsParticles } from './constants';

import './index.css';
import 'particles.js/particles';

ReactDOM.render(
    <div id="particles-js">
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
);

reportWebVitals();


document.addEventListener('DOMContentLoaded', () => {
    const particlesJS = window.particlesJS;
    particlesJS('particles-js', paramsParticles);
})