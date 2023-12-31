import DeleteCartItem from "@/app/Components/Cart/DeleteCartItem"
import { CartItemInterface } from "@/app/api/cart/[id]/route";
import UpdateCartItem from "@/app/Components/Cart/UpdateCartItem";
import Link from "next/link";

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
export default async function CartPage({ params }: { params: { id: string } }) {
  const userId = params.id
  const cartItems = await fetchCartItemsOfAUser(userId)
  // console.log("cartItems inside", cartItems[0].items)
  return (
    <div>
      <h1>Your cart</h1>

      <div>
        {cartItems && cartItems[0].items && cartItems[0].items.map((item: CartItemInterface, index: number) => (
          <div key={index}>
            <p>{item.name}</p>
            <UpdateCartItem userId={userId} itemId={item.itemId} quantity={1} sign={"+"} />
            <p>{item.quantity}</p>
            <UpdateCartItem userId={userId} itemId={item.itemId} quantity={-1} sign={"-"} />
            <DeleteCartItem userId={userId} itemId={item.itemId} />
            <p>Price:{item.price * item.quantity}</p>
          </div>
        ))}
                    <p>Total price:{cartItems&&cartItems[0].items.reduce((acc:number,item:CartItemInterface)=>acc+item.price*item.quantity,0)}</p>

      </div>
      <Link href={`/checkout/address/${userId}`}>Check out</Link>
    </div>
  )
}
