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
const GET_SPOT_REVIEWS = "reviews/getSpotReviews"

// -----------------Action Creators------------------
const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews
  }
}

// -----------------Thunk Action Creators------------------
export const thunkGetSpotReviews = (spotId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(res.ok){
    const data = await res.json()
    dispatch(getSpotReviews(normalize(data)))
    return data
  }
}


// -----------------Intial State------------------
const initialState = { spot: {}, user: {} }

// -----------------Reducer------------------
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return {...state, spot:{...action.reviews}}
    default:
      return state
  }
}

export default reviewsReducer
