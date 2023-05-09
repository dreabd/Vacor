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

const POST_NEW_SPOT = "spots/postNewSpot"
const POST_SPOT_IMAGE = "spots/postSpotImage"
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

const getUserSpots = (spots) => {
  return {
    type: GET_CURRENT_USER_SPOTS,
    spots
  }
}

const postNewSpot = (newSpot) => {
  return {
    type: POST_NEW_SPOT,
    newSpot
  }
}

const postSpotImage = (spotImage,spotId) => {
  return {
    type: POST_NEW_SPOT,
    spotImage,
    spotId
  }
}
// -----------------Thunk Action Creators------------------
export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    dispatch(getAllSpots(normalize(data.Spots)))
    return data
  } else {
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
  } else {
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
  } else {
    const err = await res.json()
    return err
  }
}

export const thunkPostNewSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: "POST",
    body: JSON.stringify(newSpot)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(postNewSpot(data))
    return data
  } else {
    const err = await res.json()
    return err
  }
}

export const thunkPostSpotImage = (spotId, spotImage) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(spotImage)
  })

  if (res.ok) {
    console.log("I am in post spot image")
    const data = await res.json()
    dispatch(postSpotImage(data,spotId))
    return data.id
  } else {
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
      return { ...state, singleSpot: { ...action.spot } }
    case POST_NEW_SPOT:
      return {...state, singleSpot:{...action.newSpot}}
      case POST_SPOT_IMAGE:
        return {...state,SpotImages:[...state.singleSpot.SpotImages,action.spotImage]}
    default:
      return state
  }
}

export default spotsReducer
