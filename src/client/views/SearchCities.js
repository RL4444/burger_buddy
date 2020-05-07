import React, { Component, useCallback, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

import Spinner from '../components/Spinner';

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    position: relative;
    max-width: 400px;
    padding-top: 20px;
`;

const SearchBarContainer = styled.div`
    margin-top: 30px;
    background: white;
    border-radius: 4px;
    height: 24px;
    padding: 4px;
    display: flex;
    align-items: center;
`;
const Input = styled.input`
    border: none;
    height: 100%;
    margin-left: 20px;
    width: calc(100% - 40px);
    font-size: 14px;
    &:focus {
        outline: none;
        border: none;
    }
`;

const SearchResultsContainer = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    max-height: 250px;
    overflow-y: scroll;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const RowContainter = styled.div`
    background: ${(p) => p.theme.colors.powderWhite};
    display: flex;
    padding: 12px 20px;
    box-sizing: border-box;
    align-items: center;
    &:hover {
        background: #e1ae79;
        cursor: pointer;
    }
`;

const CountryFlagWrapper = styled.div`
    width: 40px;
    margin-left: auto;
`;

const Flag = styled.img`
    width: 25px;
`;
const CityName = styled.div`
    margin-right: 4px;
    font-family: ${(p) => p.theme.fonts.main};
    font-size: 14px;
    font-weight: 500;
    width: 100px;
`;
const CountryName = styled.div`
    margin-right: 8px;
    text-align: right;
    margin-left: auto;
    font-family: ${(p) => p.theme.fonts.main};
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
`;

const Text = styled.p`
    color: white;
    line-height: 20px;
    text-align: center;
`;

const ResultRow = ({ city, setLocation, clearSearch }) => (
    <RowContainter
        onClick={() => {
            setLocation(city);
            clearSearch();
        }}
    >
        <CityName>{city.name}</CityName>
        <CountryName>{city.country_name}</CountryName>
        <CountryFlagWrapper>
            <Flag src={city.country_flag_url} alt={city.country_name} />
        </CountryFlagWrapper>
    </RowContainter>
);

// TODO: change this to a functional hooked comp
// https://stackoverflow.com/questions/41210867/react-native-using-lodash-debounce

class SearchCities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            citySearchResults: [],
            requesting: false,
        };
    }
    searchCity = async (city) => {
        if (!city) return;
        try {
            const res = await fetch(`/api/searchCityByTerm/?searchTerm=${city}`);
            const { data } = await res.json();
            const { location_suggestions: citySearchResults } = data;
            this.setState({
                citySearchResults,
            });
            console.log('data in front ', data);
            console.log('citySearchResults in front ', citySearchResults);
        } catch (err) {
            throw Error(err);
        } finally {
            this.setState({
                requesting: false,
            });
        }
    };

    handleSearch = (evt) => {
        this.setState({ search: evt.target.value, requesting: true }, this.debouncedSearch(evt.target.value));
    };

    debouncedSearch = debounce((query) => {
        this.searchCity(query);
    }, 1000);

    clearSearch = () => this.setState({ search: '' });

    render() {
        const { search, citySearchResults, requesting } = this.state;
        const { setLocation } = this.props;
        return (
            <Container>
                <Text>
                    We cannot find your current location. Please search for your current city here.
                    <br /> Unfortunately Some Cities are not included in Zomato's API.
                </Text>
                <SearchBarContainer>
                    <Input
                        placeholder='search cities'
                        onChange={(e) => {
                            this.handleSearch(e);
                        }}
                        value={search}
                    />
                    {requesting && search && <Spinner height={'20px'} width={'20px'} margin={0} fatness='2px' />}
                </SearchBarContainer>
                <SearchResultsContainer>
                    {citySearchResults.length > 0 &&
                        citySearchResults.map((city) => {
                            return (
                                <ResultRow
                                    clearSearch={this.clearSearch}
                                    setLocation={setLocation}
                                    key={city.id}
                                    city={city}
                                />
                            );
                        })}
                </SearchResultsContainer>
            </Container>
        );
    }
}

export default SearchCities;
