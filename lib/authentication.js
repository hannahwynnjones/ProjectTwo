const User = require('../models/user');

function authentication(req, res, next) {
  //check to see if user is logged in
  //if not, exit this piece of middleware.
  if(!req.session.isAuthenticated) return next();
//find the user based on the id in the session
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
//if the user cannot be found, logout user.
        return req.session.regenerate(() => {
          req.flash('alert', 'You must be logged in');
          return res.redirect('/login');

//could use   return req.session.regenerate(() => res.unathorised());  instead
        });
      }
//set the user id back on the session
      req.session.userId = user.id;

//(store the user directly on the resonse object as well)

//set the whole user object to the requestobject
//so we can use the users details in our controlelers/.
      req.user = user;


//set the whole user object to es.locals so we can set it in views
      res.locals.user = user;
// set an isAuthenticated boolean so we can show and hide buttons and links.
      res.locals.isAuthenticated = true;

//ok, we're done, move on to the next miece of middleware.
      next();
    })

    .catch(next); //handle errors with our global error catcher.
}

module.exports = authentication;

//regenerate will clear out the session cookie, basically loggin us out
