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
  .get(stories.index);

router.route('/users')
  .get(users.show);

module.exports = router;
