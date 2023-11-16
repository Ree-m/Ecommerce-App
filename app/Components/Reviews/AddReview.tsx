"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
// import { FaStar } from "react-icons/fa";
// import StarRating from "./StarRating"

export default function AddReview() {
  const [message, setMessage] = useState<string>("")
  const [restaurant, setRestaurant] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<number | undefined>(undefined)
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const router = useRouter()

  async function addReview() {
    console.log("review values", message, rating)
    const response = await fetch(`http://localhost:3000/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        restaurant,
        name,
        phone,
        rating
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    const responseData = await response.json()
    if (responseData.message === 'Review added') {
      console.log("Review added")
      router.refresh()
    }
  }

  return (
    <div>
      <h3>Add Review</h3>

      <label>Rating:</label>
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

      <form onSubmit={addReview}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
        <input type="text" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} placeholder="Choose restaurant" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={phone} onChange={(e) => setPhone(+e.target.value)} placeholder="Phone" />
        <button>Leave a review  </button>


      </form>
    </div>
  )
}

