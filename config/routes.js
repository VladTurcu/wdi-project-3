const router = require('express').Router();
const places = require('../controllers/places');
const stories = require('../controllers/stories');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');

router.route('/places')
  .get(places.index)
  .post(secureRoute, imageUpload, places.create);

router.route('/places/:id')
  .get(places.show)
  .put(secureRoute, imageUpload, places.update)
  .delete(places.delete);

router.route('/stories')
  .get(stories.index)
  .post(secureRoute, imageUpload, stories.create);

router.route('/stories/:id')
  .get(stories.show)
  .put(secureRoute, imageUpload, stories.update)
  .delete(stories.delete);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users/:id')
  .get(users.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
