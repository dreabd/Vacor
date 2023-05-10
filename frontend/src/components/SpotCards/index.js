import { NavLink, Link } from "react-router-dom";
import React from "react";
import "./spot-card.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";


function SpotCards({ setManaging, managing, spots }) {
  // console.log("Managing in the spotcard:", managing)
  // console.log("These are all the spots in spot cards:", Object.values(spots))
  const updateAndDeleteButts = (spotId) => {
    return (
      <div className="update-delete-button-container">
        <NavLink exact to={`/spots/${spotId}/edit`}>
          <button className="spot-update-button"> Update</button>
        </NavLink>
        <OpenModalMenuItem
          itemText="Delete"
          spotId={spotId}
          modalComponent={<DeleteSpotModal spotId={spotId} />}
        />
      </div>
    )
  }

  const createNewSpotButton = () => {
    return (
      <div className="create-new-spot-button-container">
        <h2>Manage Your Spots</h2>
        <NavLink style={{ textDecoration: "none", cursor: "pointer" }} exact to="/spots/new"> Create New Spot</NavLink>
      </div>
    )

  }

  const spotCardCreater = Object.values(spots).map(spot => {
    // console.log(spot)
    return (

      <div key={spot.id}>
        {/* Need to wrap the image in a link tag so that it is a clickable image */}
        <Link exact to={`/spots/${spot.id}`}>
          <img
            className="spot-image"
            src={spot.previewUrl}
            alt={`${spot.name}`}>
          </img>
        </Link>

        <div className="spot-data-container">
          <div className="first-row">
            <p>{spot.city},{spot.state}</p>
            <p>
              <i className="fa-solid fa-star empty"></i>
              {spot.averageStars}
            </p>
          </div>

          <div className="second-row">
            <p className="price-per-night"><span style={{ fontWeight: "bold" }}>{spot.price}</span>/night</p>
          </div>
        </div>

        {managing && updateAndDeleteButts(spot.id)}

      </div>

    )
  })

  return (
    <>
      {managing && createNewSpotButton()}
      <div className="spot-image-container">
        {spotCardCreater}
      </div>
    </>
  )
}

export default SpotCards
