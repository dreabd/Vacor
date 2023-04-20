const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");


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

  res.json({ Bookings })
})

/*-------------------- Delete a Booking --------------------*/
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req
  const specificBooking = await Booking.findByPk(req.params.bookingId, {
    include: [
      {
        model: Spot,
        include: "Owner"
      }
    ]
  })

  // Check if review exists
  if (!specificBooking) {
    const err = { message: "Booking couldn't be found" }
    err.status = 404
    return next(err)
  }

  // Checks if its too late to book
  let today = new Date().toISOString()
  if (today > specificBooking.startDate.toISOString()) {
    const err = { message: "Bookings that have been started can't be deleted" }
    err.status = 404
    return next(err)
  }
  // //  Check if the current user's id is equal to the reivew's userid and
  if (user.id !== specificBooking.userId || user.id === specificBooking.Spot.Owner.id) {
    console.log("error")
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }


  await specificBooking.destroy()

  res.json({
    message: "Booking succesfully deleted"
  })
})

/*--------------------- Edit a Booking ---------------------*/
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const specificBooking = await Booking.findByPk(req.params.bookingId)

  let { startDate, endDate } = req.body
  let newStartDate = new Date(startDate).toISOString()
  let newEndDate = new Date(endDate).toISOString()
  let today = new Date(/*Date.UTC(2023,11,14)*/).toISOString()
  console.log(today)
  console.log(newStartDate)
  console.log(newEndDate)


  // Booking does not belong to user
  if (req.user.id !== specificBooking.userId) {
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }

  // Booking does not exist
  if (!specificBooking) {
    const err = { message: "Booking couldn't be found" }
    err.status = 404
    return next(err)
  }

  // Booking Conflict
  const startDateConflict = await Booking.findAll({
    where: {
      id: {
        [Op.ne]: req.params.bookingId
      },
      startDate: {
        [Op.lte]: newStartDate
      },
      endDate: {
        [Op.gte]: newStartDate
      }
    }
  })
  const endDateConflict = await Booking.findAll({
    where: {
      id: {
        [Op.ne]: req.params.bookingId
      },
      startDate: {
        [Op.lte]: newEndDate
      },
      endDate: {
        [Op.gte]: newEndDate
      }
    }
  })
  console.log([specificBooking.endDate.toISOString(), newEndDate])
  console.log(newEndDate)
  startDateConflict.forEach(booking => console.log(booking.toJSON()))
  endDateConflict.forEach(booking => console.log(booking.toJSON()))
  // console.log(endDateConflict)
  if (startDateConflict.length) {
    const err = { message: "Sorry, this spot is already booked for the specified dates" }
    err.errors = "Start date conflicts with an existing booking"
    err.status = 400
    return next(err)
  }

  if (endDateConflict.length) {
    const err = { message: "Sorry, this spot is already booked for the specified dates" }
    err.errors = "End date conflicts with an existing booking"
    err.status = 400
    return next(err)
  }

  // Booking in the past
  if (today >= newEndDate || today >= newStartDate) {
    const err = { message: "Past bookings can not be modified" }
    err.status = 403
    return next(err)
  }

  specificBooking.startDate = newStartDate
  specificBooking.endDate = newEndDate
  await specificBooking.save()
  res.json({specificBooking})


})

module.exports = router;
