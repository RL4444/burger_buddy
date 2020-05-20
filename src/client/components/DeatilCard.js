import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 80px;
    box-sizing: border-box;
    border: 1px solid ${(p) => p.theme.colors.orangeOne};
    color: ${(p) => p.theme.colors.orangeOne};
    height: 120px;
    background: black;
    border-radius: 4px;
    text-align: center;
    display: flex;
    margin-top: 16px;
    flex-direction: column;
    -webkit-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    margin-left: 8px;
    &:first-child {
        margin-left: 0;
    }
`;
const Main = styled.h3`
    margin: auto auto;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 50px;
`;
const Sub = styled.h5`
    padding: 8px;
    box-sizing: border-box;
    border-top: 1px solid ${(p) => p.theme.colors.orangeOne};
    margin-top: auto;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.main};
    font-size: 12px;
`;

const DetailCard = ({ mainText, subtext, title = 'details' }) => (
    <Container title={title}>
        <Main>{mainText}</Main>
        <Sub>{subtext}</Sub>
    </Container>
);

export default DetailCard;
