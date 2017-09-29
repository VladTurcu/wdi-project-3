const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  countries: [{ type: String }],
  image: { type: String, required: true },
  coverPicture: { type: String }
});


module.exports = mongoose.model('User', userSchema);
