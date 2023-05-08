import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllSpots } from '../../store/spots';
import SpotCards from '../SpotCards';


function LandingPage() {
  const dispatch = useDispatch()

  const spots = useSelector(state => state.spots.allSpots)

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch])

  return (
    <>
      <h1>I am Part of the Landing Page</h1>
      <SpotCards spots={spots}/>
    </>
  )
}

export default LandingPage
