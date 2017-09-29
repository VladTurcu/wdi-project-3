const router = require('express').Router();
const places = require('../controllers/places');

router.route('/places')
  .get(places.index)
  .post(places.create);

router.route('/places/:id')
  .get(places.show)
  .put(places.update)
  .delete(places.delete);

module.exports = router;
