const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
/*-------------------- Get Reviews of the Current User --------------------*/
/*-------------------- Edit a Review --------------------*/
/*-------------------- Create an Image for a Review --------------------*/
/*-------------------- Delete a Review --------------------*/
module.exports = router;
