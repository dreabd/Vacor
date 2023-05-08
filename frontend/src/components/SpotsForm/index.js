import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SpotForm.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



const SpotForm = () => {
  const loggedIn = useSelector(state => state.session.user)
  const ownerId = loggedIn.id
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [descpt, setDescpt] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [photos, setPhotos] = useState([])
  const [preview, setPreview] = useState("")
  const [validationErrors, setValidationErrors] = useState({})

  const onSubmit = e => {
    e.preventDefault();
    const newSpot = {
      country,
      address,
      city,
      state,
      lattitude: Math.random() * 180,
      longitude: Math.random() * 180,
      description: descpt,
      name,
      price,
      ownerId
    }

    const SpotImages = []
    photos.forEach(photo => {
      const spotImg = {
        url: photo,
        preview: false,
      }
      SpotImages.push(spotImg)
    })

    console.log({ SpotImages })

    // Reseting the inputs
    setCountry("")
    setAddress("")
    setCity("")
    setState("")
    setDescpt("")
    setName("")
    setPrice("")
    setPhotos([])
    setPreview("")
    setValidationErrors({})

  }

  if (!loggedIn) return <Redirect to="/" />

  return (
    <div className="create-new-spot-container">

      <form onSubmit={onSubmit} className="new-spot-form">

        <div className="location-info-container">
          <h2> Create a new Spot</h2>
          <h4> Where's your place located </h4>
          <p> Guest will only get your exact address once they booked a reservation</p>
          <label className="new-spot-input-container" htmlFor="">
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
          </label>
          <label className="new-spot-input-container" htmlFor="">
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="new-spot-input-container" htmlFor="">
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="new-spot-input-container" htmlFor="">
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>

        <div className="set-name-container">
          <h4>Create a title for your spot</h4>
          <p>Catch guests' attention with a spot title that highlights what make your place special</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
        </div>

        <div className="set-description-container">
          <h4>Describe you place to guests</h4>
          <p>Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood. </p>
          <textarea
            type="textarea"
            placeholder="description"
            rows="5"
            cols="33"
            value={descpt}
            onChange={(e) => setDescpt(e.target.value)}
          ></textarea>
        </div>

        <div className="set-price-container">
          <h4>Set a base price for your spot</h4>
          <p>Competitive pricing can help your listing stand out and rank higher
            in search results.</p>
          <span>$ </span>
          <input
            placeholder="Price Per Night(USD)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="set-spot-images-container">
          <h4>Liven up your spot with photos</h4>
          <p>Submit a link to at least one photo to public to your spot</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={preview}
            onChange={e => setPreview(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={photos}
            onChange={e => setPhotos([...photos, e.target.value])}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={photos}
            onChange={e => setPhotos([...photos, e.target.value])}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={photos}
            onChange={e => setPhotos([...photos, e.target.value])}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={photos}
            onChange={e => setPhotos([...photos, e.target.value])}
          />
        </div>


        <button type="submit">Create</button>


      </form>
    </div>
  )
}


export default SpotForm
