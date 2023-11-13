import { ReviewInterface } from "../../api/review/route"
async function fetchReviews() {

    const response = await fetch(`http://localhost:3000/api/review`,
        {
            cache: 'no-cache',
        }
    )
    const data = await response.json()
    return data
}
export default async function Reviews() {
    const reviews: ReviewInterface[] = await fetchReviews()
    return (
        <div>
            <h3>The reviews</h3>
            {reviews && reviews.map((review:ReviewInterface,index:number)=>(
                <div key={index}>
                    <p>{review.message}</p>
                    <p>{review.restaurant}</p>
                </div>
            ))}
        </div>
    )
}
