const User = require('../models/user');

function userShow(req, res, next){
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

module.exports = {
  show: userShow
};
