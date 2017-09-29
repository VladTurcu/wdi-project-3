const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  description: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  rating: { type: Number }
});

module.exports = mongoose.model('Place', placeSchema);
