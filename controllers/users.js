const User = require('../models/user');

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
      res.render('users/show', { user });
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
