import { OrderInterface } from "../../api/admin/orders/route";
import EditOrder from "../adminComponents/Orders/EditOrder";
async function fetchAllOrders() {
    const response = await fetch(`http://localhost:3000/api/admin/orders`,
        {
            cache: 'no-cache',
        }
    )
    const data = await response.json();
    console.log("all orders data", data);
    return data;
}
async function fetchPendingOrders() {
    const response = await fetch(`http://localhost:3000/api/admin/orders/pending`,
        {
            cache: 'no-cache',
        }
    )
    const data = await response.json();
    console.log("pending orders data", data);
    return data;
}
export default async function OrderManagementPage() {
    const orders:OrderInterface[] = await fetchAllOrders();
    const pendingOrders:OrderInterface[] = await fetchPendingOrders()
    console.log("all orders inside", orders);

    return (
        <div>
            <div>
                <h3>Pending Orders</h3>

                {pendingOrders && pendingOrders.map((order: OrderInterface, index: number) => (
                    <div key={index}>
                        <p> {order.name}</p>
                        <p> {order.address}</p>
                        <p> {order.message}</p>

                        <EditOrder status={order.status} objectId={order._id} />


                    </div>
                ))}
            </div>
            <div>
                <h3>All Orders</h3>
                {orders && orders.map((order: OrderInterface, index: number) => (
                    <div key={index}>
                        <p> {order.name}</p>
                        <p> {order.address}</p>
                        <p> {order.message}</p>

                        <EditOrder status={order.status} objectId={order._id} />


                    </div>
                ))}

            </div>

        </div>
    )
}

