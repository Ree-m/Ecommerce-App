"use client"
import React, { Dispatch, SetStateAction, useReducer } from "react";
import { ItemInterface } from "../../admin/inventory/items/page"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import { Cart } from "@/app/context/CartContext";
// import { CartItemInterface } from "@/app/api/cart/[id]/route";
import mongoose from "mongoose";

export default function AddToCart({ item }: { item: ItemInterface }) {
    console.log("item", item)
    const { _id: itemId, name, price, image } = item
    const { data, status } = useSession();
    const userId: string = data?.user?.id;
    const router = useRouter();
    const {cart,setCart}=useContext(CartContext) as { cart: Cart, setCart: Dispatch<SetStateAction<Cart>> }
    const {setCartLength}=useContext(CartContext)
    console.log("add to cart userId", data);
    async function addToCart(e: React.FormEvent<HTMLFormElement>, userId: string) {
        try {
            e.preventDefault();
            console.log("start adding to cart")
            console.log("State values: name", name, itemId, image);

            const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
                method: 'POST',
                body: JSON.stringify({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    image: item.image
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            console.log("back userId", userId)
            const responseData = await response.json()
            console.log("add to cart res data",responseData,responseData.cart.items.length)

            if (response.ok) {
                setCart(responseData);
                setCartLength(responseData.cart.items.length)
          
                alert("Cart Item added");
          
              } else {
                alert("Adding to cart failed.Try again later.");
          
              }
            // if (responseData === "Cart Item added") {
            //     console.log('Added to cart');
            //     const updatedItem: CartItemInterface = {
            //         itemId: new mongoose.Types.ObjectId(item._id),
            //         name: item.name,
            //         quantity:1,
            //         price: item.price,
            //         image: item.image,
            //       };

            //       const updatedCart: Cart[] = Array.isArray(cart) ? [...cart] : [];
            //       if (updatedCart.length > 0) {
            //         updatedCart[0].items = [...(updatedCart[0].items || []), updatedItem];
            //       }
            
            
            //     setCart(updatedCart)

            // } else {
            //     console.log("Error: try adding item to cart later")
            // }

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

