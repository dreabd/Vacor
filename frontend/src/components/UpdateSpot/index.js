import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useDispatch,useSelector } from "react-redux"
import { useEffect, useState } from "react"

import SpotForm from "../SpotsForm"
import { thunkGetSpot } from "../../store/spots"


const UpdateSpot = ()=>{
  // ----- State Variable -----
  const [update,setUpdate] = useState(false)

  const {spotId} = useParams()

  // ------ Use Selectors -----
  const singleSpot = useSelector(state => state.spots.singleSpot)

  // ------ Dispatches ------
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkGetSpot(spotId))
    setUpdate(true)
  }, [dispatch, spotId])

  // ----- Props
  const props={
    singleSpot,
    spotId,
    update
  }

  // console.log(props)
  if(!Object.values(singleSpot).length) return null
  return(
    <div>
      <h1>I will update you {spotId} </h1>
      <SpotForm {...props}/>
    </div>
  )
}


export default UpdateSpot
