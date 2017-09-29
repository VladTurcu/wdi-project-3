const router = require('express').Router();
const places = require('../controllers/places');

router.route('/places')
  .get(places.index);

module.exports = router;
