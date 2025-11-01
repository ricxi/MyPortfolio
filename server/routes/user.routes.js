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

module.exports = router;
