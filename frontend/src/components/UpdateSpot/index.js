import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import SpotForm from "../SpotsForm"
import { thunkGetSpot } from "../../store/spots"


const UpdateSpot = () => {
  // ----- State Variable -----
  const [update, setUpdate] = useState(false)

  const { spotId } = useParams()

  // console.log(spotId)

  // ------ Use Selectors -----
  const singleSpot = useSelector(state => state.spots.singleSpot)

  // ------ Dispatches ------
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("I am dispatching ")
    dispatch(thunkGetSpot(spotId))
      .then(setUpdate(true))

  }, [dispatch, spotId])

  // ----- Props
  const props = {
    singleSpot,
    spotId,
    update
  }

  console.log("This is the spot inside fo update spot route",singleSpot)

  // console.log(props)
  if (singleSpot.id != spotId) return null
  return (
    <div>
      <h1>I will update you {spotId} </h1>
      <SpotForm {...props} />
    </div>
  )
}


export default UpdateSpot
