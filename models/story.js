const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: String },
  image: { type: String, required: true },
  places: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('Story', storySchema);
