import React from 'react';
import styled, { keyframes } from 'styled-components';

const Load = keyframes`
    0% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.8;
  }
}
`;

const CardSkeleton = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    height: 80px;
    background: ${(p) => p.theme.colors.orangeOne};
    border: 1px solid ${(p) => p.theme.colors.orangeOne};
    border-radius: 4px;
    margin-top: 10px;
    animation: ${Load} 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    &.brown {
        background: #8a461c;
        border: 1px solid #8a461c;
        width: 110%;
        margin-left: -5%;
    }
    @media (min-width: 800px) {
        height: 130px;
        margin-top: 18px;
    }
`;

const Skeleton = () => {
    return (
        <h3 style={{ color: 'white' }}>
            <CardSkeleton />
            <CardSkeleton className='brown' />
            <CardSkeleton />
        </h3>
    );
};

export default Skeleton;
