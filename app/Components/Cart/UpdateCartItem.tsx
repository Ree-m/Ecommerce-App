"use client"
import { useRouter } from "next/navigation";

export default function UpdateCartItem({userId,itemId,quantity,sign}:{userId:string,itemId:object,quantity:number,sign:string}) {
    const router =useRouter()

    async function onUpdate() {
        try {
            console.log("update cart item userId",userId);
           const response =  await fetch(`http://localhost:3000/api/cart/${userId}`, {
              method: 'PUT',
              body:JSON.stringify({
                itemId,
                quantity
              }),
              credentials: "include",
            });
            const responseData = await response.json()
            if(responseData==="Cart item updated"){

                console.log("Cart updated");
                router.refresh()
            }

          } catch (error) {
            console.error('Error updating item:', error);
          }
        
    }

    return (
        <button onClick={onUpdate}>
            {sign}
        </button>
    )
}

