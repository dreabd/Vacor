import { useModal } from "../../context/Modal";
import "./ReviewForm.css"

function ReviewForm() {
  const { closeModal } = useModal();

  return (
    <form className="new-review-container">
      <h3>How was your stay</h3>
      <textarea
        className="new-review-input"
        id="" cols="30"
        rows="10"
        placeholder="Leave your review here"
      ></textarea>

      <button className="submit-reivew-button">Submit Your Review!</button>
    </form>

  )
}

export default ReviewForm
