const User = require('../models/user');

function userShow(req, res){
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
}

module.exports = {
  show: userShow
};
