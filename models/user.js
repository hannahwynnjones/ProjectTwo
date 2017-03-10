const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');


const userSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  image: { type: String },
  password: { type: String },
  githubId: { type: Number },
  images: { type: String },
  facebookId: { type: String }
  // ppImage: { type: String }
});

// userSchema
//   .virtual('ppImage')
//   .get(function getppImage(){
//     if(!this.filename) return `https://i.ytimg.com/vi/0FEYvKxCnYw/maxresdefault.jpg`;
//     return `https://s3-eu-west-1.amazonaws.com/wdilondonbucket/${this.filename}`;
//   });

userSchema.virtual('imageSRC')
  .get(function getProfileImageSRC(){
    if(!this.image) return `https://i.ytimg.com/vi/0FEYvKxCnYw/maxresdefault.jpg`;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdilondonbucket/${this.image}`;
  });

userSchema
.virtual('imageSRC')
.get(function getImageSRC() {
  if(!this.image) return `https://i.ytimg.com/vi/0FEYvKxCnYw/maxresdefault.jpg`; //replace null with something that openes if image doesn't load
  return `http://s3-eu-west-1.amazonaws.com/wdilondonbucket/${this.image}`;
});


userSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image}, next);
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//lifecycle hook - mongoose middleware.  this checkpassword function will be run before mongoose tries to validate.  pre - means you want to start this before the specified function.
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

//we make passwordConfirmation virtual as we dont want to store it in the database but we still want to acess it.  we can get hold of it from the req body and do something with it.  we cna then check it later.

//check if the password has been modified first.  8 rounds of salting, then bcrypt will hash the salt and the password together.  if next was inside, then we'd only call next when password is not changed.

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

//now we check whether the hashed passwords match.  'methods' is createing an instance method on our user.

//class and instance:  Class has a capital letter and is like the blueprint and in order to use it, we use the 'new' in front of it eg 'new Array()' whcih would give us an empty array - it has all the information required to make the actual array.  the thing that th eclass crates is called the 'instance'  eg new Cat creates a cat.  class is very generic, instance is very unique.  an 'instance method' eg forEach.(cat) .

//methods then get added to this class everytime its called:

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

//telling you where to store the users in the User database and also appl the userSchemaa
module.exports = mongoose.model('User', userSchema);
