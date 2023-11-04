"use client"
import { ItemInterface } from "@/app/admin/inventory/items/page";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function ItemDetailsPage({ params }: { params: { id: string } }) {

    const { data, status } = useSession();
    const userId:string = data?.user?.id;

    const [item, setItem] = useState<ItemInterface | undefined>()
    
    useEffect(() => {
        async function fetchItem(id: string) {
            console.log("id", id)
            const response = await fetch(`http://localhost:3000/api/items/item/${id}`,
    
            )
            const data = await response.json()
            console.log("data", data)
            setItem(data)
            return data
        }
        fetchItem(params.id)
    }, [])

    async function addToCart(e: React.FormEvent<HTMLFormElement>, userId: string) {
        try {
            if (item) {
                e.preventDefault();
                console.log("start adding to cart")
                console.log("State values: name", item.name, item._id, item.image);

                const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        itemId:item._id,
                        name:item.name,
                        price:item.price,
                        quantity: 1,
                        image:item.image
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                console.log("add to cart userId", userId)
                const responseData = await response.json()
                console.log(responseData)
                if (responseData === "Cart Item added") {
                    console.log('Added to cart');
                } else {
                    console.log("Error: try adding item to cart later")
                }
            }


        } catch (error) {
            console.log(`Error items:${error}`)

        }
    }

    return (
        <div>
            {item && (
                <div>
                    <h1>Item details</h1>
                    <p>{item.name}</p>
                    {/* <AddToCart item={item} /> */}
                    <button onClick={(e) => addToCart(e, userId)}>
                        Add To Cart
                    </button>
                </div>
            )}
        </div>
    );

}

