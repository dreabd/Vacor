const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

/*-------------------- Get Bookings of the Current User --------------------*/
router.get("/current", requireAuth, async (req, res, next) => {
  const userBookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        include: SpotImage
      }
    ]
  })
  console.log(userBookings)
  let Bookings = []
  userBookings.forEach(booking => {

    let currBooking = booking.toJSON()
    delete currBooking.Spot.createdAt
    delete currBooking.Spot.updatedAt
    delete currBooking.Spot.description
    if (currBooking.Spot.SpotImages[0].preview) currBooking.Spot.previewImage = currBooking.Spot.SpotImages[0].url
    delete currBooking.Spot.SpotImages

    Bookings.push(currBooking)

  })

  res.json({Bookings })
})

/*-------------------- Delete a Booking --------------------*/
router.delete("/:reviewId", requireAuth, async(req,res,next)=>{
  const { user } = req
  const specificReview = await Review.findByPk(req.params.reviewId)

  // Check if review exists
  if (!specificReview) {
    const err = { message: "Review couldn't be found" }
    err.status = 404
    return next(err)
  }
  //  Check if the current user's id is equal to the reivew's userid
  if (user.id !== specificReview.userId) {
    console.log("error")
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }


  specificReview.destroy()

  res.json({
    message: "Review succesfully deleted"
  })
})

module.exports = router;
