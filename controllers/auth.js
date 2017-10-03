const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function registration(req, res, next){
  if(req.file) req.body.image = req.file.filename;
  User
    .create(req.body)
    .then(() => res.json({message: 'Registration succesfull'}))
    .catch(next);
}


function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      return res.json({ token, message: 'Hi buddy' });
    })
    .catch(next);
}


module.exports = {
  register: registration,
  login: login
};
