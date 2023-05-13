import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StarRating from "./StarRating";
import { useModal } from "../../context/Modal";
import { thunkGetSpotReviews,thunkPostNewReview } from "../../store/reviews";
import { thunkGetSpot } from "../../store/spots";

import "./ReviewForm.css"

function ReviewForm({ /*setUpdated,*/spotId }) {

  const dispatch = useDispatch()
  const { closeModal } = useModal();

  // --------- State Variables -----------
  const [stars, setStars] = useState(0)
  const [review, setReview] = useState("")
  const [validationErrors, setErrors] = useState({});


  const onChange = number => setStars(number)


  // ----- Error Handling -----
  useEffect(()=>{
    const errs = {}
    if(review.length < 10) errs["review"] = "Review needs to be at least 10 characters"
    if(stars <= 0) errs["stars"] = "Stars need to be at least 1"

    setErrors(errs)
  },[stars,review])

  // ------Submit Functionality------
  const onSubmit = async e => {
    e.preventDefault();

    // console.log(spotId)
    const newReview = {
      review,
      stars
    }

    // console.log(newReview)

    const response = await dispatch(thunkPostNewReview(spotId,newReview))
    dispatch(thunkGetSpotReviews(spotId))
    dispatch(thunkGetSpot(spotId))
    if(response.errors){
      setErrors(response.errors)
      return
    }
    // setUpdated(true)
    closeModal()
  }

  return (
    <form
      onSubmit={onSubmit}
      className="new-review-container"
    >
      <h3>How was your stay</h3>
      {}
      <textarea
        className="new-review-input"
        id="" cols="30"
        rows="10"
        placeholder="Leave your review here"
        value={review}
        onChange={e => setReview(e.target.value)}
      ></textarea>
      <p className="star-rating-container"><StarRating onChange={onChange}stars={stars}/> Stars</p>

      <button disabled={Object.values(validationErrors).length} className="submit-reivew-button">Submit Your Review!</button>
    </form>

  )
}

export default ReviewForm
