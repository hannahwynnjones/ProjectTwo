const User = require('../models/user');
const Blog = require('../models/blog');

//-------index shows every user --

function usersIndex(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

//--------------------show individual users---------------

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      Blog
        .find({createdBy: user.id})
        .exec()
        .then((blogs) => {
          res.render('users/show', { user, blogs });
        });
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
