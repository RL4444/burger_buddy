import React from 'react';
import styled from 'styled-components';

import { replaceHTTPwithHTTPS, convertCurrencyToPricing, getDistanceFromLatitudeLongitude } from '../../utils';

const CardContainer = styled.article`
    display: flex;
    flex-direction: column;
    padding: 16px 8px;
    border-radius: 4px;
    background: #1e2426;
    margin-top: 10px;
    @media (min-width: 800px) {
        margin-top: 18px;
        padding: 15px 18px;
    }
    &:hover {
        cursor: pointer;
        background: #323c40;
    }
`;

const EachRow = styled.div`
    display: flex;
    margin-top: 6px;
    width: 100%;
`;

const Img = styled.img`
    border-radius: 50%;
    width: 100%;
    object-fit: cover;
    border: 1px solid ${(p) => p.theme.colors.orangeOne};
`;

const ImgWrapper = styled.div`
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    box-sizing: border-box;
    object-fit: cover;
    @media (min-width: 800px) {
        max-width: 80px;
        max-height: 80px;
        min-width: 80px;
        min-height: 80px;
    }
`;

const NameAndAdressCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 9px;
    @media (min-width: 800px) {
        margin-left: 14px;
    }
`;

const Title = styled.div`
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 20px;
    color: ${(p) => p.theme.colors.orangeOne};
    @media (min-width: 800px) {
        font-size: 24px;
    }
`;

const Address = styled.div`
    font-family: ${(p) => p.theme.fonts.main};
    font-size: 10px;
    color: white;
    @media (min-width: 800px) {
        font-size: 14px;
    }
`;

const Row = ({ restaurant, userLatitude, userLongitude, getRestaurant }) => {
    console.log('thumbnails ', restaurant.thumb, 'for ', restaurant.name);
    return (
        <CardContainer onClick={() => getRestaurant(restaurant.R.res_id)}>
            <EachRow>
                <ImgWrapper>
                    <Img src={replaceHTTPwithHTTPS(restaurant.thumb)} alt={restaurant.name} />
                </ImgWrapper>
                <NameAndAdressCol>
                    <Title>{restaurant.name}</Title>
                    {restaurant.location && <Address> {restaurant.location.locality}</Address>}
                </NameAndAdressCol>
            </EachRow>
            <EachRow style={{ marginTop: 18 }}>
                <Address>{restaurant.timings}</Address>
            </EachRow>
            <EachRow style={{ marginTop: 18, justifyContent: 'space-between' }}>
                <Title style={{ fontSize: '16px' }}>
                    {convertCurrencyToPricing(restaurant.price_range, restaurant.currency)}
                </Title>
                <Title style={{ fontSize: '16px' }}>Rating {restaurant.user_rating.aggregate_rating}</Title>
                <Title style={{ fontSize: '16px' }}>
                    {getDistanceFromLatitudeLongitude(
                        Number(userLatitude),
                        Number(userLongitude),
                        Number(restaurant.location.latitude),
                        Number(restaurant.location.longitude),
                        'K'
                    ).toFixed(1)}
                    km away
                </Title>
            </EachRow>
        </CardContainer>
    );
};

export default Row;
