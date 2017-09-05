"use strict";
//Node and npm packages
const mongoose 		= require('mongoose');
const fs 			= require('fs');
const aws			= require('aws-sdk');
const multer 		= require('multer');
const multerS3 		= require('multer-s3');
//Schemas
const Campground 	= require('../../models/campground');
//Pagination module
const paginate 		= require('./paginate');

//Create new file-Upload System
aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  	region: 'eu-west-1'
});

const s3 = new aws.S3();

const storage = multerS3({
	s3: s3,
	bucket: process.env.BUCKET_NAME,
	key: (req, file, cb) => {
		let fileExtension = file.originalname.split('.')[1];
		let path = "covers/"+req.body.name+Date.now()+'.'+fileExtension;
		cb(null, path);
	}
});

var upload = multer({storage: storage}).any("images", 3);

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

//Validate fileType
function validateFileType(req, res, next){
	//Setup filetype check
	const buffer = readChunk.sync(req.files[0].image, 0, 4100);
	fileType(buffer);
};

//Get all campgrounds
module.exports.getAllCampgrounds = (req, res, next) => {
	paginate.paginateCampgrounds(req, res, next);
};

//Get post form
module.exports.getPostForm = (req, res, next) => {
	res.render("campground/new.ejs");
};

//Post new campground
module.exports.createCampground = (req, res, next) => {
	upload(req, res, (err)=> {
		if(err) {
			req.flash("error", err.message);
			res.redirect("back");
			return;
		} else {

		}
	})
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
