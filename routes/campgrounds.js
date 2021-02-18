const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const flash = require('connect-flash/lib/flash');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { nextTick } = require('process');
const campgrounds = require('../controllers/campgrounds');
const campground = require('../models/campground');
const multer = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});


// Routes
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,  upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
   

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));



// Exports
module.exports = router;
