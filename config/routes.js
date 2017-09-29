const router = require('express').Router();
const places = require('../controllers/places');

router.route('/places')
  .get(places.index);

router.route('/places/:id')
  .get(places.show);

module.exports = router;
