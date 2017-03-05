function indexRoute(req, res) {
  res.render('statics/index');
}

function aboutRoute(req, res) {
  res.render('statics/about');
}

function contactRoute(req, res) {
  res.render('statics/contact');
}

module.exports = {
  index: indexRoute,
  about: aboutRoute,
  contact: contactRoute
};
