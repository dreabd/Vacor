import { NavLink } from "react-router-dom";
import React from "react";

function SpotCards({ spots }) {
  console.log("These are all the spots in spot cards:",Object.values(spots))
  const spotCardCreater = Object.values(spots).map(spot => {
    console.log(spot)
    return (
      <>
        <img src={spot.previewUrl} alt="" />
        <h1></h1>
      </>

    )
  })

  return (
    <>
      <h1>This is the Spot Card</h1>
      {spotCardCreater}
    </>
  )
}

export default SpotCards
