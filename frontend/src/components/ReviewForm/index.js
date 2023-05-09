import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StarRating from "./StarRating";
import { useModal } from "../../context/Modal";


import "./ReviewForm.css"

function ReviewForm({ spotId }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();


  // --------- State Variables -----------
  const [stars, setStars] = useState(0)
  const [review, setReview] = useState("")
  const [errors, setErrors] = useState({});


  const onChange = number => setStars(number)


  // ----- Error Handling -----
  useEffect(()=>{
    const errs = {}
    if(review.length < 10) errs["review"] = "Review needs to be at least 10 characters"
    if(stars <= 0) errs["stars"] = "Stars need to be at least 1"

    setErrors(errs)
  },[stars,review])

  // ------Submit Functionality------
  const onSubmit = e => {
    e.preventDefault();

    console.log(spotId)
    const newReview = {
      review,
      stars
    }

    console.log(newReview)

    /*
    const respone = dispatch(postNewReview(spotId,newReview))
    if(response.errors){
      setErrors(response.errors)
      return err
    }


    */
    // Thunk action that submits the review
    // -need spot id for this to work


    closeModal()
  }

  return (
    <form
      onSubmit={onSubmit}
      className="new-review-container"
    >
      <h3>How was your stay</h3>
      <textarea
        className="new-review-input"
        id="" cols="30"
        rows="10"
        placeholder="Leave your review here"
        value={review}
        onChange={e => setReview(e.target.value)}
      ></textarea>
      <p className="star-rating-container"><StarRating onChange={onChange}stars={stars}/> Stars</p>

      <button disabled={Object.values(errors).length}className="submit-reivew-button">Submit Your Review!</button>
    </form>

  )
}

export default ReviewForm
