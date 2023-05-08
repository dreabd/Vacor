import React from "react";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { thunkGetSpot } from "../../store/spots";



function SingleSpot(){
  // need to check if they are logged in
  const {spotId} = useParams()

  const loggedIn = useSelector(state=> state.session.user)
  const singleSpot = useSelector(state => state.spots.singleSpot)
  const spotReviews = useSelector(state => state.reviews)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(thunkGetSpot(spotId))
  },[dispatch,spotId])


  return(
    <h1></h1>
  )
}

export default SingleSpot
