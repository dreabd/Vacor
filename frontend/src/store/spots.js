// For when we have to make a call that requires authentication
import { csrfFetch } from "./csrf";

// -----------------Normalizing Data Function------------------
const normalize = (data) => {
  let flatData = {}
  data.forEach(datum => {
    flatData[`${datum.id}`] = datum
  })
  return flatData
}



// -----------------Type Variables------------------
const GET_ALL_SPOTS = "spots/getAllSpots"
const GET_SPOT = "spots/getSpot"
const GET_CURRENT_USER_SPOTS = "spots/getUserSpots"



// -----------------Action Creators------------------
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot
  }
}

const getUserSpots = (spots) =>{
  return{
    type: GET_CURRENT_USER_SPOTS,
    spots
  }
}

// -----------------Thunk Action Creators------------------
export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    dispatch(getAllSpots(normalize(data.Spots)))
    return data
  } else{
    const err = await res.json()
    return err
  }
}

export const thunkGetSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(getSpot(data))
    return data
  } else{
    const err = await res.json()
    return err
  }
}

export const thunkGetUserSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const data = await res.json()
    dispatch(getUserSpots(normalize(data.Spots)))
    return data
  } else{
    const err = await res.json()
    return err
  }
}


// -----------------Initial State------------------
const initialState = { allSpots: {}, singleSpot: {} }


// -----------------Reducer------------------
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: { ...action.spots } };
    case GET_CURRENT_USER_SPOTS:
      return { ...state, allSpots: { ...action.spots } };
    case GET_SPOT:
      return {...state, singleSpot:{...action.spot}}
    default:
      return state
  }
}

export default spotsReducer
