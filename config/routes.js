const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const oauth = require('../controllers/oauth');
const blogsController = require('../controllers/blogs');
const secureRoute = require('../lib/secureRoute');
// const upload = require('../lib/upload');
const statics = require('../controllers/statics');
const usersController = require('../controllers/users');
const recipies = require('../controllers/recipies');

//-------------------STATICS: HOME, CONTACT, ABOUT--------------

router.route('/')
  .get(statics.index);

router.route('/contact')
  .get(statics.contact);

router.route('/about')
  .get(statics.about);

//----------SEE ALL BLOGS---------------

router.route('/blogs')
  .get(blogsController.index)
  .post(secureRoute, blogsController.create);

//-------------NEW BLOG----------

router.route('/blogs/new')
  .get(secureRoute, blogsController.new);

//--------SHOW/EDIT/DELETE BLOG--------------

router.route('/blogs/:id')
  .get(blogsController.show)
  .get(recipies.getRecipies)
  .put(secureRoute, blogsController.update)
  .delete(secureRoute, blogsController.delete);

router.route('/blogs/:id/edit')
  .get(secureRoute, blogsController.edit);

//---------------SHOW/DELETE/EDIT COMMENTS----------------------------

router.route('/blogs/:id/comments')
  .post(secureRoute, blogsController.createComment);

router.route('/blogs/:id/comments/:commentId')
  .delete(secureRoute, blogsController.deleteComment);

router.route('/blogs/:id/editComments')
  .post(secureRoute, blogsController.editComment);

//---------------------SHOW ALL PROFILES---------------

router.route('/users')
  .get(usersController.index);

//--------------SHOW ONE PROFILE -------------------

router.route('/users/:id')
  .get(usersController.show);

//----------------REGISTER---------------------

router.route('/register')
  .get(registrations.new)
  .post(registrations.create)
  .delete(secureRoute, registrations.delete);

//---------------------LOGIN-------------------

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

  //------login with github------------

router.route('/oauth/github')
  .get(oauth.github);

  //------login with facebook------------

router.route('/oauth/facebook')
  .get(oauth.facebook);

//------------------LOGOUT-----------------

router.route('/logout')
  .get(sessions.delete);

// catch all 404 error page
router.all('*', (req, res) => res.notFound());

module.exports = router;
