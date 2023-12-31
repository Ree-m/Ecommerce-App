import DeleteCartItem from "@/app/Components/Cart/DeleteCartItem"
import { CartItemInterface } from "@/app/api/cart/[id]/route";
import UpdateCartItem from "@/app/Components/Cart/UpdateCartItem";
import OrderSummaryPanel from "@/app/Components/Checkout/OrderSummaryPanel";
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

export default async function OrderSummaryPage({ params }: { params: { id: string } }) {
  const userId = params.id
  const cartItems = await fetchCartItemsOfAUser(userId)
  const data = await fetchUserData(userId)
  const userData = data[0]
  const totalPrice=   cartItems&&cartItems[0].items.reduce((acc:number,item:CartItemInterface)=>acc+item.price*item.quantity,0)
  // const totalItems= cartItems&&cartItems[0].items.length
  const totalItems = cartItems && cartItems[0].items.reduce((acc: number, item: CartItemInterface) => acc + item.quantity, 0);

  console.log("userdata", userData)
  console.log("checkout inside", cartItems[0].items)
  return (
    <div>
      <h1>Order Summary Page</h1>

      <div>
        {cartItems && cartItems[0].items && cartItems[0].items.map((item: CartItemInterface, index: number) => (
          <div key={index}>
            <p>{item.name}</p>
            <UpdateCartItem userId={userId} itemId={item.itemId} quantity={1} sign={"+"} />
            <p>{item.quantity}</p>
            <UpdateCartItem userId={userId} itemId={item.itemId} quantity={-1} sign={"-"} />
            <DeleteCartItem userId={userId} itemId={item.itemId} />
          </div>
        ))}
      </div>

      {/* the order summary panel */}
      <OrderSummaryPanel userData={userData} totalPrice={totalPrice} totalItems={totalItems}/>

    </div>
  )
}
