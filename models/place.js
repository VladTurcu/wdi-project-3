const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true },
  rating: { type: Number },
  country: { type: String },
  flag: { type: String }
});

module.exports = mongoose.model('Place', placeSchema);
