const Place = require('../models/place');

function placesIndex(req, res) {
  Place
    .find()
    .exec()
    .then(places => res.json(places))
    .catch(err => res.json(err));
}

module.exports = {
  index: placesIndex
};
