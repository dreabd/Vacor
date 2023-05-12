import { useEffect, useState } from "react";

const StarRating = ({ stars,onChange }) => {
  const [starRating, setStarRating] = useState(stars)

  const starIcon = (number) => {
    const props = {};
    props.onMouseEnter = () => setStarRating(number);
    props.onMouseLeave = () => setStarRating(stars);
    props.onClick = () => onChange(number);

    return (
      <div key={number} {...props}>
        {starRating >= number ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
      </div>
    )
  }
  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map(number => starIcon(number))}
    </div>
  )
};

export default StarRating;
