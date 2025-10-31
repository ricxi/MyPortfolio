const express = require('express');
const qualificationCtrl = require('../controllers/qualification.controller.js');

const router = express.Router();

router.post('/api/qualifications', qualificationCtrl.create);

router.get('/api/qualifications', qualificationCtrl.getAll);

router.get('/api/qualifications/:id', qualificationCtrl.getById);

router.put('/api/qualifications/:id', qualificationCtrl.updateById);

router.delete('/api/qualifications/:id', qualificationCtrl.deleteById);

router.delete('/api/qualifications', qualificationCtrl.deleteAll);

module.exports = router;
