const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Place = require('../models/place');
const User = require('../models/user');

mongoose.connect(dbURI, { useMongoClient: true });

Place.collection.drop();
User.collection.drop();

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
}];

Place
  .create(placeData)
  .then(places => console.log(`${places.length} places created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());



const userdata = [{
  username: 'Vlad',
  email: 'vlad@turcu.me',
  password: '1234567890abcd',
  passwordConfirmation: '1234567890abcd',
  countries: ['Grece'],
  image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAASSAAAAJDg1ZjlhYTIzLTQ4MmUtNDE1Yi05MWIzLTk2ZGZkYjFjODI0Mg.jpg',
  coverPicture: 'http://www.matthewwilliams-ellis.com/wp-content/uploads/2016/10/Romania-Transylvania-Travel-and-Landscape-Photography-Workshop-Holiday-Summer-2018-_011.jpg'
}];
User
  .create(userdata)
  .then((users) => console.log(`${users.length} users created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
