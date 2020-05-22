/* eslint-disable prefer-template */
import React from 'react';
import styled from 'styled-components';

import { convertCurrencyToPricing } from '../../utils';

import DetailCard from './DeatilCard';

const Container = styled.div`
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.75);
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    max-width: 600px;
    margin: 0 auto;
    overflow-y: scroll;
    background: ${(p) => p.theme.colors.orangeOne};
    color: black;
    padding-bottom: 20px;
`;

const Section = styled.section`
    box-sizing: border-box;
    margin-top: 24px;
    padding: 0 20px;
`;

const Header = styled.div`
    position: absolute;
    width: 100%;
    margin-right: 10px;
    height: 270px;
    -webkit-box-shadow: inset 0px 0px 99px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 99px 0px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 99px 0px rgba(0, 0, 0, 0.75);
`;

const CloseIcon = styled.div`
    text-align: right;
    position: relative;
    color: white;
    margin-right: 10px;
    & span {
        font-size: 40px;
        font-weight: 700;
        &:hover {
            cursor: pointer;
            color: black;
        }
    }
`;

const NameAndAddress = styled.div`
    box-sizing: border-box;
    background: black;
    border-radius: 4px;
    width: 250px;
    padding: 20px 10px;
    text-align: center;
    margin: 0 auto;
    color: ${(p) => p.theme.colors.orangeOne};
    -webkit-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    & h2 {
        font-family: ${(p) => p.theme.fonts.otherTitle};
        font-size: 44px;
    }
`;

const SocialIconsWrap = styled.div`
    display: flex;
    justify-content: space-around;
    width: 200px;
    margin: 8px auto 0 auto;
    box-sizing: border-box;
`;

const SocialIconA = styled.a`
    text-decoration: none;
    width: 30px;
`;

const SocialIcon = styled.img`
    width: 100%;
`;

const HeaderImg = styled.img`
    position: relative;
    width: 100%;
    height: 270px;
    object-fit: cover;
`;

const Details = styled.div`
    margin-top: 24px;
    padding: 0 20px;
    & p {
        font-family: ${(p) => p.theme.fonts.otherTitle};
    }
`;

const DetailCardWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const RestaurantImages = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
`;

const RestaurantImage = styled.img`
    object-fit: cover;
    min-width: 70px;
    max-width: 70px;
    min-height: 70px;
    max-height: 70px;
    margin-left: 4px;
    margin-top: 4px;
    -webkit-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.75);
`;

const RestaurantCard = ({ clearRestaurant, restaurant: data }) => {
    return (
        <Container>
            <div>
                <HeaderImg src={data.thumb} />
            </div>
            <Header>
                <CloseIcon>
                    <span onClick={() => clearRestaurant()}>×</span>
                </CloseIcon>
                <NameAndAddress>
                    <h2 style={{ height: 155 }}>
                        {data.name} <br />
                    </h2>
                    {/* <div style={{ fontSize: 14, marginTop: 12, padding: 8, lineHeight: '18px' }}>
                        {data.location.address}
                    </div> */}
                    <SocialIconsWrap>
                        <SocialIconA href={`http://maps.google.com/?q=${data.location.address}`} target='_blank'>
                            <SocialIcon
                                src={
                                    process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '' + '/public/assets/position.png'
                                }
                            />
                        </SocialIconA>
                        <SocialIconA href={`tel:${data.phone_numbers}`} target='_blank'>
                            <SocialIcon
                                src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '' + '/public/assets/phone.svg'}
                            />
                        </SocialIconA>
                        <SocialIconA href={`http://maps.google.com/?q=${data.location.address}`} target='_blank'>
                            <SocialIcon
                                src={process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '' + '/public/assets/globe.png'}
                            />
                        </SocialIconA>
                    </SocialIconsWrap>
                </NameAndAddress>
            </Header>
            <Details>
                <h4>Details</h4>
                <p style={{ textAlign: 'center', marginTop: 8 }}>{data.timings}</p>
                <DetailCardWrap>
                    <DetailCard
                        title='Average Price For Two'
                        mainText={`${data.currency}
                    ${data.average_cost_for_two}`}
                        subtext='Average'
                    />
                    <DetailCard mainText={data.user_rating.aggregate_rating} subtext='Rating' />
                    <DetailCard mainText={convertCurrencyToPricing(data.price_range, data.currency)} subtext='value' />
                </DetailCardWrap>
            </Details>
            {data.photos && data.photos.length > 0 && (
                <Section>
                    <h4>Photos</h4>
                    <RestaurantImages>
                        {data.photos.map(({ photo }) => {
                            return <RestaurantImage key={photo.id} src={photo.url} />;
                        })}
                    </RestaurantImages>
                </Section>
            )}
        </Container>
    );
};

export default RestaurantCard;
