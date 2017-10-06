const mongoose = require('mongoose');
const s3 = require('../lib/s3');

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

//Image uploading virtuals
placeSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

placeSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

placeSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

placeSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('Place', placeSchema);
