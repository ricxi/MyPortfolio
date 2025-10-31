const express = require('express');
const projectCtrl = require('../controllers/project.controller.js');

const router = express.Router();

router.post('/api/projects', projectCtrl.create);

router.get('/api/projects', projectCtrl.getAll);

router.get('/api/projects/:id', projectCtrl.getById);

router.put('/api/projects/:id', projectCtrl.updateById);

router.delete('/api/projects/:id', projectCtrl.deleteById);

router.delete('/api/projects', projectCtrl.deleteAll);

module.exports = router;
