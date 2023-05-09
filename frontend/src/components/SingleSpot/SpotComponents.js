import { useTransition } from "react"

const SpotComponent = (SpotData) => {
  const owner = SpotData.Owner
  const images = SpotData.SpotImages

  function checkForImages(images) {
    if (!images) {
      return (null)
    }
    else {
      const urlArr = []

      for(let i = 0; i < 5; i++){
        if(images[i]) urlArr.push(images[i].url)
        else urlArr.push("https://s7200.pcdn.co/wp-content/uploads/2021/02/property-placeholder-1.jpg")
      }


      return (
        <div className="single-spot-image-container">

          <div className="single-spot-main-image">
            <img className="mainImage" src={`${urlArr[0]}`} alt="image1" />
          </div>

          <div className="single-spot-other-images">
            <img
              src={`${urlArr[1]}`}
              alt="image2"
            />
            <img
              src={`${urlArr[2]}`}
              alt="image3"
            />
            <img
              src={`${urlArr[3]}`}
              alt="image4"
            />
            <img
              src={`${urlArr[4]}`}
              alt="image5"
            />
          </div>

        </div>
      )
    }
  }


  return (
    <div className="single-spot-contianer">
      <h2>{SpotData.name}</h2>
      <p>{SpotData.city} {SpotData.state}, {SpotData.country}</p>

      {checkForImages(images)}

      <h1> Hosted By {SpotData.Owner && SpotData.Owner.firstName} {SpotData.Owner && SpotData.Owner.lastName} </h1>

      <div className="description-and-price-container">
        <div className="desription-conatiner">
          <p>{SpotData.description}</p>
        </div>
        <div className="price-container">

          <div className="price-container-top">
            <p>
              <span className="price-span">{SpotData.price}</span>/night
            </p>
            <p>
              <i className="fa fa-star empty"></i>
              {SpotData.averageStars}
            </p>
            <p>
              {SpotData.numReviews ? SpotData.numReviews:"New"}
            </p>
          </div>

          <div className="price-container-bot">
            <button className="reserve-button">
              Reserve
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default SpotComponent
