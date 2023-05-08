import { Link } from "react-router-dom";

function ReivewComponent(spotReviews, loggedIn) {



  const reviews = spotReviews.map(review => {

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const convertedTime = new Date(review.createdAt).toLocaleDateString('en-US', options)

    return (
      <div className="review-container">
        <div className="user-container">
          <h3 className="user-name">{review.User.firstName} {review.User.lastName}</h3>
        </div>

        <div className="created-at-container">
          <p className="created-at">{convertedTime}</p>
        </div>

        <div className="review-text-container">
          <p className="review-text">{review.review}</p>
        </div>
      </div>
    )
  })

  return (
    <div className="spot-reviews-container">
      <div className="star-review-num-post-review-container">
        <i className="fa-solid fa-star"></i>
        <p>{spotReviews.length}</p>
        {loggedIn ? <button> Create new Review</button> : null}
      </div>
      {reviews}
    </div>
  )
}

export default ReivewComponent
