const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

/*-------------------- Delete a Review Image --------------------*/
router.delete('/:reviewImage', requireAuth, async(req,res,next)=>{
  const { user } = req
  // For Checking if the User Made that Spot
  const specificReview = await ReviewImage.unscoped().findByPk(req.params.reviewImage,{
    include: [{
      model: Review
    }]
  })
  // Check if Spot exists
  if (!specificReview) {
    const err = { message: "Reivew Image couldn't be found" }
    err.status = 404
    return next(err)
  }
  //  Check if the current user's id is equal to the Spot's userid
  if (user.id !== specificReview.Review.userId) {
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }

  await specificReview.destroy()

  res.json({message: "Successfully Deleted"})
})
module.exports = router;
