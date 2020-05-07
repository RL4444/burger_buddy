import React, { Component } from 'react';
import styled from 'styled-components';

import LoadingIntroScreen from './views/LoadingIntroScreen';
import Skeleton from './components/Skeleton';
import SearchCities from './views/SearchCities';
import RestaurantRow from './components/RestaurantRow';
const Container = styled.section`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.section`
    padding: 0 8px;
    height: 100%;
`;

const Title = styled.h1`
    padding-top: 60px;
    text-align: center;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 40px;
`;

const BurgerTable = styled.section`
    max-width: 600px;
    margin-top: 20px;
    padding: 0 20px;
    position: relative;
    overflow-y: scroll;
    position: relative;
    height: 380px;
    overflow-y: scroll;
`;
const SortingTabs = styled.div`
    text-align: center;
    margin-top: 30px;
    display: flex;
    padding: 0 20px;
    max-width: 600px;
    min-width: 280px;
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
`;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            longitude: 0,
            latitude: 0,
            cuisine: 168,
            sortBy: 'rating',
            direction: 'descending',
            radius: 5000,
            loading: true,
            burgerRestaurants: [],
            requesting: false,
            prompFindLocation: false,
            search: '',
        };
    }

    async componentDidMount() {
        await this.getLocationInfo();
    }

    getLocationInfo = async (id) => {
        try {
            let res = await fetch('/api/getLocation/');
            if (id) res = await fetch(`/api/getLocation/?cityId=${id}`);
            const data = await res.json();
            if (data.locationNotAvailable) {
                this.setState({ prompFindLocation: true, loading: false });
            } else {
                const { location } = data.data;
                this.setState({ loading: data.loading, prompFindLocation: false, location }, () =>
                    this.getBurgerJoints(location)
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    getLocationInfoFromSearchTerm = async (query) => {
        const queryWithSpacesRemoved = query.replace(' ', '+');
        try {
            const res = await fetch(`/api/getCityByTerm/?searchTerm=${encodeURIComponent(queryWithSpacesRemoved)}`);
            const data = await res.json();
            const { location } = data.data;
            this.setState({ location }, () => {
                this.getBurgerJoints(location);
            });
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };
    setLocation = (location) => {
        this.setState({ loading: true, prompFindLocation: false }, () => {
            console.log(location);
            const { name, country_name: countryName, state_name: stateName } = location;
            const query = `${name.toLowerCase()}+${
                stateName.includes('England') ? 'england' : stateName ? stateName : countryName.toLowerCase()
            }`;
            this.getLocationInfoFromSearchTerm(query);
        });
    };

    getBurgerJoints = async () => {
        const { location } = this.state;
        this.setState({ requesting: true, loading: false });
        try {
            const { latitude, longitude, entity_id: entityId } = location;
            const { radius, sortBy, direction } = this.state;
            const res = await fetch(
                `/api/getBurgerJoints/?latitude=${latitude}&longitude=${longitude}&entityId=${entityId}&radius=${radius}&sortBy=${sortBy}&direction=${direction}`
            );
            const { data } = await res.json();
            this.setState({ burgerRestaurants: data.restaurants, longitude, latitude });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ requesting: false });
        }
    };

    setSortBy = (sortBy, direction) => {
        this.setState({ sortBy, direction }, () => this.getBurgerJoints());
    };

    render() {
        const {
            longitude,
            latitude,
            loading,
            prompFindLocation,
            burgerRestaurants,
            requesting,
            sortBy,
        } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Title>Burger Buddy</Title>

                    {!loading && prompFindLocation && <SearchCities setLocation={this.setLocation} />}
                    {loading && <LoadingIntroScreen />}
                    {!loading && !prompFindLocation && (
                        <SortingTabs>
                            <SortTab
                                onClick={() => this.setSortBy('cost', 'ascending')}
                                className={`${sortBy === 'cost' ? 'active' : ''}`}
                            >
                                Cheapest
                            </SortTab>
                            <SortTab
                                onClick={() => this.setSortBy('rating', 'descending')}
                                className={`${sortBy === 'rating' ? 'active' : ''}`}
                            >
                                Best
                            </SortTab>
                            <SortTab
                                onClick={() => this.setSortBy('real_distance', 'ascending')}
                                className={`${sortBy === 'real_distance' ? 'active' : ''}`}
                            >
                                Closest
                            </SortTab>
                        </SortingTabs>
                    )}
                    {requesting && <Skeleton />}
                    {!requesting && !loading && burgerRestaurants.length > 0 && (
                        <>
                            <BurgerTable>
                                {burgerRestaurants.map((r) => {
                                    return (
                                        <RestaurantRow
                                            userLatitude={latitude}
                                            userLongitude={longitude}
                                            key={r.restaurant.id}
                                            restaurant={r.restaurant}
                                        />
                                    );
                                })}
                            </BurgerTable>
                        </>
                    )}
                </Wrapper>
            </Container>
        );
    }
}

export default App;
