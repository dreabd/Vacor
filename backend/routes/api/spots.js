const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
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
    .withMessage("Price per day is required"),
  handleValidationErrors
];


/*-------------------- Get All Spots --------------------*/
router.get("/", async (req, res, next) => {
  const allSpots = await Spot.findAll({ include: [Review,SpotImage ]}) // Turns to an arr of Spots
  let Spots = [];

  allSpots.forEach(spot => {
    let currentSpot = spot.toJSON()
    /*--- Getting the Average Star Rating ---*/
    let reviewArr = currentSpot.Reviews
    let spotStars = []
    reviewArr.forEach(rev => {
      spotStars.push(rev.stars)
    })
    let averageStars = spotStars.reduce((a, b) => a + b, 0) / 2
    currentSpot["averageStars"] = averageStars

    /*--- Checking if the there is a preview Image  */
    if(currentSpot.SpotImages){ currentSpot["previewUrl"]= currentSpot.SpotImages[0].url}
    else currentSpot["previewUrl"] = "No Images could be found"

    delete currentSpot["Reviews"]
    delete currentSpot["SpotImages"]
    Spots.push(currentSpot)
  })
  res.json(Spots)
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
      { model: User, as: "Owner" },
      { model: SpotImage }
    ],
  })

  res.json(specificSpot)
})

/*-------------- Create New Image for a Spot --------------*/
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const specificSpot = await Spot.findByPk(req.params.spotId)
  if (!specificSpot) {
    // NEED TO FIGURE OUT HOW TO HANDLE ERROR FOR THIS ONE
    res.status(404)
    res.json({
      message: "Could not spot Spot"
    })
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
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req
  const specificSpot = await Spot.findByPk(req.params.spotId)

  //  Check if the current user's id is equal to the owner's id
  if (user.id !== specificSpot.ownerId) {
    console.log("error")
    res.status(400)
    res.json({ message: "You do not have access to edit this Spot's information" })
    return next(err)
  }


  res.json({ working: "In Progress", specificSpot })
})
/*-------------------- Review a Spot --------------------*/

module.exports = router;
