/* eslint-disable no-plusplus */
export const getDistanceFromLatitudeLongitude = (lat1, lon1, lat2, lon2, unit) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
        dist *= 1.609344;
    }
    if (unit === 'N') {
        dist *= 0.8684;
    }
    return dist;
};

export const replaceHTTPwithHTTPS = (src) => {
    console.log('src ', src);
    if (src.includes('https://')) return src;
    const fixedSrc = src.replace('http://', 'https://');
    console.log('fixed src ', fixedSrc);
    return fixedSrc;
};

export const convertCurrencyToPricing = (priceRange, currency) => {
    let strToReturn = '';
    for (let i = 0; i < priceRange; i++) {
        strToReturn += currency;
    }
    return strToReturn;
};
