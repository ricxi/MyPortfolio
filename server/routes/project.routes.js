const express = require('express');
const projectCtrl = require('../controllers/project.controller.js');
const auth = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/api/projects', auth.requireSignin, projectCtrl.create);

router.get('/api/projects', auth.requireSignin, projectCtrl.getAll);

router.get('/api/projects/:id', auth.requireSignin, projectCtrl.getById);

router.put('/api/projects/:id', auth.requireSignin, projectCtrl.updateById);

router.delete('/api/projects/:id', auth.requireSignin, projectCtrl.deleteById);

router.delete('/api/projects', auth.requireSignin, projectCtrl.deleteAll);

module.exports = router;
