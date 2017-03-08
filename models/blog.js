const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

//find out if user owns the comment or not, and will return boolean.  ie if their users are the same.
commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const blogSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  image: { type: String },
  description: { type: String, maxlength: 500, required: true },
  tag: {type: String, required: true},
  stars: { type: Number },
//i expect what we store here is an object id and also in the user collection already (so a user model as well)
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
}, {
  timestamps: true
});

blogSchema.virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdilondonbucket/${this.image}`;
  });

module.exports = mongoose.model('Blog', blogSchema);
