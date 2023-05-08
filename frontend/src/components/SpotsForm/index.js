import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SpotForm.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



const SpotForm = () => {
  const loggedIn = useSelector(state => state.session.user)
  const ownerId = loggedIn?.id
  const dispatch = useDispatch()

  // ------- State Variables -------
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const [descpt, setDescpt] = useState("")

  const [name, setName] = useState("")

  const [price, setPrice] = useState("")

  const [preview, setPreview] = useState("")

  const [photo1, setPhoto1] = useState("")
  const [photo2, setPhoto2] = useState("")
  const [photo3, setPhoto3] = useState("")
  const [photo4, setPhoto4] = useState("")

  const [validationErrors, setValidationErrors] = useState({})
  const [submit, setSubmitted] = useState(false)

  // ------- Checking if its new Spot is valid -------
  useEffect(() => {
    const err = {}

    if (!country.length) err["country"] = "Country is requred"
    if (!address.length) err["address"] = "Address is requred"
    if (!state.length) err["state"] = "State is requred"
    if (!city.length) err["city"] = "City is requred"

    if (descpt.length < 30) err["description"] = "Description needs a minimum of 30 characters"
    if (!name.length) err["name"] = "Name is required"

    if (!price.length) err["price"] = "Price is required"
    if (parseInt(price) < 0) err["price"] = "Please provide a valid price"

    const validURL = [".png", ".jpg", ".jpeg"]
    if (!preview.length) err["preview"] = "Preview is required"
    if (!validURL.includes(preview.substring(preview.length - 5))) err["previewImage"] = "Image URL must end in .png, .jpg, or .jpeg"
    if (photo1.length && !validURL.includes(photo1.substring(photo1.length - 5))) err["Image"] = "Image URL must end in .png, .jpg, or .jpeg"
    if (photo2.length && !validURL.includes(photo2.substring(photo2.length - 5))) err["Image"] = "Image URL must end in .png, .jpg, or .jpeg"
    if (photo3.length && !validURL.includes(photo3.substring(photo3.length - 5))) err["Image"] = "Image URL must end in .png, .jpg, or .jpeg"
    if (photo4.length && !validURL.includes(photo4.substring(photo4.length - 5))) err["Image"] = "Image URL must end in .png, .jpg, or .jpeg"

    console.log(err)
    setValidationErrors(err)

  }, [country, address, city, state, descpt, name, price, preview, photo1, photo2, photo3, photo4])

  // ---------Submit Functionality--------
  const onSubmit = e => {
    e.preventDefault();
    setSubmitted(true)

    if (Object.values(validationErrors).length) return validationErrors

    // ------- For Posting the Spot Images -------
    const spotImages = []

    spotImages.push({ url: preview, preview: true })

    if (photo1) spotImages.push({ url: photo1, preview: false })
    if (photo2) spotImages.push({ url: photo2, preview: false })
    if (photo3) spotImages.push({ url: photo3, preview: false })
    if (photo4) spotImages.push({ url: photo4, preview: false })

    // ------- For Posting the new Spot -------
    const newSpot = {
      address,
      city,
      state,
      country,
      lattitude: Math.random() * 180,
      longitude: Math.random() * 180,
      name,
      description: descpt,
      price,
      ownerId
    }

    // ------ Dispatching all the thunks that need be dispatched ------
    // Thunk for creating a new spot
    // ---- pass in the newspot for the thunk
    // ---- need to return the id of the new spot

    // Thunk for adding all the images
    // --- Most likely will use a loop over the spotimages and dispatch all of those requests

    // if there are errors then set validation errors to thsoe errors



    // -------Reseting the inputs-------
    setCountry("")
    setAddress("")
    setCity("")
    setState("")
    setDescpt("")
    setName("")
    setPrice("")

    setPhoto1("")
    setPhoto2("")
    setPhoto3("")
    setPhoto4("")

    setPreview("")
    setValidationErrors({})
    setSubmitted(false)

    // ------------IF THERE ARE NO ERRS ANYWHERE Redirect to New Spot-------------

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
            <span>
              Country {submit && validationErrors.country && <p className="errors">{validationErrors.country}</p>}
            </span>

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
          </label>
          <label className="new-spot-input-container" htmlFor="">

            <span>
              Street Address {submit && validationErrors.address && <p className="errors">{validationErrors.address}</p>}
            </span>
            <input
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label className="new-spot-input-container" htmlFor="">
            <span>
              City {submit && validationErrors.city && <p className="errors">{validationErrors.city}</p>}
            </span>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="new-spot-input-container" htmlFor="">
            <span>
              State {submit && validationErrors.state && <p className="errors">{validationErrors.state}</p>}
            </span>
            <input
              type="text"
              placeholder="State"
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
          {submit && validationErrors.name && <p className="errors">{validationErrors.name}</p>}
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
          {submit && validationErrors.description && <p className="errors">{validationErrors.description}</p>}

        </div>

        <div className="set-price-container">
          <h4>Set a base price for your spot</h4>
          <p>Competitive pricing can help your listing stand out and rank higher
            in search results.</p>

          {submit && validationErrors.price && <p className="errors">{validationErrors.price}</p>}
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

          <label htmlFor="">
            {submit && validationErrors.preview && <p className="errors">{validationErrors.preview}</p>}
            {submit && validationErrors.previewImage && <p className="errors">{validationErrors.previewImage}</p>}
            <input
              type="text"
              placeholder="Preview Image URL"
              value={preview}
              onChange={e => setPreview(e.target.value)}
            />
          </label>

          {submit && validationErrors.Image && <p className="errors">{validationErrors.Image}</p>}
          <input
            type="text"
            placeholder="Image URL"
            value={photo1}
            onChange={e => setPhoto1(e.target.value)}
          />

          {submit && validationErrors.Image && <p className="errors">{validationErrors.Image}</p>}
          <input
            type="text"
            placeholder="Image URL"
            value={photo2}
            onChange={e => setPhoto2(e.target.value)}
          />

          {submit && validationErrors.Image && <p className="errors">{validationErrors.Image}</p>}
          <input
            type="text"
            placeholder="Image URL"
            value={photo3}
            onChange={e => setPhoto3(e.target.value)}
          />

          {submit && validationErrors.Image && <p className="errors">{validationErrors.preview}</p>}
          <input
            type="text"
            placeholder="Image URL"
            value={photo4}
            onChange={e => setPhoto4(e.target.value)}
          />
        </div>


        <button type="submit">Create</button>


      </form>
    </div>
  )
}


export default SpotForm
