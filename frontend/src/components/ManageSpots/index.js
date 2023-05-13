import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetUserSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const ManageSpots = () => {
  const dispatch = useDispatch()
  const [managing,setManaging] = useState(false)
  const [deleted,setDeleted] = useState(false)

  const spots = useSelector(state => state.spots.allSpots)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetUserSpots())
    setManaging(true)
    setDeleted(false)
  }, [deleted,dispatch])

  if(!user?.id) return <Redirect to="/" />
  return (
      <SpotCards setDeleted={setDeleted} setManaging={setManaging} managing={managing}spots={spots}/>
  )
}

export default ManageSpots
