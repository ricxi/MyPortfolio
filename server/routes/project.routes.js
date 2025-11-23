const express = require('express');
const projectCtrl = require('../controllers/project.controller.js');
const { requireSignin } = require('../middleware/auth.middleware.js');
const { requireAdmin } = require('../middleware/admin.middleware.js');

const router = express.Router();

router.post('/api/projects', requireSignin, requireAdmin, projectCtrl.create);

router.get('/api/projects', requireSignin, projectCtrl.getAll);

router.get('/api/projects/:id', requireSignin, projectCtrl.getById);

router.put(
  '/api/projects/:id',
  requireSignin,
  requireAdmin,
  projectCtrl.updateById,
);

router.delete(
  '/api/projects/:id',
  requireSignin,
  requireAdmin,
  projectCtrl.deleteById,
);

router.delete(
  '/api/projects',
  requireSignin,
  requireAdmin,
  projectCtrl.deleteAll,
);

module.exports = router;
