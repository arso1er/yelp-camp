"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');

const authCtrl = require('../controllers/authCtrl');

router
	.route('/login')
	.get(authCtrl.getLoginForm)
	.post(passport.authenticate('local',{
  		successRedirect: '/profile',
  		failureRedirect: '/signin',
  		failureFlash: true
	}));

router
	.route("/register")
	.get(authCtrl.getRegisterForm)
	.post(authCtrl.register);

router
	.route('/compare')
	.post(authCtrl.compare);

router
	.route('/logout')
	.post(authCtrl.logOut);

module.exports = router;