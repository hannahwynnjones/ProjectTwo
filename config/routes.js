const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
//secure route is not used yet, but can be added to functions so that it is checking whether the user is logged in or not eg editing or deleting files
router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

// router.route('/logout')
//   .get(sessions.delete);

//NOT NECCESSARILY HAVE TO ADD THE FOLLOWING:

// router.route('/shoes')
//   .get(shoesController.index)
//   .post(secureRoute, shoesController.create);
//
// router.route('/shoes/new')
//   .get(secureRoute, shoesController.new);
//
// router.route('/shoes/:id')
//   .get(shoesController.show)
//   .put(secureRoute, shoesController.update)
//   .delete(secureRoute, shoesController.delete);
//
// router.route('/shoes/:id/edit')
//   .get(secureRoute, shoesController.edit);

router.all('*'), (req, res) => res.notFound();

module.exports = router;

//capital letters are classes (but in the case its a function)
