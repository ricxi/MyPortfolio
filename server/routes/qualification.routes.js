const express = require('express');
const qualificationCtrl = require('../controllers/qualification.controller.js');
const { requireSignin } = require('../middleware/auth.middleware.js');
const { requireAdmin } = require('../middleware/admin.middleware.js');

const router = express.Router();

router.post(
  '/api/qualifications',
  requireSignin,
  requireAdmin,
  qualificationCtrl.create,
);

router.get('/api/qualifications', requireSignin, qualificationCtrl.getAll);

router.get('/api/qualifications/:id', requireSignin, qualificationCtrl.getById);

router.put(
  '/api/qualifications/:id',
  requireSignin,
  requireAdmin,
  qualificationCtrl.updateById,
);

router.delete(
  '/api/qualifications/:id',
  requireSignin,
  requireAdmin,
  qualificationCtrl.deleteById,
);

router.delete(
  '/api/qualifications',
  requireSignin,
  requireAdmin,
  qualificationCtrl.deleteAll,
);

module.exports = router;
