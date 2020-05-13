import React, { Component } from 'react';
import styled from 'styled-components';

import LoadingIntroScreen from './views/LoadingIntroScreen';
import Skeleton from './components/Skeleton';
import SearchCities from './views/SearchCities';
import RestaurantRow from './components/RestaurantRow';
import SortingTabs from './components/SortingTabs';
import Spinner from './components/Spinner';

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

const Button = styled.div`
    background: transparent;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid ${(p) => p.theme.colors.orangeOne};
    border-radius: 4px;
    text-align: center;
    &:hover {
        background: ${(p) => p.theme.colors.orangeOne};
        color: black;
        cursor: pointer;
    }
`;

const Title = styled.h1`
    padding-top: 40px;
    text-align: center;
    color: ${(p) => p.theme.colors.orangeOne};
    font-family: ${(p) => p.theme.fonts.otherTitle};
    font-size: 40px;
    @media (min-width: 800px) {
        font-size: 60px;
    }
`;

const BurgerTable = styled.section`
    max-width: 600px;
    margin-top: 20px;
    padding: 0 20px;
    position: relative;
    overflow-y: scroll;
    position: relative;
    height: 60vh;
    overflow-y: scroll;
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
            direction: 'desc',
            radius: 5000,
            loading: true,
            burgerRestaurants: [],
            requesting: false,
            extending: false,
            prompFindLocation: false,
            search: '',
            start: 0,
        };
    }

    async componentDidMount() {
        await this.getLocationInfo();
    }

    getLocationInfo = async () => {
        try {
            let res = await fetch('/api/getLocation/');
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
            const { name, country_name: countryName, state_name: stateName } = location;
            const query = `${name.toLowerCase()}+${
                stateName.includes('England') ? 'england' : stateName ? stateName : countryName.toLowerCase()
            }`;
            this.getLocationInfoFromSearchTerm(query);
        });
    };

    getBurgerJoints = async (extending = false) => {
        const { location, burgerRestaurants } = this.state;
        this.setState({
            requesting: burgerRestaurants.length === 0,
            loading: false,
            extending: burgerRestaurants.length !== 0,
        });
        try {
            const { latitude, longitude, entity_id: entityId } = location;
            const { radius, sortBy, direction, start, burgerRestaurants } = this.state;
            const res = await fetch(
                `/api/getBurgerJoints/?latitude=${latitude}&longitude=${longitude}&entityId=${entityId}&radius=${radius}&sortBy=${sortBy}&direction=${direction}&start=${start}`
            );
            const { data } = await res.json();
            const maxRestaurants = data.results_found - 40;
            this.setState({
                burgerRestaurants: [...burgerRestaurants, ...data.restaurants],
                longitude,
                latitude,
                hasNextCursor: burgerRestaurants.length + 20 < maxRestaurants,
            });
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ requesting: false, extending: false });
        }
    };

    setSortBy = (sortBy, direction) => {
        this.setState({ sortBy, direction, start: 0, burgerRestaurants: [] }, () => this.getBurgerJoints());
    };

    extendList = () => {
        const { start } = this.state;
        this.setState({ start: start + 20 }, () => this.getBurgerJoints());
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
            extending,
            hasNextCursor,
        } = this.state;
        return (
            <Container>
                <Wrapper>
                    <Title>Burger Buddy</Title>

                    {!loading && prompFindLocation && <SearchCities setLocation={this.setLocation} />}
                    {loading && <LoadingIntroScreen />}
                    {!loading && !prompFindLocation && <SortingTabs sortBy={sortBy} setSortBy={this.setSortBy} />}
                    {requesting && <Skeleton />}
                    {!requesting && !loading && burgerRestaurants.length > 0 && (
                        <BurgerTable>
                            <>
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
                            </>
                            <div style={{ margin: '1em auto', width: 200 }}>
                                {extending ? (
                                    <Spinner width={'40px'} height={'40px'} />
                                ) : (
                                    hasNextCursor && (
                                        <Button type='button' onClick={() => this.extendList()}>
                                            show more
                                        </Button>
                                    )
                                )}
                            </div>
                        </BurgerTable>
                    )}
                </Wrapper>
            </Container>
        );
    }
}

export default App;
