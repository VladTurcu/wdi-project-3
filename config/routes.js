const router = require('express').Router();
const places = require('../controllers/places');
const users = require('../controllers/users');
const auth = require('../controllers/auth');

router.route('/places')
  .get(places.index);

router.route('/users')
  .get(users.show);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

module.exports = router;
