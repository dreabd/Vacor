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



// -----------------Action Creators------------------
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
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
  }
}


// -----------------Intial State------------------
const initialState = { allSpots: {}, singleSpot: {} }


// -----------------Reducer------------------
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: { ...action.spots } };
    default:
      return state
  }
}

export default spotsReducer
