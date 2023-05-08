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
      <SpotCards spots={spots}/>
  )
}

export default LandingPage
