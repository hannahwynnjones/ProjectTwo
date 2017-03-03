

const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  if(env === 'production') delete err.stack; // remove stack trace in production

  res.status(err.status);
  res.locals.err = err;

  // return
  res.render(`statics/${err.status}`);
  next(err);
}

//this means that when an error comes up such as 500, it displays the reason on the page.  res.locals is anything we want to send into any views.

module.exports = errorHandler;

//a model is a thing we use to connect to db, a module is anything that we export or require from the bottom of a file.
