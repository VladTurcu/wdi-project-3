const router = require('express').Router();
const places = require('../controllers/places');
const users = require('../controllers/users');

router.route('/places')
  .get(places.index);

router.route('/users')
  .get(users.show);

module.exports = router;
