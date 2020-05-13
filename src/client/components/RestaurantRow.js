import React from 'react';
import styled from 'styled-components';

import { replaceHTTPwithHTTPS, convertCurrencyToPricing, getDistanceFromLatitudeLongitude } from '../../utils';

const CardContainer = styled.article`
    display: flex;
    flex-direction: column;
    padding: 16px 8px;
    border: 1px solid ${(p) => p.theme.colors.orangeOne};
    border-radius: 4px;
    margin-top: 10px;
    @media (min-width: 800px) {
        margin-top: 18px;
    }
`;

const EachRow = styled.div`
    display: flex;
    margin-top: 6px;
    width: 100%;
`;

const Img = styled.img`
    width: 100%;
    object-fit: cover;
`;

const ImgWrapper = styled.div`
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    box-sizing: border-box;
    object-fit: cover;
    @media (min-width: 800px) {
        /*stuff  */
    }
`;

const NameAndAdressCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 9px;
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

const Row = ({ restaurant, userLatitude, userLongitude }) => {
    return (
        <CardContainer>
            <EachRow>
                <ImgWrapper>
                    <Img src={replaceHTTPwithHTTPS(restaurant.thumb)} alt={restaurant.name} />
                </ImgWrapper>
                <NameAndAdressCol>
                    <Title>{restaurant.name}</Title>
                    <Address>{restaurant.location && restaurant.location.address}</Address>
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

// all_reviews: {reviews: Array(5)}
// all_reviews_count: 268
// average_cost_for_two: 30
// book_again_url: ""
// book_form_web_view_url: ""
// cuisines: "Burger, British"
// currency: "£"
// deeplink: "zomato://restaurant/6105938"
// establishment: ["Casual Dining"]
// establishment_types: []
// events_url: "https://www.zomato.com/london/patty-bun-marylebone/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
// featured_image: "https://b.zmtcdn.com/data/res_imagery/6105938_CHAIN_fd94fae498661d76fdbe62a97d04e6b8.jpg"
// has_online_delivery: 0
// has_table_booking: 0
// highlights: (10) ["Cash", "Lunch", "Serves Alcohol", "Credit Card", "Takeaway Available", "Dinner", "Indoor Seating", "Craft Beer", "Wifi", "Fullbar"]
// id: "6105938"
// include_bogo_offers: true
// is_book_form_web_view: 0
// is_delivering_now: 0
// is_table_reservation_supported: 0
// is_zomato_book_res: 0
// location: {address: "St Christopher's Place, 54 James Street, Marylebone, London W1U 1HE", locality: "James Street, Marylebone", city: "London", city_id: 61, latitude: "51.5154230000", …}
// menu_url: "https://www.zomato.com/london/patty-bun-marylebone/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop"
// mezzo_provider: "OTHER"
// name: "Patty & Bun"
// offers: []
// opentable_support: 0
// phone_numbers: "020 74873188"
// photo_count: 238
// photos: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// photos_url: "https://www.zomato.com/london/patty-bun-marylebone/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop"
// price_range: 2
// store_type: ""
// switch_to_order_menu: 0
// thumb: "https://b.zmtcdn.com/data/res_imagery/6105938_CHAIN_fd94fae498661d76fdbe62a97d04e6b8.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
// timings: "12 Noon to 11 PM (Mon-Sat),12 Noon to 10 PM (Sun)"
// url: "https://www.zomato.com/london/patty-bun-marylebone?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
// user_rating
