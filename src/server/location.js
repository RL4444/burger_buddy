const fetch = require('node-fetch');

const secrets = require('../../secrets.json');

const ZomatoKey = secrets.ZOMATO_API_KEY;
const geoApiKey = secrets.GEO_API_KEY;

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
            const options = { headers: { 'user-key': ZomatoKey, 'Content-Type': 'application/json' } };

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
            const options = { headers: { 'user-key': ZomatoKey, 'Content-Type': 'application/json' } };
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
            const url = `http://api.positionstack.com/v1/forward?access_key=${geoApiKey}&query=${searchTerm}`;
            const res = await fetch(url);
            const { data: locationData } = await res.json();
            console.log(locationData);
            const location = locationData[0];
            const { latitude, longitude } = location;
            const ZomatoURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`;
            const options = { headers: { 'user-key': ZomatoKey, 'Content-Type': 'application/json' } };

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
