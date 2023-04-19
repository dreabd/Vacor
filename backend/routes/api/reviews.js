const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
/*-------------- Validates Review for Spots --------------*/
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min:1,max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

/*-------------------- Get Reviews of the Current User --------------------*/
router.get("/current", requireAuth, async (req, res, next) => {

  const userReviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User
      },
      {
        model: Spot,
        include: {
          model: SpotImage
        }
      },
      {
        model: ReviewImage
      }
    ]
  })

  let Reviews = []
  userReviews.forEach(review => {
    let currentReview = review.toJSON()
    // User Remains the same
    delete currentReview.Spot.createdAt
    delete currentReview.Spot.updatedAt
    delete currentReview.Spot.description
    if (currentReview.Spot.SpotImages[0].preview) currentReview.Spot.previewImage = currentReview.Spot.SpotImages[0].url

    delete currentReview.Spot.SpotImages
    // Spot needs to delete Updated At, Created At, Description
    // Create a new value in spot called preview image
    // if there is a preview image then shwo it otherwise jsut do false

    // Review Images remains the same
    Reviews.push(currentReview)
  })
  console.log(Reviews)

  res.json({ Reviews })
})

/*-------------------- Edit a Review --------------------*/
router.put("/:reviewId", requireAuth,validateReview, async (req, res, next) => {
  const { user } = req
  const {review,stars}= req.body
  const specificReview = await Review.findByPk(req.params.reviewId)

  //  Check if the current user's id is equal to the reivew's userid
  if (user.id !== specificReview.userId) {
    console.log("error")
    const err = { message: "Forbidden" }
    err.status = 400
    return next(err)
  }

  // Check if review exists
  if (!specificReview) {
    const err = { message: "Review couldn't be found" }
    err.status = 404
    return next(err)
  }

  specificReview.review = review
  specificReview.stars = stars
  specificReview.save()

  res.json(specificReview)
})

/*-------------------- Create an Image for a Review --------------------*/
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const specificReview = await Review.findByPk(req.params.reviewId)
  const reviewImage = await ReviewImage.findAll({
    where:{
      reviewId: req.params.reviewId
    }
  })

  if (!specificReview) {
    const err = { message: "Review couldn't be found" }
    err.status = 404
    return next(err)
  }

  if(reviewImage.length > 10){
    const err = {message: "Maximum number of images for this resource was reached"}
    err.status = 404
    return next(err)
  }


  const { url } = req.body

  const newImage = await ReviewImage.create({
    reviewId: parseInt(req.params.reviewId),
    url
  })

  res.json({newImage,reviewImage,length:reviewImage.length})
})
/*-------------------- Delete a Review --------------------*/
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
