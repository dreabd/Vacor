const SpotComponent = ({ singleSpot }) => {
  const owner = singleSpot.Owner
  const images = singleSpot.SpotImages

  function checkForImages(images) {
    if (!images) {
      return (null)
    }
    else {
      const urlArr = []

      for (let i = 0; i < 5; i++) {
        if (images[i]) urlArr.push(images[i].url)
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
    <div className="single-spot-container">
      <div className="header-container">
        <h2>{singleSpot.name}</h2>
        <p>{singleSpot.city} {singleSpot.state}, {singleSpot.country}</p>
      </div>

      {checkForImages(images)}


      <div className="description-and-price-container">
        <div className="desription-conatiner">
          <h2 className="host-text"> Hosted By {singleSpot.Owner && singleSpot.Owner.firstName} {singleSpot.Owner && singleSpot.Owner.lastName} </h2>
          <p>{singleSpot.description}</p>
        </div>
        <div className="price-container">

          <div className="price-container-top">
            <p className="price-per-night">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>${singleSpot.price}</span>/night
            </p>
            <div className="stars-review-num">
              <p>
                <i className="fa fa-star empty"></i>
                {singleSpot.averageStars?.toFixed(2)}
              </p>
              {/* {singleSpot.numReviews && ""} */}
              <p>
                {singleSpot.numReviews ? singleSpot.numReviews == 1 ? `· #${singleSpot.numReviews} review` : `· #${singleSpot.numReviews} reviews` : "New"}
              </p>
            </div>
          </div>

          <div className="price-container-bot">
            <button
              className="reserve-button"
              onClick={e => alert("Feature Coming Soon")}>
              Reserve
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default SpotComponent
