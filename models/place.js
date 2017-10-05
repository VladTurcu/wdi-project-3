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
},{
  timestamps: true
});


placeSchema
  .virtual('stories', { //posts is the name of the virtual
    ref: 'Story',  //Post is the name of the model
    localField: '_id', // use the _id field from this schema
    foreignField: 'stories'//to match up with the createdBy field in the Story schema
  });
module.exports = mongoose.model('Place', placeSchema);
