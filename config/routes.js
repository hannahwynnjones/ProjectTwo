const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const oauth = require('../controllers/oauth');
const blogsController = require('../controllers/blogs');
const secureRoute = require('../lib/secureRoute');
// const upload = require('../lib/upload');
const statics = require('../controllers/statics');

//-------------------HOME--------------------

router.route('/')
  .get(statics.index);

  //--------Once registered, shows user's profile to them----

router.route('/user')
  .get(secureRoute, registrations.show);

//----------see allblogs????---------------

router.route('/blogs')
  .get(blogsController.index)
  .post(secureRoute, blogsController.create);

//-------------create new blog----------

router.route('/blogs/new')
  .get(secureRoute, blogsController.new);

//--------edit or update a blog---------------

router.route('/blogs/:id')
  .get(blogsController.show)
  .put(secureRoute, blogsController.update)
  .delete(secureRoute, blogsController.delete);

router.route('/blogs/:id/edit')
  .get(secureRoute, blogsController.edit);

//--See all avaliable profiles who have registered with the site---

//add comments

router.route('/blogs/:id/comments')
  .post(secureRoute, blogsController.createComment);

router.route('/blogs/:id/comments/:commentId')
  .delete(secureRoute, blogsController.deleteComment);

//-------------------------------------------
//EDIT COMMENTS

router.route('/blogs/:id/editComments')
  .post(secureRoute, blogsController.editComment);

//-------------------------------------------

router.route('/users');

//----------------register---------------------

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

//-----------login-------------------

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

  //------login with github------------

router.route('/oauth/github')
  .get(oauth.github);

//------------------logout-----------------

router.route('/logout')
  .get(sessions.delete);

  //------Delete account button -------------

router.route('/profile')
  .delete(secureRoute, registrations.delete);

// catch all 404 error page
router.all('*', (req, res) => res.notFound());

module.exports = router;
