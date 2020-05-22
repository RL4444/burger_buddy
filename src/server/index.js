/* eslint-disable object-curly-newline */
const express = require('express');
const path = require('path');
const location = require('./location.js');
const food = require('./food.js');

const app = express();

app.use(express.static('dist'));

app.get('/api/getLocation/', async (req, res) => {
    const { latitude, longitude } = req.query;
    const data = await location.get({ latitude, longitude });
    if (data.locationNotAvailable) {
        res.send({ locationNotAvailable: true, loading: false });
        return;
    }
    data.loading = false;
    res.send({ data });
});

app.get('/api/getRestaurants', async (req, res) => {
    const data = await location.get();
    res.send({ rests: 'rests', data });
});

app.get('/api/getCuisines', async (req, res) => {
    const { cityId } = req.query;
    const data = await food.getAllCuisines(cityId);
    res.send({ data });
});

app.get('/api/searchCityByTerm', async (req, res) => {
    const { searchTerm } = req.query;
    const data = await location.search(searchTerm);
    res.send({ data });
});
app.get('/api/getCityByTerm', async (req, res) => {
    const { searchTerm } = req.query;
    const data = await location.getCityInfoByCoordinates(searchTerm);
    res.send({ data });
});

app.get('/api/getBurgerJoints', async (req, res) => {
    const {
        latitude,
        longitude,
        entityId,
        radius = 5000,
        sortBy = 'rating',
        direction = 'descending',
        start = 0,
    } = req.query;
    const data = await food.getBurgerPlaces(latitude, longitude, entityId, radius, sortBy, direction, start);
    // remove private api key from payload
    data.restaurants.forEach((r) => {
        delete r.restaurant.apikey;
    });
    res.send({ data });
});

app.get('/api/getRestaurantData', async (req, res) => {
    const { id } = req.query;
    const data = await food.getRestaurant(id);
    // remove private api key from payload
    delete data.apikey;
    res.send({ data });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
