const express = require('express');
const userCtrl = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

const router = express.Router();

router.route('/api/users').post(userCtrl.create);

router
  .route('/api/users/:userId')
  .get(userCtrl.read)
  .put(authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.hasAuthorization, userCtrl.remove);

// .get(authCtrl.requireSignin, userCtrl.read)
// .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.route('/api/users').get(userCtrl.list);
router.param('userId', userCtrl.userByID);
router.route('/api/users/:userId').get(userCtrl.read);
router.route('/api/users/:userId').put(userCtrl.update);
router.route('/api/users/:userId').delete(userCtrl.remove);

module.exports = router;
