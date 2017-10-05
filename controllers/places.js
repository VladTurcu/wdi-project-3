const Place = require('../models/place');

function placesIndex(req, res, next) {
  Place
    .find()
    .populate('createdBy')
    .exec()
    .then(places => res.json(places))
    .catch(next);
}

function placesShow(req, res, next) {
  Place
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(place => {
      if(!place) res.notFound();
      res.json(place);
    })
    .catch(next);
}

function placesCreate(req, res, next) {
  req.body.createdBy = req.currentUser;
  Place
    .create(req.body)
    .then(place => res.status(201).json(place))
    .catch(next);
}

function placesUpdate(req, res, next) {
  Place
    .findById(req.params.id)
    .exec()
    .then(place => {
      if(!place) res.notFound();
      Object.assign(place, req.body);
      return place.save();
    })
    .then(place => res.json(place))
    .catch(next);
}

function placesDelete(req, res, next) {
  Place
    .findById(req.params.id)
    .exec()
    .then(place => {
      if(!place) res.notFound();
      return place.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: placesIndex,
  show: placesShow,
  create: placesCreate,
  update: placesUpdate,
  delete: placesDelete
};
