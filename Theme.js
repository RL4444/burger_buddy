import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
    colors: {
        // pageBackground: '#F2F0F1',
        pageBackground: '#ffeca6',
        orangeOne: '#fcd874',
        greyOne: '3D3D3D',
        powderWhite: '#FFFDF9',
        persianGreen: '#06B49A',
        lightBlue: '#AFDBD2',
        onyx: '#36313D',
    },
    fonts: {
        title: "'Pacifico', cursive;",
        otherTitle: "'Amatic SC', cursive;",
        main: "'Source Sans Pro', sans-serif",
    },
};

// font-family: "'Pacifico', cursive;"
// font-family: "'Amatic SC', cursive;"
// font-family: "'Quicksand', sans-serif;"

export const GlobalStyle = createGlobalStyle`
    * {
        font-family:'Source Sans Pro', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        background: #131313;
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100%;
    }
`;

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
