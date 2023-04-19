const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

/*-------------------- Delete a Spot Image --------------------*/
router.delete('/:spotImageId', requireAuth, async(req,res,next)=>{
  const { user } = req
  // For Checking if the User Made that Spot
  const specificSpotImage = await SpotImage.unscoped().findByPk(req.params.spotImageId,{
    include: [{
      model:Spot,
    }]
  })
  // Check if Spot exists
  if (!specificSpotImage) {
    const err = { message: "Spot Image couldn't be found" }
    err.status = 404
    return next(err)
  }
  // console.log(specificSpotImage)
  //  Check if the current user's id is equal to the Spot's userid
  if (user.id !== specificSpotImage.Spot.ownerId) {
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }

  await specificSpotImage.destroy()

  res.json({message: "Successfully Deleted"})
})

module.exports = router;
