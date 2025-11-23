const express = require('express');
const contactCtrl = require('../controllers/contact.controller.js');
const { requireSignin } = require('../middleware/auth.middleware.js');
const { requireAdmin } = require('../middleware/admin.middleware.js');

const router = express.Router();

router.post('/api/contacts', requireSignin, requireAdmin, contactCtrl.create);

router.get('/api/contacts', requireSignin, contactCtrl.getAll);

router.get('/api/contacts/:id', requireSignin, contactCtrl.getById);

router.put(
  '/api/contacts/:id',
  requireSignin,
  requireAdmin,
  contactCtrl.updateById,
);

router.delete(
  '/api/contacts/:id',
  requireSignin,
  requireAdmin,
  contactCtrl.deleteById,
);

router.delete(
  '/api/contacts',
  requireSignin,
  requireAdmin,
  contactCtrl.deleteAll,
);

module.exports = router;
