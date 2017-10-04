const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  countries: [{ type: String }],
  image: { type: String},
  coverPicture: { type: String }
});


userSchema
  .virtual('stories', { //posts is the name of the virtual
    ref: 'Story',  //Post is the name of the model
    localField: '_id', // use the _id field from this schema
    foreignField: 'createdBy'//to match up with the createdBy field in the Story schema
  });

userSchema
  .virtual('places', { //posts is the name of the virtual
    ref: 'Place',  //Post is the name of the model
    localField: '_id', // use the _id field from this schema
    foreignField: 'createdBy'//to match up with the createdBy field in the Place schema
  });


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

//Image uploading virtuals
userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

userSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('User', userSchema);
