"use client"
import React from "react";
import { ItemInterface } from "../admin/inventory/items/page"
import { useSession } from "next-auth/react";


  
export default function AddToCart({ item }: { item: ItemInterface }) {
    console.log("item", item)
    const { _id: itemId, name, price, image } = item
    const { data, status } = useSession();
    const userId:string = data?.user?.id;
    console.log("add to cart userId", data);
    async function addToCart(e: React.FormEvent<HTMLFormElement>,userId:string) {
        try {
            e.preventDefault();
            console.log("start adding to cart")
            console.log("State values: name", name, itemId, image);

            const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
                method: 'POST',
                body: JSON.stringify({
                    itemId,
                    name,
                    price,
                    quantity: 1,
                    image
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            console.log("back userId",userId)
            const responseData = await response.json()
            console.log(responseData)
            if (responseData === "Cart Item added") {
                console.log('Added to cart');
            } else {
                console.log("Error: try adding item to cart later")
            }

        } catch (error) {
            console.log(`Error items:${error}`)

        }

    }
    return (
        <button onClick={(e) => addToCart(e, userId)}>
            Add To Cart
        </button>
    )
}

