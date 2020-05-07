const fetch = require('node-fetch');

const secrets = require('../../secrets.json');

const ZomatoKey = secrets.ZOMATO_API_KEY;

module.exports = {
    getAllCuisines: async (cityId) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`;
            const options = { headers: { 'user-key': ZomatoKey, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            throw Error(err);
        }
    },
    getBurgerPlaces: async (latitude, longitude, entityId, radius, sortBy, direction) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&cuisines=168&sort=${sortBy}&order=${direction}&${radius}`;
            const options = { headers: { 'user-key': ZomatoKey, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            throw Error(err);
        }
    },
};
