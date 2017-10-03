const User = require('../models/user');

function userShow(req, res, next){
  User
    .findById(req.params.id)
    .populate('stories places')
    .exec()
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  show: userShow
};
