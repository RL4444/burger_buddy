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

const SortTab = styled.div`
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 18px;
    padding: 8px 20px;
    &.active {
        background: ${(p) => p.theme.colors.orangeOne};
        color: black;
    }
    &:hover {
        cursor: pointer;
    }
`;
const SortingTabs = ({ sortBy, setSortBy }) => (
    <SortingTabsWrapper>
        <SortTab onClick={() => setSortBy('cost', 'asc')} className={`${sortBy === 'cost' ? 'active' : ''}`}>
            Cheapest
        </SortTab>
        <SortTab onClick={() => setSortBy('rating', 'desc')} className={`${sortBy === 'rating' ? 'active' : ''}`}>
            Best
        </SortTab>
        <SortTab
            onClick={() => setSortBy('real_distance', 'asc')}
            className={`${sortBy === 'real_distance' ? 'active' : ''}`}
        >
            Closest
        </SortTab>
    </SortingTabsWrapper>
);

export default SortingTabs;
