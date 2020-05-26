import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-named-as-default
import App from './App';
import Theme, { GlobalStyle } from '../../Theme';

export const Globe = require('../assets/globe.png');
export const Phone = require('../assets/phone.svg');
export const Position = require('../assets/position.png');

ReactDOM.render(
    <Theme>
        <GlobalStyle />
        <App />
    </Theme>,
    document.getElementById('root')
);
