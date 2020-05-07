import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
    display: inline-block;
    width: ${(p) => p.width};
    height: ${(p) => p.height};
    position: relative;
    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${(p) => p.width};
        height: ${(p) => p.height};
        margin: ${(p) => p.margin};
        border: ${(p) => p.fatness} solid #fff;
        border-radius: 50%;
        animation: ${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fcd874 transparent transparent transparent;
    }
    & div:nth-child(1) {
        animation-delay: -0.45s;
    }
    & div:nth-child(2) {
        animation-delay: -0.3s;
    }
    & div:nth-child(3) {
        animation-delay: -0.15s;
    }
`;

const Spinner = ({ width = '80px', height = '80px', fatness = '6px', margin = '8px' }) => {
    return (
        <SpinnerWrapper width={width} height={height} fatness={fatness} margin={margin}>
            <div />
            <div />
            <div />
            <div />
        </SpinnerWrapper>
    );
};

export default Spinner;
