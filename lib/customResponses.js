////error handler catchs the roor, inspects it and finds out what it is, puts 404/500 etc on it, if can't find it - will add a 500 message.  render an error page in static pages and brings up a html message.
function customResponses(req, res, next) {
  res.notFound = function notFound() {
    const err = new Error('Not Found');
    err.status = 404;

    throw err;
  };

  res.badRequest = function(url, errors) {
    req.flash('alert', errors);
    res.redirect(url);
  };

//you could add the badRequest into thecontrollers/users.js

  res.unauthorized = function(url='/login', message='You must be logged in') {
    req.flash('alert', message);
    res.redirect(url);
  };

  next();
}

module.exports = customResponses;
