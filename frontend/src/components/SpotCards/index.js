import { NavLink, Link } from "react-router-dom";
import React from "react";
import "./spot-card.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteForm from "../DeleteForm";


function SpotCards({ setDeleted, deleted, managing, spots }) {
  // console.log("Managing in the spotcard:", managing)
  // console.log("These are all the spots in spot cards:", Object.values(spots))
  const updateAndDeleteButts = (spotId) => {
    return (
      <div className="update-delete-button-container">
        <NavLink style={{textDecoration:"none"}}exact to={`/spots/${spotId}/edit`}>
          <button className="spot-update-button"> Update</button>
        </NavLink>
        <OpenModalMenuItem
          itemText="Delete"
          deleted={deleted}
          modalComponent={<DeleteForm setDeleted={setDeleted} spotId={spotId} />}
        />
      </div>
    )
  }

  const createNewSpotButton = () => {
    return (
      <div className="create-new-spot-button-container">
        <h3>Manage Your Spots</h3>
        <NavLink style={{ textDecoration: "none", cursor: "pointer" }} exact to="/spots/new">
          <button className="create-new-spot-button">Create New Spot</button>
        </NavLink>
      </div>
    )

  }

  // console.log(spots)

  const spotCardCreater = Object.values(spots).map(spot => {
    // console.log(spot)
    return (
      <div className="spot-card">
         <div key={spot.id}>
        {/* Need to wrap the image in a link tag so that it is a clickable image */}
        {/* <div title={`${spot.name}`}></div> */}
        <div title={`${spot.name}`} >

          <Link exact to={`/spots/${spot.id}`}>
            <img
              className="spot-image"
              src={spot.previewUrl?.url}
              alt={`${spot.name}`}>
            </img>
          </Link>

        </div>



        <div className="spot-data-container">
          <div className="first-row">
            <p>{spot.city},{spot.state}</p>
            <p>
              <i className="fa-solid fa-star empty"></i>
              {spot.averageStars?.toFixed(2) || "New"}
            </p>
          </div>

          <div className="second-row">
            <p className="price-per-night"><span className="price-span"style={{ fontWeight: "bold" }}>${spot.price}</span>/night</p>
          </div>
        </div>

        {managing && updateAndDeleteButts(spot.id)}

      </div>
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
