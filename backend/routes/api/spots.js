const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { query } = require('express-validator/check');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');

const router = express.Router();
/*----------------------- Validates Spots -----------------------*/
const validatesNewSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isNumeric({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isNumeric({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Price per day is required"),
  handleValidationErrors
];

/*-------------- Validates Review for Spots --------------*/
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

/*-------------- Validates Review for Spots --------------*/
const validateQuery = [
  query('page')
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  query('size')
    .isInt({ min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  query('maxLat')
    .isNumeric({ min: -90, max: 90 })
    .withMessage('Maximum Lattitude is not valid'),
  query('minLat')
    .isNumeric({ min: -90, max: 90 })
    .withMessage('Minimum Lattitude is not valid'),
  query('maxLng')
    .isNumeric({ min: -180, max: 180 })
    .withMessage('Maximum Longitude is not valid'),
  query('minLng')
    .isNumeric({ min: -180, max: 180 })
    .withMessage('Minimum Longitude is not valid'),
  query('maxPrice')
    .isNumeric({ min: 0 })
    .withMessage('Price is not valid'),
  query('minPrice')
    .isNumeric({ min: 0 })
    .withMessage('Price is not valid'),
  handleValidationErrors
];

/*--- Helper Function for adding Average Review and Preview URL ---*/
const avgRating_prevURL = (AllSpotsArr, newArr) => {
  AllSpotsArr.forEach(spot => {
    let currentSpot = spot.toJSON()
    /*--- Getting the Average Star Rating ---*/
    let reviewArr = currentSpot.Reviews
    let spotStars = []
    reviewArr.forEach(rev => {
      spotStars.push(rev.stars)
    })
    let averageStars = spotStars.reduce((a, b) => a + b, 0) / spotStars.length
    currentSpot["averageStars"] = averageStars

    /*--- Checking if the there is a preview Image  */
    if (currentSpot.SpotImages) { currentSpot["previewUrl"] = currentSpot.SpotImages[0].url }
    else currentSpot["previewUrl"] = "No Images could be found"

    delete currentSpot["Reviews"]
    delete currentSpot["SpotImages"]
    newArr.push(currentSpot)
  })
  return newArr
}

/*-------------------- Get All Spots --------------------*/
router.get("/", /*validateQuery*/ async (req, res, next) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
  let errorResult = { errors: {} };


  const where = {}
  const pagination = {}
  //  Pagination

  if (Number(page) < 1 || Number(page) > 10) page = 1
  if (Number(size) < 1 || Number(size) > 20) size = 20
  // if (isNaN(Number(page))) errorResult.errors.page = "Page must be greater than or equal to 1"
  // if (isNaN(Number(size))) errorResult.errors.size = "Size must be greater than or equal to 1"

  pagination.offSet = size * (page - 1)
  pagination.limit = size

  // // Query Parametes / Filters
  /* ----- Lattitudes and Longitudes -----*/
  if (minLat) {
    minLat = Number(minLat)
    if (!isNaN(minLat)) where.lattitude = { [Op.gte]: minLat }
    else errorResult.errors.minLat = "Minimum Lattitude is not valid"
  }

  if (maxLat) {
    maxLat = Number(maxLat)
    if (!isNaN(maxLat)) {
      if (where.lattitude) where.lattitude = { [Op.and]: [{ [Op.lte]: maxLat }, { [Op.gte]: minLat }] }
      else where.lattitude = { [Op.lte]: maxLat }
    }
    else errorResult.errors.maxLat = "Maximum Lattitude is not valid"
  }

  if (minLng) {
    minLng = Number(minLng)
    if (!isNaN(minLng)) {
      if (!isNaN(minLng)) where.longitude = { [Op.gte]: minLng }
    }
    else errorResult.errors.minLng = "Minimum Longitude is not valid"
  }

  if (maxLng) {
    maxLng = Number(maxLng)
    if (!isNaN(maxLng)) {
      if (where.longitude) where.longitude = { [Op.and]: [{ [Op.lte]: maxLng }, { [Op.gte]: minLng }] }
      else where.longitude = { [Op.lte]: maxLng }
    }
    else errorResult.errors.maxLng = "Minimum Longitude is not valid"

  }

  /* --------- Price --------- */
  if (minPrice) {
    minPrice = Number(minPrice)
    if (minPrice >= 0 && !isNaN(minPrice)) {
      where.price = { [Op.gte]: minPrice }
    }
    else errorResult.errors.minPrice = "Minimum Price is not valid"
  }
  if (maxPrice) {
    maxPrice = Number(maxPrice)
    if (maxPrice >= 0 && !isNaN(maxPrice)) {
      if (where.price) where.price = { [Op.and]: [{ [Op.lte]: maxPrice }, { [Op.gte]: minPrice }] }
      else where.price = { [Op.lte]: maxPrice }
    }
    else errorResult.errors.maxPrice = "Minimum Price is not valid"
  }

  if (Object.entries(errorResult.errors).length) {
    const err = {}
    err.status = 400
    return next(errorResult)
  }

  const allSpots = await Spot.findAll({
    ...pagination,
    where,
    include: [Review, SpotImage],

  }) // Turns to an arr of Spots
  let Spots = [];

  avgRating_prevURL(allSpots, Spots)

  res.json({Spots})
})


/*-------------------- Create New Spot --------------------*/
router.post("/", requireAuth, validatesNewSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const { user } = req;
  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lattitude: lat,
    longitude: lng,
    name,
    description,
    price
  })

  res.json(newSpot)
})

/*---------------- Get Current Users Spots ----------------*/
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req
  const currentUserSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  })
  res.json({ Spots: currentUserSpots })
})

/*---------------- Get Details of a Spot ----------------*/
router.get("/:spotId", async (req, res, next) => {
  const specificSpot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Review },
      { model: SpotImage },
      { model: User, as: "Owner" },
    ],
  })

  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  let spotDetails = specificSpot.toJSON()
  spotDetails.numReviews = spotDetails.Reviews.length
  let star = []
  spotDetails.Reviews.forEach(review => star.push(review.stars))
  spotDetails.averageStars = star.reduce((a, b) => a + b, 0) / star.length
  delete spotDetails.Reviews

  res.json(spotDetails)
})

/*-------------- Create New Image for a Spot --------------*/
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const specificSpot = await Spot.findByPk(req.params.spotId)

  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  const { url, preview } = req.body

  const newImage = await SpotImage.create({
    spotId: parseInt(req.params.spotId),
    url,
    preview
  })

  res.json(newImage)
})

/*-------------------- Edit a Spot --------------------*/
router.put("/:spotId", requireAuth, validatesNewSpot, async (req, res, next) => {
  const { user } = req
  const specificSpot = await Spot.findByPk(req.params.spotId)

  // Check if spot exists
  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  //  Check if the current user's id is equal to the owner's id
  if (user.id !== specificSpot.ownerId) {
    console.log("error")
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }


  const { address, city, state, country, lat, lng, name, description, price } = req.body

  if (address) specificSpot.address = address
  if (city) specificSpot.city = city
  if (state) specificSpot.state = state
  if (country) specificSpot.country = country
  if (lat) specificSpot.lattitude = lat
  if (lng) specificSpot.longitude = lng
  if (name) specificSpot.name = name
  if (description) specificSpot.description = description
  if (price) specificSpot.price = price

  await specificSpot.save()

  res.json(specificSpot)
})
/*-------------------- Delete a Spot --------------------*/

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req
  const specificSpot = await Spot.findByPk(req.params.spotId)

  // Check if spot exists
  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  if (user.id !== specificSpot.ownerId) {
    const err = { message: "Forbidden" }
    err.status = 401
    return next(err)
  }


  await specificSpot.destroy()

  res.json({
    message: "Spot succesfully deleted"
  })

})

/*-------------------- Review a Spo off of Spot Id --------------------*/
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res, next) => {
  const { user } = req

  // Checks if Spot Exists
  const specificSpot = await Spot.findByPk(req.params.spotId)
  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }
  // REVIEW FROM THE CURRENT USER ALREADY EXISTS!!!!
  // Need to write a error handler that checks if the userId is already the list of reveiws for a spot
  const specificSpotsReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
      userId: user.id
    }
  })
  if (specificSpotsReviews.length) {
    const err = { "message": "User already has a review for this spot" }
    err.status = 500
    return next(err)
  }

  // Need userId, SpotId, req.body
  const spotId = parseInt(req.params.spotId)
  const { review, stars } = req.body
  const newReview = await Review.create({
    userId: user.id,
    spotId,
    review,
    stars
  })

  res.json(newReview)
})

/*-------------------- Get Reviews of a Spot by SpotId --------------------*/
router.get("/:spotId/reviews", async (req, res, next) => {
  const specificSpot = await Spot.findByPk(req.params.spotId)

  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  const specificSpotsReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [User, ReviewImage]
  })
  res.json(specificSpotsReviews)
})

/*-------------------- Creating Booking of a Spot by SpotId --------------------*/
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  // Current User can not Own Spot
  // Get the id of the user and owner of the spot throw an error if they are equal
  const userId = req.user.id
  const specificSpot = await Spot.findByPk(req.params.spotId)
  // Looped throuigh bookings

  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }

  if (userId === specificSpot.ownerId) {
    const err = { message: "Forbidden" }
    err.status = 403
    return next(err)
  }


  let { startDate, endDate } = req.body
  let newStartDate = new Date(startDate).toISOString()
  let newEndDate = new Date(endDate).toISOString()
  const startDateConflict = await Booking.findAll({
    where: {
      spotId: parseInt(req.params.spotId),
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
      spotId: parseInt(req.params.spotId),
      startDate: {
        [Op.lte]: newEndDate
      },
      endDate: {
        [Op.gte]: newEndDate
      }
    }
  })

  if (startDateConflict.length) {
    const err = { message: "Sorry, this spot is already booked for the specified dates" }
    err.errors = "Start date conflicts with an existing booking"
    err.status = 403
    return next(err)
  }

  if (endDateConflict.length) {
    const err = { message: "Sorry, this spot is already booked for the specified dates" }
    err.errors = "End date conflicts with an existing booking"
    err.status = 403
    return next(err)
  }

  const newBooking = await Booking.create({
    spotId: parseInt(req.params.spotId),
    userId: userId,
    startDate,
    endDate
  })

  res.json({ newBooking })
})

/*-------------------- Get Bookings of a Spot by SpotId --------------------*/
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const specificSpot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Booking,
        include: User
      }
    ]
  })

  if (!specificSpot) {
    const err = { "message": "Spot couldn't be found" }
    err.status = 404
    return next(err)
  }


  if (userId === specificSpot.ownerId) {
    let Bookings = []
    specificSpot.Bookings.forEach(spot => {
      let currentSpot = spot.toJSON()
      Bookings.push(currentSpot)
    })

    return res.json({ Bookings })
  } else {
    let Bookings = []

    specificSpot.Bookings.forEach(spot => {
      let currentSpot = spot.toJSON()
      delete currentSpot.createdAt
      delete currentSpot.updatedAt
      delete currentSpot.User
      delete currentSpot.userId
      Bookings.push(currentSpot)
    })

    return res.json({ Bookings })
  }

})


module.exports = router;
