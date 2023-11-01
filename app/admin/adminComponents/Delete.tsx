"use client"

import { revalidateTag } from "next/cache";

export default function Delete(endpoint:{endpoint:string}) {

    async function onDelete() {
        try {
            console.log(endpoint.endpoint);
           const response =  await fetch(`${endpoint.endpoint}`, {
              method: 'DELETE',
              credentials: "include",
            });
            if(response.ok){
                console.log("deleted");
                revalidateTag('collection')


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

