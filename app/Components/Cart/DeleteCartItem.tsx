"use client"
import { useRouter } from "next/navigation";

export default function DeleteCartItem({userId,itemId}:{userId:string,itemId:object}) {
    const router =useRouter()

    async function onDelete() {
        try {
            console.log("delete cart item userId",userId);
           const response =  await fetch(`http://localhost:3000/api/cart/${userId}`, {
              method: 'DELETE',
              body:JSON.stringify({
                itemId
              }),
              credentials: "include",
            });
            const responseData = await response.json()
            if(responseData==="Item removed from cart"){

                console.log("deleted");
                router.refresh()
            }else{
                console.log(`Error: try deleting later`)
            }
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        
    }

    return (
        <button onClick={onDelete}>
            delete
        </button>
    )
}

