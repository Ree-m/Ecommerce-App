import DeleteCartItem from "@/app/Components/Cart/DeleteCartItem"
import { CartItemInterface } from "@/app/api/cart/[id]/route";
import UpdateCartItem from "@/app/Components/Cart/UpdateCartItem";
import AddressPanel from "@/app/Components/Checkout/AddressPanel";

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

export default async function CheckOutPage({ params }: { params: { id: string } }) {
  const userId = params.id
  const cartItems = await fetchCartItemsOfAUser(userId)
  const data = await fetchUserData(userId)
  const userData = data[0]
  const totalPrice=   cartItems&&cartItems[0].items.reduce((acc:number,item:CartItemInterface)=>acc+item.price*item.quantity,0)

  console.log("userdata", userData)
  console.log("checkout inside", cartItems[0].items)
  return (
    <div>
      <h1>Checkout Page</h1>

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

      {/* the address panel */}
      <AddressPanel userData={userData} totalPrice={totalPrice}/>
    </div>
  )
}
