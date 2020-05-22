const fetch = require('node-fetch');

const secrets = require('../../secrets.json');

const ZOMATO_KEY = process.env.ZOMATO_API_KEY || secrets.ZOMATO_API_KEY;
const GEO_KEY = process.env.GEO_API_KEY || secrets.GEO_API_KEY;

module.exports = {
    // eslint-disable-next-line consistent-return
    get: async () => {
        try {
            const URL = 'https://freegeoip.app/json/';
            const res = await fetch(URL);
            const geoData = await res.json();
            const { latitude, longitude } = geoData;
            // const latitude = 51.509865;
            // const longitude = -0.118092;

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
        console.log('looking for info by co-ordinated ', searchTerm);
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
