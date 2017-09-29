const router = require('express').Router();
const places = require('../controllers/places');
const stories = require('../controllers/stories');
const users = require('../controllers/users');

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

router.route('/users')
  .get(users.show);

module.exports = router;
