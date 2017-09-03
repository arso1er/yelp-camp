"use strict";
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl');

router
	.route("/register")
	.get(authCtrl.getRegisterForm)
	.post(authCtrl.register);

router
	.route('/compare')
	.post(authCtrl.compare);

module.exports = router;