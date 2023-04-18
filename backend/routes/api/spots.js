const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot,SpotImage, Booking} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*-------------------- Get All Spots --------------------*/
router.get("/" , async (req,res,next)=>{
  const allSpots = await Spot.findAll()
  res.json({Spots:allSpots})
})

/*-------------------- Create New Spot --------------------*/
router.post("/", requireAuth,async(req,res,next)=>{
  const {address,city,state,country,lat,lng, name, description,price} = req.body
  const { user } = req;
  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lattitude:lat,
    longitude:lng,
    name,
    description,
    price
  })

  res.json(newSpot)
})
/*-------------- Create New Image for a Spot --------------*/
/*---------------- Get Current Users Spots ----------------*/
router.get("/current", requireAuth, async(req,res,next)=>{
  const {user} = req
  const currentUserSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  })
  res.json({Spots:currentUserSpots})

})
/*---------------- Get Details of a Spot ----------------*/
router.get("/:spotId", async (req,res,next)=>{
  const specificSpot = await Spot.findByPk(req.params.spotId,{
    include:[
      {model: User, as: "Owner"},
      {model:SpotImage}
    ],
    // attributes:
  })

  res.json(specificSpot)
})
/*-------------------- Edit a Spot --------------------*/
/*-------------------- Review a Spot --------------------*/

module.exports = router;
