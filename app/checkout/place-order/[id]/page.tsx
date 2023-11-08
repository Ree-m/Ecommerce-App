import PlaceOrderPanel from "@/app/Components/Checkout/PlaceOrderPanel"
import { CartItemInterface } from "@/app/api/cart/[id]/route"
async function fetchCartItemsOfAUser(userId: string) {

  const response = await fetch(`http://localhost:3000/api/cart/${userId}`,
    {
      cache: 'no-cache',
      next: { revalidate: 0 }
    }
  )
  const data = await response.json()
  return data
}

async function fetchUserData(userId: string) {
  const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json()

  return data
}

export default async function PaymentPage({ params }: { params: { id: string } }) {
    const userId = params.id
    const cartItems = await fetchCartItemsOfAUser(userId)
    const data = await fetchUserData(userId)
    const userData = data[0]
    const totalPrice=   cartItems&&cartItems[0].items.reduce((acc:number,item:CartItemInterface)=>acc+item.price*item.quantity,0)
  return (
    <div>
      <h1>Payment Page</h1>

     <PlaceOrderPanel totalPrice={totalPrice} cartItems={cartItems}/>

    </div>
  )
}
