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

function placesCreate(req, res) {
  Place
    .create(req.body)
    .then(place => res.status(201).json(place))
    .catch(err => res.json(err));
}

function placesUpdate(req, res) {
  Place
    .findById(req.params.id)
    .exec()
    .then(place => {
      Object.assign(place, req.body);
      return place.save();
    })
    .then(place => res.json(place))
    .catch(err => console.log(err));
}

module.exports = {
  index: placesIndex,
  show: placesShow,
  create: placesCreate,
  update: placesUpdate
};
