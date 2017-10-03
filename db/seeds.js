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

const lorem1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sapien vel nunc mattis imperdiet sed et lacus. Sed id luctus risus. Ut consequat lorem cursus malesuada pharetra. Quisque sed nibh turpis. Ut feugiat magna nibh, ut dignissim ex dictum venenatis. Duis turpis velit, eleifend a lorem sollicitudin, luctus vulputate leo. Curabitur facilisis nec nisi eu sollicitudin. Curabitur ligula purus, viverra at metus eget, auctor sollicitudin nisl. Etiam mattis dolor eu nisi lacinia, eu interdum lacus elementum. Praesent vitae augue at eros viverra malesuada ut vitae metus. Aliquam erat volutpat. Praesent quis erat urna. Mauris vestibulum nec tortor ac laoreet. Morbi lacinia metus eu ullamcorper faucibus.';

const lorem2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue efficitur erat, ut sollicitudin neque. Nullam sit amet ex sit amet nunc commodo rutrum. Suspendisse auctor ac lacus eu ullamcorper. In velit quam, euismod non quam et, condimentum ornare ex. Donec interdum et libero nec eleifend. Nunc maximus est at turpis bibendum pellentesque. Vivamus semper, elit eu vehicula congue, augue tortor consequat nisl, quis accumsan mi metus eget arcu. Suspendisse egestas porta ante, nec cursus nisi tincidunt sed. Sed id condimentum ipsum, ac consectetur lacus. Vivamus ut dolor elit. Nunc tempor interdum lobortis. Curabitur in volutpat tellus. Suspendisse potenti. Morbi rhoncus ligula a pellentesque pretium. Duis a lorem eget libero interdum suscipit vitae nec velit. Vestibulum non odio eget sem aliquam sodales ut imperdiet mi. Etiam justo eros, semper eget diam at, gravida auctor ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non erat egestas tortor convallis vehicula accumsan non sem. Donec vel accumsan neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis suscipit sit amet metus vitae commodo. Proin porta maximus ex ac maximus. Mauris porttitor accumsan ante, ut dictum tortor feugiat tristique. Vestibulum auctor tellus at ipsum dignissim, at facilisis augue eleifend. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam consequat, neque sit amet dignissim interdum, orci magna condimentum tellus, varius commodo magna libero eu orci. Praesent vitae ultricies lacus, ut tincidunt tortor. Ut a pharetra est, sed tempus turpis. Vivamus vehicula interdum ex. Praesent facilisis faucibus justo pulvinar porta. Phasellus diam nulla, lacinia sed nunc non, laoreet porttitor tortor. Cras dictum, lacus vel lobortis commodo, ante ipsum ultrices lorem, ut rutrum est eros id lacus. Proin ultrices ligula lacus, sit amet laoreet nisl elementum vel. Proin dictum nisl a purus blandit, volutpat porta tellus varius. Aliquam congue, ex id vulputate porttitor, est lectus placerat libero, in vestibulum nisl augue vitae elit. Curabitur vel purus ac urna auctor cursus vel eget quam. Aenean vitae odio quis nibh varius pellentesque. Vivamus odio mauris, luctus eget odio sed, aliquet molestie nisi.';

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
      description: lorem1,
      category: 'Nightlife',
      createdBy: users[0],
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/08/a2/c3/48/2-brothers-bar-santorini.jpg',
      rating: 4.5,
      country: 'GR',
      flag: 'https://restcountries.eu/data/grc.svg'
    }, {
      name: 'Yosemite National Park',
      address: 'California, USA',
      lat: 37.8651011,
      lng: -119.5383294,
      description: lorem1,
      category: 'Nature',
      createdBy: users[1],
      image: 'https://www.nationalparks.org/sites/default/files/styles/wide_1x/public/shutterstock_142351951.jpg',
      rating: 4.7,
      country: 'US',
      flag: 'https://restcountries.eu/data/usa.svg'
    }, {
      name: 'Gunung Ijen',
      address: 'Java, Indonesia',
      lat: -8.0588232,
      lng: 114.2352035,
      description: lorem1,
      category: 'Nature',
      createdBy: users[1],
      image: 'https://images.unsplash.com/photo-1500100711100-fa7d55b8f658',
      rating: 4.7,
      country: 'ID',
      flag: 'https://restcountries.eu/data/idn.svg'
    }, {
      name: 'Burano',
      address: 'Venice, Italy',
      lat: 45.4853441,
      lng: 12.4128859,
      description: lorem1,
      category: 'Culture',
      createdBy: users[1],
      image: 'https://images.unsplash.com/photo-1502727051360-3656ce291c5b',
      rating: 4,
      country: 'IT',
      flag: 'https://restcountries.eu/data/ita.svg'
    }, {
      name: 'He\'s not here',
      address: '112 1/2 W Franklin St, Chapel Hill',
      lat: 35.9131668,
      lng: -79.0588483,
      description: lorem1,
      category: 'Nightlife',
      createdBy: users[1],
      image: 'https://s3-media3.fl.yelpcdn.com/bphoto/Jm3o6XSMHofpnXHOXdCF6g/o.jpg',
      rating: 4,
      country: 'US',
      flag: 'https://restcountries.eu/data/usa.svg'
    }, {
      name: 'World Diving',
      address: 'Jungutbatu, Lembongan, Indonesia',
      lat: -8.673104,
      lng: 115.4450953,
      description: lorem1,
      category: 'Sport',
      createdBy: users[1],
      image: 'http://www.world-diving.com/wp-content/uploads/2016/04/Mola-and-sarah-by-Patrick-Compau-750x530.jpg',
      rating: 4,
      country: 'ID',
      flag: 'https://restcountries.eu/data/idn.svg'
    }, {
      name: 'The Gabbatoire',
      address: 'Vulture St, Woolloongabba, Brisbane',
      lat: -27.4928212,
      lng: 153.028849,
      description: lorem1,
      category: 'Sport',
      createdBy: users[1],
      image: 'https://pbs.twimg.com/media/C5w72ABUoAA4eWs.jpg',
      rating: 4,
      country: 'AU',
      flag: 'https://restcountries.eu/data/aus.svg'
    }, {
      name: 'Spring Break Panama City',
      address: 'Panama City Beach, Florida',
      lat: 30.2090581,
      lng: -85.8691692,
      description: lorem1,
      category: 'Nightlife',
      createdBy: users[1],
      image: 'http://fistintheair.com/wp-content/uploads/2014/12/10838167_10152684458742739_7722169803888148967_o1-590x393.jpg',
      rating: 4,
      country: 'US',
      flag: 'https://restcountries.eu/data/usa.svg'
    }, {
      name: 'Church of Saint Sava',
      address: 'Belgrade, Serbia',
      lat: 44.7980656,
      lng: 20.4669297,
      description: lorem1,
      category: 'Culture',
      createdBy: users[1],
      image: 'http://www.serbia.com/wp-content/uploads/2016/04/srbija-danas-com-naslovna-1.jpg',
      rating: 4,
      country: 'RS',
      flag: 'https://restcountries.eu/data/srb.svg'
    }, {
      name: 'Plitvička Jezera',
      address: 'Croatia',
      lat: 44.8798398,
      lng: 15.60908,
      description: lorem1,
      category: 'Nature',
      createdBy: users[1],
      image: 'http://www.president-zagreb.com/mobile/wp-content/uploads/2016/01/plitvice2.jpg',
      rating: 4,
      country: 'HR',
      flag: 'https://restcountries.eu/data/hrv.svg'
    }, {
      name: 'Valetta Grand Harbour',
      address: 'Valetta, Malta',
      lat: 35.8919851,
      lng: 14.5104769,
      description: lorem1,
      category: 'Culture',
      createdBy: users[1],
      image: 'http://josephbraude.com/wp-content/uploads/2016/10/malta-country.jpg',
      rating: 4,
      country: 'MT',
      flag: 'https://restcountries.eu/data/mlt.svg'
    }, {
      name: 'White Temple',
      address: 'Chiang Rai, Thailand',
      lat: 19.8242725,
      lng: 99.7609673,
      description: lorem1,
      category: 'Culture',
      createdBy: users[1],
      image: 'https://static.boredpanda.com/blog/wp-content/uploads/2014/09/white-temple-wat-rong-khun-buddhist-thailand-architecture-fb.jpg',
      rating: 4,
      country: 'TH',
      flag: 'https://restcountries.eu/data/tha.svg'
    }, {
      name: 'Robben Island',
      address: 'Cape Town, Western Cape, South Africa',
      lat: -33.8130699,
      lng: 18.3481257,
      description: lorem1,
      category: 'Culture',
      createdBy: users[1],
      image: 'http://capechameleon.co.za/wp-content/uploads/2016/05/Robben-island-3.jpg',
      rating: 4,
      country: 'ZA',
      flag: 'https://restcountries.eu/data/zaf.svg'
    }, {
      name: 'Daintree Rainforest',
      address: 'Cape Tribulation, QLD, Australia',
      lat: -16.1481305,
      lng: 145.4145973,
      description: lorem1,
      category: 'Nature',
      createdBy: users[1],
      image: 'https://i.pinimg.com/736x/04/60/a7/0460a7da4b01d6502e49aeb33bbced73--flightless-bird-queensland-australia.jpg',
      rating: 4,
      country: 'AU',
      flag: 'https://restcountries.eu/data/aus.svg'
    }, {
      name: 'Naked for Satan',
      address: '285 Brunswick St, Fitzroy, Melbourne',
      lat: -37.798765,
      lng: 144.9760093,
      description: lorem1,
      category: 'Nightlife',
      createdBy: users[1],
      image: 'http://cd.visitmelbourne.com/-/media/images/melbourne/food-and-wine/bars/k-n/naked-for-satin_mel_r_1425591_1600x900.jpg?ts=20150924351153&w=1200',
      rating: 4,
      country: 'AU',
      flag: 'https://restcountries.eu/data/aus.svg'
    }];
    return Place
      .create(placeData)
      .then(places => {
        console.log(`${places.length} places created!`);
        const storyData =[{
          name: 'Roadtrip',
          text: lorem2,
          createdBy: users[0],
          image: 'https://images.unsplash.com/photo-1476067897447-d0c5df27b5df',
          places: [places[1], places[4], places[7]],
          route: [
            {lat: places[1].lat, lng: places[1].lng},
            {lat: places[4].lat, lng: places[4].lng},
            {lat: places[7].lat, lng: places[7].lng}
          ]
        }, {
          name: 'The Empire Strikes Back',
          text: lorem2,
          createdBy: users[1],
          image: 'https://images.unsplash.com/uploads/14123277159177add8d0b/24a675f2',
          places: [
            places[3], places[8], places[9]
          ],
          route: [
            {lat: places[3].lat, lng: places[3].lng},
            {lat: places[8].lat, lng: places[8].lng},
            {lat: places[9].lat, lng: places[9].lng}
          ]
        }, {
          name: 'Lost in USA',
          text: lorem2,
          createdBy: users[1],
          image: 'https://www.cartalk.com/sites/default/files/blogs/Picture%20Panthers%20012016_html_4c235dcc.jpg',
          places: [
            places[1], places[4]
          ],
          route: [

          ]
        }, {
          name: 'Bill and Ted\'s Bogus Adventure',
          text: lorem2,
          createdBy: users[0],
          image: 'http://storage0.dms.mpinteractiv.ro/media/401/321/5386/10792743/1/erik-cover.jpg',
          places: [
            places[2], places[5]
          ],
          route: [
            {lat: places[2].lat, lng: places[2].lng},
            {lat: places[5].lat, lng: places[5].lng},
          ]
        }, {
          name: 'Rocky Rapids',
          text: lorem2,
          createdBy: users[1],
          image: 'http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/51/v6/p051v6vn.jpg',
          places: [
            places[7]
          ],
          route: [
            {lat: -33.9239941, lng: 18.4998116},
            {lat: -25.7582737, lng: 28.0578642},
            {lat: -17.9316393, lng: 25.8092289},
            {lat: -6.7692302, lng: 39.1142033},
          ]
        }, {
          name: 'Storytime',
          text: lorem2,
          createdBy: users[1],
          image: 'http://rome.mrdonn.org/romanmasks.jpg',
          places: [
            places[6], places[14], places[13]
          ],
          route: [
            {lat: places[14].lat, lng: places[14].lng},
            {lat: places[6].lat, lng: places[6].lng},
            {lat: places[13].lat, lng: places[13].lng}
          ]
        }];
        return Story
          .create(storyData)
          .then(stories => console.log(`${stories.length} stories created!`));
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
