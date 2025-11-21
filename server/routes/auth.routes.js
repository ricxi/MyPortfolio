const express = require('express');
const authCtrl = require('../controllers/auth.controller.js');

const router = express.Router();

router.route('/api/auth/signin').post(authCtrl.signin);
router.route('/api/auth/signout').get(authCtrl.signout);

module.exports = router;
