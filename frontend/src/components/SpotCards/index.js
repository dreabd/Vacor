import { NavLink, Link } from "react-router-dom";
import React from "react";
import "./spot-card.css";

function SpotCards({ spots }) {
  // console.log("These are all the spots in spot cards:", Object.values(spots))
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
              <i className="fa-solid fa-star"></i>
              {spot.averageStars}
            </p>
          </div>

          <div className="second-row">
            <p className="price-per-night">{spot.price}/night</p>
          </div>
        </div>

      </div>

    )
  })

  return (
    <>
      <div className="spot-image-container">
        {spotCardCreater}
      </div>
    </>
  )
}

export default SpotCards
