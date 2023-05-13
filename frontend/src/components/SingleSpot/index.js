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
  const [deleted,setDeleted] = useState(false)
  // const [updated,setUpdated] = useState(false)

  const loggedIn = useSelector(state => state.session.user)
  const singleSpot = useSelector(state => state.spots.singleSpot)
  const spotReviewsSlice = useSelector(state => state.reviews.spot)
  const spotReviews = Object.values(spotReviewsSlice).reverse()

  const avgStars = singleSpot.averageStars?.toFixed(2)
  // console.log(avgStars)
  const isOwner = loggedIn?.id === singleSpot?.Owner?.id


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkGetSpot(spotId))
    dispatch(thunkGetSpotReviews(spotId))
    setDeleted(false)
    // setUpdated(false)

  }, [dispatch, spotId,deleted/*,updated*/])

  const reviewProps ={
    spotReviews,
    loggedIn,
    spotId,
    isOwner,
    setDeleted,
    avgStars
    // setUpdated
  }

  // console.log("This is the spot reviews in the spot details component",spotReviews)
  const spotProps= {
    singleSpot,
    isOwner
  }


  return (
    <>
      <SpotComponent {...spotProps}/>
      <ReivewComponent {...reviewProps}/>
    </>
  )
}

export default SingleSpot
