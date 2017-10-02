const User = require('../models/user');

function userIndex(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => res.json(user))
    .catch(next);
}

function userShow(req, res, next){
  User
    .findById(req.params.id)
    .populate('stories')
    .exec()
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  show: userShow,
  index: userIndex
};
