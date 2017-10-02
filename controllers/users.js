const User = require('../models/user');

function userIndex(req, res, next){
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}
function userShow(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  show: userShow,
  index: userIndex
};
