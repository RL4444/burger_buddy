const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// const secrets = require('../../secrets.json');
let secrets;

// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'development') secrets = require('../../secrets.json');
else secrets = process.env;

// secrets = require('../../secrets.json');

const ZOMATO_KEY = secrets.ZOMATO_API_KEY;
const GEO_KEY = secrets.GEO_API_KEY;

module.exports = {
    // eslint-disable-next-line consistent-return
    get: async ({ latitude, longitude }) => {
        try {
            const ZomatoURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };

            const zomatoRes = await fetch(ZomatoURL, options);
            const data = await zomatoRes.json();
            // TODO: make a better way of checking for invalid co-ords
            if (data.status) return { locationNotAvailable: true };
            return data;
        } catch (err) {
            console.error(err);
            throw Error(err);
        }
    },
    search: async (searchTerm) => {
        try {
            const url = `https://developers.zomato.com/api/v2.1/cities?q=${searchTerm}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };
            const res = await fetch(url, options);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            throw Error(err);
        }
    },
    getCityInfoByCoordinates: async (searchTerm) => {
        try {
            const url = `http://api.positionstack.com/v1/forward?access_key=${GEO_KEY}&query=${searchTerm}`;
            const res = await fetch(url);
            const { data: locationData } = await res.json();
            const location = locationData[0];
            const { latitude, longitude } = location;
            const ZomatoURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`;
            const options = { headers: { 'user-key': ZOMATO_KEY, 'Content-Type': 'application/json' } };

            const zomatoRes = await fetch(ZomatoURL, options);
            const data = await zomatoRes.json();

            if (data.status) return { locationNotAvailable: true };
            return data;
        } catch (err) {
            console.error(err);
            throw Error(err);
        }
    },
};
