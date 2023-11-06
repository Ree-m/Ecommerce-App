"use client"
import React, { Dispatch, SetStateAction, useReducer } from "react";
import { ItemInterface } from "../../../admin/inventory/items/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";

export default function AddToFavourite({ item }: { item: ItemInterface }) {
    console.log("item", item)
    const { data, status } = useSession();
    const userId: string = data?.user?.id;
    const router = useRouter();
    console.log("add to favoutite userId", data);
    async function addToFavourite(e: React.FormEvent<HTMLFormElement>, userId: string) {
        try {
            e.preventDefault();
            console.log("start favourite")
            console.log("State values: name", item.name, item._id, item.image);

            const response = await fetch(`http://localhost:3000/api/favourite/${userId}`, {
                method: 'POST',
                body: JSON.stringify({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    userId: userId
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            console.log("back userId", userId)
            const responseData = await response.json()
            console.log("add to favourite res data", responseData)

            if (response.ok) {


                alert("Added to favourite");

            } else {
                alert("Adding to favourite failed.Try again later.");

            }


        } catch (error) {
            console.log(`Error items:${error}`)

        }

    }
    return (
        <button onClick={(e) => addToFavourite(e, userId)}>
            Add To favourite
        </button>
    )
}

