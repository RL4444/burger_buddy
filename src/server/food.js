const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let secrets;

// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'development') secrets = require('../../secrets.json');
else secrets = process.env;

// secrets = require('../../secrets.json');

const ZOMATO_KEY = secrets.ZOMATO_API_KEY;

module.exports = {
    getAllCuisines: async (cityId) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            throw Error(err);
        }
    },
    getBurgerPlaces: async (latitude, longitude, entityId, radius, sortBy, direction, start) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/search?start=${start}&lat=${latitude}&lon=${longitude}&cuisines=168&sort=${sortBy}&order=${direction}&${radius}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            throw Error(err);
        }
    },
    getRestaurant: async (id) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            throw Error(err);
        }
    },
};
