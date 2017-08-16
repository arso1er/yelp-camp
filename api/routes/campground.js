'use strict';
const express = require('express');
const router = express.Router();

const campgroundCtrl = require('../controllers/campgroundCtrl');

// "/campground"
router
	.route("/")
	.get(campgroundCtrl.getAllCampgrounds)
	.post(campgroundCtrl.createCampground);

module.exports = router;