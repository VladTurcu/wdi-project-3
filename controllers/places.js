const Place = require('../models/place');

function placesIndex(req, res) {
  Place
    .find()
    .exec()
    .then(places => res.json(places))
    .catch(err => res.json(err));
}

function placesShow(req, res) {
  Place
    .findById(req.params.id)
    .exec()
    .then(place => res.json(place))
    .catch(err => res.json(err));
}

module.exports = {
  index: placesIndex,
  show: placesShow
};
