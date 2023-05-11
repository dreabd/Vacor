import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewForm from "../ReviewForm";
import DeleteForm from "../DeleteForm";


function ReivewComponent({/*setUpdated,*/spotReviews, loggedIn, spotId, isOwner, setDeleted }) {

  const reviewers = []



  const editReviewButton = (userId, reviewId) => {
    if (loggedIn?.id === userId) {
      return (
        <OpenModalMenuItem
          itemText="Delete"
          modalComponent={<DeleteForm className="modal-button" setDeleted={setDeleted} userId={userId} reviewId={reviewId} />}
        />
      )
    } return (null)
  }

  console.log("Reversed", spotReviews.toReversed())
  console.log("Regular", spotReviews)
  console.log(spotReviews.reverse() === spotReviews)


  const reviews = []
  spotReviews.forEach(review => {
    reviewers.push(review.userId)

    // if they reviewed already so if they are loggedin
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const convertedTime = new Date(review.createdAt).toLocaleDateString('en-US', options)

    const component = (
      <div className="review-container">
        <div className="user-container">
          <h4 className="user-name">{review?.User?.firstName} {review?.User?.lastName}</h4>
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

    reviews.unshift(component)
  })


  // const reviews = spotReviews.map(review => {
  //   // console.log(review)

  //   reviewers.push(review.userId)
  //   // if they reviewed already so if they are loggedin
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };

  //   const convertedTime = new Date(review.createdAt).toLocaleDateString('en-US', options)

  //   return (
  //     <div className="review-container">
  //       <div className="user-container">
  //         <h3 className="user-name">{review?.User?.firstName} {review?.User?.lastName}</h3>
  //       </div>

  //       <div className="created-at-container">
  //         <p className="created-at">{review?.createdAt ? convertedTime : null}</p>
  //       </div>


  //       <div className="review-text-container">
  //         <p className="review-text">{review.review}</p>
  //       </div>

  //       {editReviewButton(review.userId, review.id)}
  //     </div>
  //   )
  // })


  function checksForReviewButton() {
    if(!loggedIn) return null
    if (loggedIn && !isOwner && !reviewers.includes(loggedIn.id)) {
      return (
        <OpenModalMenuItem
          itemText="Post Your Review"
          // onItemClick={closeMenu}
          spotId={spotId}
          modalComponent={<ReviewForm /*setUpdated={setUpdated}*/
          className="modal-button" spotId={spotId} />}
        />
      )
    } return (<p>Be the first person to post a review!</p>)
  }


  // { loggedIn && isOwner ? <p>Be the first person to post a review!</p> : reviewers.includes(loggedIn.id) ? <p>Sorry You Can Not Review Again</p> : (<NavLink exact to={`/spots/${spotId}/reviews`}><button>Post Your Review</button></NavLink>) }


  return (
    <div className="spot-reviews-container">
      <div className="star-review-num-post-review-container">
        <div className="spot-star-review-container">
          <i className="fa-solid fa-star"></i>
          {/* <p>{spotReviews.length || "New"}</p> */}
          <p>
            {spotReviews.length ? spotReviews.length == 1 ? `#${spotReviews.length} Review` : `#${spotReviews.length} Reviews` : "New"}
          </p>
        </div>
        <div className="modal-button">
          {checksForReviewButton()}
        </div>
      </div>
      {reviews}
    </div>
  )
}

export default ReivewComponent
