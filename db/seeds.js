const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Place = require('../models/place');

mongoose.connect(dbURI, { useMongoClient: true });

Place.collection.drop();

const placeData = [{
  name: 'Two Brothers Bar',
  address: 'Dekigala, Thira 847 00, Greece',
  lat: 36.4179796,
  lng: 25.4298208,
  description: 'Great cocktails, great shots, crazy atmosphere.. fire!',
  category: 'Nightlife',
  user: 'Vlad',
  image: 'https://media-cdn.tripadvisor.com/media/photo-s/08/a2/c3/48/2-brothers-bar-santorini.jpg',
  rating: 4.5
}, {
  name: 'Yosemite National Park',
  address: 'California, USA',
  lat: 37.8651011,
  lng: -119.5383294,
  description: 'This is a family mountain.',
  category: 'Nature',
  user: 'Josh',
  image: 'https://www.nationalparks.org/sites/default/files/styles/wide_1x/public/shutterstock_142351951.jpg',
  rating: 4.7
}];

Place
  .create(placeData)
  .then(places => console.log(`${places.length} places created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
