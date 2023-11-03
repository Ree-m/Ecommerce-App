async function fetchCartItemsOfAUser(userId: string) {

  const response = await fetch(`http://localhost:3000/api/cart/${userId}`,
    {
      cache: 'no-cache',
      next: { revalidate: 0 }
    }
  )
  const data = await response.json()
  console.log("data", data)
  return data
}
export default async function CartPage({ params }: { params: { userId: string } }) {
  const cartItems = await fetchCartItemsOfAUser(params.userId)
  console.log("cartItems inside", cartItems)
  // http://localhost:3000/api/cart/65443e134dcb1ebea85b5669
  return (
    <div>
      <h1>Your cart</h1>

    </div>
  )
}
