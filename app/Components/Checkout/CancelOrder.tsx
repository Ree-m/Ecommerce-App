"use client"

export default function CancelOrder({ orderId}: { orderId: string }) {


    async function cancelOrder() {
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: "canceled"
                }),
                credentials: "include",
            });
            const responseData = await response.json()
            if (responseData.message === "Order edited") {
                console.log("canceled")
                alert("Order canceled")

            }

        } catch (error) {
            console.error('Error canceling order:', error);
        }
    }

    return (
        <div>
            <button onClick={cancelOrder}>Cancel Order</button>

        </div>
    )

}

