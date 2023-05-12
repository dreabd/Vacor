import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewForm from "../ReviewForm";
import DeleteForm from "../DeleteForm";


function ReivewComponent({/*setUpdated,*/avgStars, spotReviews, loggedIn, spotId, isOwner, setDeleted }) {

  const reviewers = []

  const editReviewButton = (userId, reviewId) => {
    if (loggedIn?.id === userId) {
      return (
        <button className="delete-modal-button">
          <OpenModalMenuItem
            itemText="Delete"
            modalComponent={<DeleteForm setDeleted={setDeleted} userId={userId} reviewId={reviewId} />}
          />
        </button>
      )
    } return (null)
  }

  const reviews = spotReviews.map(review => {
    // console.log(review)

    reviewers.push(review.userId)
    // if they reviewed already so if they are loggedin
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const convertedTime = new Date(review.createdAt).toLocaleDateString('en-US', options)

    return (
      <div className="review-container">
        <div className="user-container">
          <h3 className="user-name">{review?.User?.firstName} {review?.User?.lastName}</h3>
        </div>

        <div className="created-at-container">
          <p className="created-at">{review?.createdAt ? convertedTime : null}</p>
        </div>


        <div className="review-text-container">
          <p className="review-text">{review.review}</p>
        </div>

        {editReviewButton(review.userId, review.id)}
      </div>
    )
  })

  function checksForReviewButton() {
    if (!loggedIn) return null
    if (loggedIn && !isOwner && !reviewers.includes(loggedIn.id)) {
      return (
        <button className="post-modal-button">
          <OpenModalMenuItem
            itemText="Post Your Review"
            // onItemClick={closeMenu}
            spotId={spotId}
            modalComponent={<ReviewForm /*setUpdated={setUpdated}*/
              className="modal-button" spotId={spotId} />}
          />
        </button>
      )
    } return (<p>Be the first person to post a review!</p>)
  }

  return (
    <div className="spot-reviews-container">
      <div className="star-review-num-post-review-container">
        <div className="spot-star-review-container">
          <i className="fa-solid fa-star"></i>
          {/* <p>{spotReviews.length || "New"}</p> */}
          <p>
            {avgStars ? avgStars : 0}
          </p>
          <p>
            {spotReviews.length ? spotReviews.length == 1 ? `· ${spotReviews.length} Review` : `· ${spotReviews.length} Reviews` : "New"}
          </p>
        </div>
        <div >
          {checksForReviewButton()}
        </div>
      </div>
      {reviews}
    </div>
  )
}

export default ReivewComponent
