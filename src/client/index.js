import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-named-as-default
import App from './App';
import Theme, { GlobalStyle } from '../../Theme';

ReactDOM.render(
    <Theme>
        <GlobalStyle />
        <App />
    </Theme>,
    document.getElementById('root')
);
