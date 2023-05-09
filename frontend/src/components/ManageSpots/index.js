import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetUserSpots } from '../../store/spots';
import SpotCards from '../SpotCards';


const ManageSpots = () => {
  const dispatch = useDispatch()
  const [managing,setManaging] = useState(false)

  const spots = useSelector(state => state.spots.allSpots)

  useEffect(() => {
    dispatch(thunkGetUserSpots())
    setManaging(true)
  }, [dispatch])

  return (
      <SpotCards setManaging={setManaging} managing={managing}spots={spots}/>
  )
}

export default ManageSpots
