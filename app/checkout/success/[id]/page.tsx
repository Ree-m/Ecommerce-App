import { OrderInterface } from "@/app/api/admin/orders/route";
import { CartItemInterface } from "@/app/api/cart/[id]/route";
import AddressPanel from "@/app/Components/Checkout/AddressPanel";
import CancelOrder from "@/app/Components/Checkout/CancelOrder";

async function fetchUserData(userId: string) {
  const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json()

  return data
}

async function fetchLatestOrderOfAUser(userId: string) {
  console.log("fav userId", userId)
  const response = await fetch(`http://localhost:3000/api/orders/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json()
  return data
}
export default async function CheckoutSuccess({ params }: { params: { id: string } }) {
  const userId = params.id
  const orders = await fetchLatestOrderOfAUser(userId)
  const orderId = orders[0]._id
  console.log("orderId",orderId)
  const totalPrice = orders[0].items.reduce((acc: number, item: CartItemInterface) => acc + item.price * item.quantity, 0)
  const userData = await fetchUserData(userId)
  return (
    <div>
      <h1>Order success</h1>
      {orders && orders.map((order: OrderInterface, index: number) => (
        order.items.map((orderItem: CartItemInterface) => (
          <div>
            <p>{orderItem.name}</p>

            <p>{orderItem.price}</p>
          </div>

        ))
      ))}

      <CancelOrder orderId={orderId} />
      {/* <AddressPanel userData={userData} totalPrice={totalPrice}/> */}





    </div>
  )
}
