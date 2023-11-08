import { OrderInterface } from "@/app/api/admin/orders/route";
import { CartItemInterface } from "@/app/api/cart/[id]/route";
export interface FavouriteInterface {
  name: string,
  price: number,
  itemId: object,
  userId: object,
  image: string
}
async function fetchOrdersOfAUser(userId: string) {
  console.log("fav userId", userId)
  const response = await fetch(`http://localhost:3000/api/orders/${userId}`,
    {
      cache: 'no-cache',
    }
  )
  const data = await response.json()
  return data
}
export default async function MyOrdersPage({ params }: { params: { id: string } }) {
  const userId = params.id
  const orders = await fetchOrdersOfAUser(userId)
  return (
    <div>
      <h1>My Orders</h1>
      {orders && orders.map((order: OrderInterface, index: number) => (
        order.items.map((orderItem:CartItemInterface) => (
          <div>
            <p>{orderItem.name}</p>

            <p>{orderItem.price}</p>
          </div>

        ))
      ))}


    </div>
  )
}
