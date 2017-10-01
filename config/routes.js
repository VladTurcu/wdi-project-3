const router = require('express').Router();
const places = require('../controllers/places');
const stories = require('../controllers/stories');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');

router.route('/places')
  .get(places.index)
  .post(places.create);

router.route('/places/:id')
  .get(places.show)
  .put(places.update)
  .delete(places.delete);

router.route('/stories')
  .get(stories.index)
  .post(stories.create);

router.route('/stories/:id')
  .get(stories.show)
  .put(stories.update)
  .delete(stories.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users/:id')
  .get(users.show);
router.all('/*', (req, res) => res.notFound());

module.exports = router;
