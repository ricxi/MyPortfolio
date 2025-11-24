const express = require('express');
const userCtrl = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.middleware.js');
const { requireAdmin } = require('../middleware/admin.middleware.js');

const router = express.Router();

router.post('/api/users', userCtrl.create);

router.get('/api/users', auth.requireSignin, userCtrl.list);

router.get('/api/users/:id', auth.requireSignin, userCtrl.userByID);

router.put(
  '/api/users/:id',
  auth.requireSignin,
  auth.hasAuthorization,
  userCtrl.update,
);

router.delete(
  '/api/users/:id',
  auth.requireSignin,
  auth.hasAuthorization,
  requireAdmin,
  userCtrl.removeById,
);

router.delete(
  '/api/users',
  auth.requireSignin,
  requireAdmin,
  userCtrl.removeAll,
);

module.exports = router;
