"use client"
import { useState } from "react"

export default function StarRating() {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
  
    return (

        <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    )
}

