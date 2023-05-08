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


// -----------------Intial State------------------
const initialState = { allSpots: {}, singleSpot: {} }


// -----------------Reducer------------------
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: { ...action.spots } };
    case GET_SPOT:
      return {...state,singleSpot:{...action.spot}}
    default:
      return state
  }
}

export default reviewsReducer
