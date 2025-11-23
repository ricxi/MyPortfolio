const express = require('express');
const contactCtrl = require('../controllers/contact.controller.js');
const auth = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/api/contacts', auth.requireSignin, contactCtrl.create);

router.get('/api/contacts', auth.requireSignin, contactCtrl.getAll);

router.get('/api/contacts/:id', auth.requireSignin, contactCtrl.getById);

router.put('/api/contacts/:id', auth.requireSignin, contactCtrl.updateById);

router.delete('/api/contacts/:id', auth.requireSignin, contactCtrl.deleteById);

router.delete('/api/contacts', auth.requireSignin, contactCtrl.deleteAll);

module.exports = router;
