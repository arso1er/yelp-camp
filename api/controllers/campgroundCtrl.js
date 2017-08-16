"use strict";
const mongoose = require('mongoose');

const Campground = require('../../models/campground');

const paginate = require('./paginate');

//Array splitterhelper
var _splitArray = (input) => {
	var output;
	if(input && input.length > 0) {
		output = input.split("!;");
	} else {
		output = [];
	}
	return output;
};

//Get all campgrounds
module.exports.getAllCampgrounds = (req, res, next) => {
	paginate.paginateCampgrounds(req, res, next);
};

//Post new campground
module.exports.createCampground = (req, res, next) => {
	var campground = new Campground();
	campground.name = req.body.name;
	campground.images = _splitArray(req.body.images);
	campground.cover = req.body.cover;
	campground.price = req.body.price;
	campground.description = req.body.description;
	campground.author = "Roman Tuomisto";
	campground.save((err, newCampground) => {
		if(err) {
			res.status(500).send(err.message);
		} else {
			res.redirect("/campgrounds");
		}
	});
};

//Get one campground
