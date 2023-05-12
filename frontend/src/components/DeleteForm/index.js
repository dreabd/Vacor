import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";
import { thunkDeleteSpotReview } from "../../store/reviews";

import "./DeleteForm.css"


const DeleteForm = ({ spotId,setDeleted,reviewId }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  // console.log(reviewId,spotId)
  const deleteSpot = (e) => {
    dispatch(thunkDeleteSpot(spotId))
      .then(setDeleted(true))
      .then(closeModal)
  }

  const deleteReview = (e) =>{
    dispatch(thunkDeleteSpotReview(reviewId))
      .then(setDeleted(true))
      .then(closeModal)
  }

  // console.log(spotId)
  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      {reviewId ? <p>Are you sure you want to delete this review?</p> : <p>Are you sure you want to remove this post from the listings?</p>}
      <button className="confirm-delete-button" onClick={reviewId ? deleteReview: deleteSpot }> Yes (Delete {reviewId ? "Review" : "Spot"})</button>
      <button className="cancel-delete-button" onClick={closeModal}> No (Keep {reviewId ? "Review" : "Spot"})</button>
    </div>
  )
}


export default DeleteForm
