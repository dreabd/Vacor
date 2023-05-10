import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot, thunkGetUserSpots } from "../../store/spots";

import "./DeleteSpotModal.css"


const DeleteSpotModal = ({ spotId,setDeleted }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const deleteSpot = (e) => {
    dispatch(thunkDeleteSpot(spotId))
      .then(setDeleted(true))
      .then(closeModal)
  }

  // console.log(spotId)
  return (
    <div className="delete-spot-container">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this psot from the listings</h3>
      <button onClick={deleteSpot}> Yes( Delete Spot)</button>
      <button onClick={closeModal}> No (Keep Spot)</button>
    </div>
  )
}


export default DeleteSpotModal
