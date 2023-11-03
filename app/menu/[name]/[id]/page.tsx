"use client"
import AddToCart from "@/app/Components/AddToCart";
// import AddToCart from "@/app/Components/AddToCart";
import { ItemInterface } from "@/app/admin/inventory/items/page";
import { useState, useEffect } from "react";
// async function fetchItem(id: string) {
//     console.log("id", id)
//     const response = await fetch(`http://localhost:3000/api/items/item/${id}`,
//         {
//             cache: 'no-cache',
//             next: { revalidate: 0 }
//         }
//     )
//     const data = await response.json()
//     console.log("data", data)
//     return data
// }
export default function ItemDetailsPage({ params }: { params: { id: string } }) {
    // const itemId = params.id;
    // const item:ItemInterface = await fetchItem(itemId)
    // console.log("item", item)
    const [item, setItem] = useState<ItemInterface | undefined>()
    async function fetchItem(id: string) {
        console.log("id", id)
        const response = await fetch(`http://localhost:3000/api/items/item/${id}`,

        )
        const data = await response.json()
        console.log("data", data)
        setItem(data)
        return data
    }
    useEffect(() => {
        fetchItem(params.id)
    },[])
        return (
            <div>
                {item && (
                    <div>
                        <h1>Item details</h1>
                        <p>{item.name}</p>
                        <AddToCart item={item}/>
                    </div>
                )}
            </div>
        );
        
}

