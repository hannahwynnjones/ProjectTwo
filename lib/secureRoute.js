function secureRoute(req, res, next) {
  if(!req.session.isAuthenticated || !req.session.userId) {
    return req.session.regenerate(() => res.unauthorsized());


    // {
    //   req.flash('alert', 'You must be logged in');
    //   return res.redirect('/login');
    // });
  }

  next();
}

module.exports = secureRoute;


//