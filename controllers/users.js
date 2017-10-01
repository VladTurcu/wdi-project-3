const User = require('../models/user');

function userShow(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

module.exports = {
  show: userShow
};
