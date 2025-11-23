const express = require('express');
const qualificationCtrl = require('../controllers/qualification.controller.js');
const auth = require('../middleware/auth.middleware.js');
const { requireAdmin } = require('../middleware/admin.middleware.js');

const router = express.Router();

router.post(
  '/api/qualifications',
  auth.requireSignin,
  qualificationCtrl.create,
);

router.get(
  '/api/qualifications',
  auth.requireSignin,
  requireAdmin,
  qualificationCtrl.getAll,
);

router.get(
  '/api/qualifications/:id',
  auth.requireSignin,
  qualificationCtrl.getById,
);

router.put(
  '/api/qualifications/:id',
  auth.requireSignin,
  qualificationCtrl.updateById,
);

router.delete(
  '/api/qualifications/:id',
  auth.requireSignin,
  qualificationCtrl.deleteById,
);

router.delete(
  '/api/qualifications',
  auth.requireSignin,
  qualificationCtrl.deleteAll,
);

module.exports = router;
