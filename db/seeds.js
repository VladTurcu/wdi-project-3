const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Place = require('../models/place');
const Story = require('../models/story');
const User = require('../models/user');

mongoose.connect(dbURI, { useMongoClient: true });

Place.collection.drop();
Story.collection.drop();
User.collection.drop();

const userData = [{
  username: 'Vlad',
  email: 'vlad@turcu.me',
  password: '1234567890abcd',
  passwordConfirmation: '1234567890abcd',
  countries: ['Greece'],
  image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAASSAAAAJDg1ZjlhYTIzLTQ4MmUtNDE1Yi05MWIzLTk2ZGZkYjFjODI0Mg.jpg',
  coverPicture: 'http://www.matthewwilliams-ellis.com/wp-content/uploads/2016/10/Romania-Transylvania-Travel-and-Landscape-Photography-Workshop-Holiday-Summer-2018-_011.jpg'
}, {
  username: 'Josh',
  email: 'josh@ga.co',
  password: 'memory',
  passwordConfirmation: 'memory',
  countries: [],
  image: 'https://cdn.modernfarmer.com/wp-content/uploads/2013/09/saanen.jpg',
  coverPicture: 'http://zyzixun.net/data/out/182/4443089-view-wallpapers.jpg'
}];

User
  .create(userData)
  .then(users => {
    console.log(`${users.length} users created!`);
    const placeData = [{
      name: 'Two Brothers Bar',
      address: 'Dekigala, Thira 847 00, Greece',
      lat: 36.4179796,
      lng: 25.4298208,
      description: 'Great cocktails, great shots, crazy atmosphere.. fire!',
      category: 'Nightlife',
      createdBy: users[0],
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/08/a2/c3/48/2-brothers-bar-santorini.jpg',
      rating: 4.5
    }, {
      name: 'Yosemite National Park',
      address: 'California, USA',
      lat: 37.8651011,
      lng: -119.5383294,
      description: 'This is a family mountain.',
      category: 'Nature',
      createdBy: users[1],
      image: 'https://www.nationalparks.org/sites/default/files/styles/wide_1x/public/shutterstock_142351951.jpg',
      rating: 4.7
    }, {
      name: 'Gunung Ijen',
      address: 'Java, Indonesia',
      lat: -8.0588232,
      lng: 114.2352035,
      description: 'Volcano bro',
      category: 'Nature',
      createdBy: users[1],
      image: 'https://images.unsplash.com/photo-1500100711100-fa7d55b8f658',
      rating: 4.7
    }, {
      name: 'Burano',
      address: 'Venice, Italy',
      lat: 45.4853441,
      lng: 12.4128859,
      description: 'Small island town',
      category: 'Culture',
      createdBy: users[1],
      image: 'https://images.unsplash.com/photo-1502727051360-3656ce291c5b',
      rating: 4
    }];
    return Place
      .create(placeData)
      .then(places => {
        console.log(`${places.length} places created!`);
        const storyData =[{
          name: 'Roadtrip',
          text: 'And we drove, and we drove and we drove.  And we saw a big rock, and we went to Yosemite.',
          createdBy: users[0],
          image: 'https://images.unsplash.com/photo-1476067897447-d0c5df27b5df',
          places: [places[1], places[0]]
        }, {
          name: 'The Empire Strikes Back',
          text: 'Luke visits Dagobah for cultural learnings from a wise guru.',
          createdBy: users[1],
          image: 'https://images.unsplash.com/uploads/14123277159177add8d0b/24a675f2',
          places: [
            places[1]
          ]
        }];
        return Story
          .create(storyData)
          .then(stories => console.log(`${stories.length} stories created!`));
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
