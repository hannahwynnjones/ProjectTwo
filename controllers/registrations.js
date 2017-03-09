const User = require('../models/user');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.key; //if multer did its job and re.file, then image is here we will store it.  key is always the file name.  so we are storing the file in amazon, and then storing the file name in our database.  file then stored in bucket and then amazon sends back the key (file name) and file size etc.  we save the user data in our datebase inc file name of image.  we then re-direct client to profile page after everything has been uploaded.

  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.redirect('/register');
      }
      next();
    });
}


function showRoute(req, res) {
  return res.render('registrations/show'); ///not sure why this isnt '/'
}

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  show: showRoute,
  create: createRoute,
  delete: deleteRoute
};
