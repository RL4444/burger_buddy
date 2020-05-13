import React from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
`;

const LoadingWrapper = styled.div`
    margin-top: 60px;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 25px;
    & h4 {
        margin: 10px;
    }
`;

const Footer = styled.div`
    margin-top: 60px;
    height: 100%;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.main};
    font-weight: 400;
    font-size: 14px;
`;

const LoadingIntroScreen = () => {
    return (
        <Container>
            <LoadingWrapper>
                <Spinner />
            </LoadingWrapper>
            <Footer>POWERED BY ZOMATO</Footer>
        </Container>
    );
};

export default LoadingIntroScreen;
