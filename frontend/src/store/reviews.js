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

const POST_REVIEW = 'reviews/postSpotReview'

const DELETE_REVIEW = "reiviews/deleteSpotReview"


// -----------------Action Creators------------------
const getSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews
  }
}

const postNewReview = newReview =>{
  return{
    type: POST_REVIEW,
    newReview
  }
}

const deleteSpotReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
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

export const thunkPostNewReview = (spotId,newReview) => async (dispatch) =>{
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
    body: JSON.stringify(newReview)
  })

  if(res.ok){
    const data = await res.json()
    dispatch(postNewReview(data))
    return data
  } else{
    const errors = await res.json()
    return errors
  }
}

export const thunkDeleteSpotReview = (reviewId) => async (dispatch) =>{
  const res = await csrfFetch(`/api/reviews/${reviewId}`,{
    method: "DELETE"
  })

  if(res.ok) dispatch(deleteSpotReview(reviewId))
}



// -----------------Intial State------------------
const initialState = { spot: {}, user: {} }

// -----------------Reducer------------------
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return {...state, spot:{...action.reviews}}
      case POST_REVIEW:
        const id = action.newReview.id
        const spotState = {...state.spot}
        spotState[id] = {...action.newReview}
        return {...state,spot:spotState}
      case DELETE_REVIEW:
        let newState ={...state}
        delete newState.spot[action.reviewId]
        return newState
    default:
      return state
  }
}

export default reviewsReducer
