const express = require('express');
const userCtrl = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/api/users', userCtrl.create);

router.get(
  '/api/users',
  authCtrl.requireSignin,
  // authCtrl.hasAuthorization,
  userCtrl.list
);

router.get(
  '/api/users/:id',
  authCtrl.requireSignin,
  // authCtrl.hasAuthorization,
  userCtrl.userByID
);

router.put(
  '/api/users/:id',
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  userCtrl.update
);

router.delete(
  '/api/users/:id',
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  userCtrl.removeById
);

router.delete('/api/users', authCtrl.requireSignin, userCtrl.removeAll);

// router
//   .route('/api/users/:userId')
//   .get(userCtrl.read)
//   .put(authCtrl.hasAuthorization, userCtrl.update)
//   .delete(authCtrl.hasAuthorization, userCtrl.remove);

// .get(authCtrl.requireSignin, userCtrl.read)
// .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// router.route('/api/users').get(userCtrl.list);
// router.param('userId', userCtrl.userByID);
// router.route('/api/users/:userId').get(userCtrl.read);
// router.route('/api/users/:userId').put(userCtrl.update);
// router.route('/api/users/:userId').delete(userCtrl.remove);

module.exports = router;
