import React from 'react';
import styled from 'styled-components';

const SortingTabsWrapper = styled.div`
    text-align: center;
    margin-top: 30px;
    display: flex;
    padding: 0 20px;
    max-width: 600px;
    width: 100%;
    justify-content: space-around;
`;

const SortTab = styled.button`
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 18px;
    padding: 8px 20px;
    background: transparent;
    border: 1px solid transparent;
    outline: none;
    &.active {
        background: ${(p) => p.theme.colors.orangeOne};
        color: black;
    }
    &:hover {
        cursor: pointer;
        border: 1px solid ${(p) => p.theme.colors.orangeOne};
    }
`;
const SortingTabs = ({ sortBy, setSortBy, disabled }) => (
    <SortingTabsWrapper>
        <SortTab
            type='button'
            disabled={disabled}
            onClick={() => setSortBy('cost', 'asc')}
            className={`${sortBy === 'cost' ? 'active' : ''}`}
        >
            Cheapest
        </SortTab>
        <SortTab
            type='button'
            disabled={disabled}
            onClick={() => setSortBy('rating', 'desc')}
            className={`${sortBy === 'rating' ? 'active' : ''}`}
        >
            Best
        </SortTab>
        <SortTab
            type='button'
            disabled={disabled}
            onClick={() => setSortBy('real_distance', 'asc')}
            className={`${sortBy === 'real_distance' ? 'active' : ''}`}
        >
            Closest
        </SortTab>
    </SortingTabsWrapper>
);

export default SortingTabs;
