const express = require('express');
const contactCtrl = require('../controllers/contact.controller.js');

const router = express.Router();

router.post('/api/contacts', contactCtrl.create);

router.get('/api/contacts', contactCtrl.getAll);

router.get('/api/contacts/:id', contactCtrl.getById);

router.put('/api/contacts/:id', contactCtrl.updateById);

router.delete('/api/contacts/:id', contactCtrl.deleteById);

router.delete('/api/contacts', contactCtrl.deleteAll);

module.exports = router;
