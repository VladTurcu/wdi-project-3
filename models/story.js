const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String, required: true},
  places: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }],
  route: []
},{
  timestamps: true
});


//Image uploading virtuals
storySchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

storySchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

storySchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

storySchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) s3.deleteObject({ Key: this.image }, next);
  next();
});


module.exports = mongoose.model('Story', storySchema);
