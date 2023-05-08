import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetSpot } from "../../store/spots";
import { thunkGetSpotReviews } from "../../store/reviews";

import SpotComponent from "./SpotComponents";
import ReivewComponent from "./ReviewComponent";

import "./SingleSpot.css"



function SingleSpot() {
  // need to check if they are logged in
  const { spotId } = useParams()

  const loggedIn = useSelector(state => state.session.user)
  const singleSpot = useSelector(state => state.spots.singleSpot)
  const spotReviews = useSelector(state => Object.values(state.reviews.spot))

  const isOwner = loggedIn?.id === singleSpot?.Owner?.id


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkGetSpot(spotId))
    dispatch(thunkGetSpotReviews(spotId))

  }, [dispatch, spotId])

  return (
    <>
      {SpotComponent(singleSpot,isOwner)}
      {ReivewComponent(spotReviews,loggedIn,spotId,isOwner)}
    </>
  )
}

export default SingleSpot
