"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useItems } from "@/app/context/ItemContext"
export default function AddItemPage() {
    const [name, setName] = useState<string | null>(null)
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const [position, setPosition] = useState<number | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const router = useRouter()



    async function addItem(e: React.FormEvent<HTMLFormElement>
    ) {
        try {
            e.preventDefault();
            console.log("start adding item")
            console.log("State values: name", name, "parentCategory", parentCategory, "position", position, "price", price, "image", image, "status", status);

            const response = await fetch(`http://localhost:3000/api/admin/inventory/items`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    parentCategory,
                    position,
                    price,
                    image,
                    status
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

            })
            const responseData = await response.json()
            console.log(responseData)
            if (responseData === "Item added") {
            
                console.log('Item added');
                router.refresh()
                router.push('/admin/inventory/items');
                console.log("end adding")
            } else if (responseData !== "Item added") {
                console.log("Check if category exists")

            } else {
                console.log("Error: try adding item later")
            }
        } catch (error) {
            console.log(`Error items:${error}`)

        }
    }

    return (
        <div>
            <h1>Add Item</h1>
            <form onSubmit={addItem}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Parent Category</label>
                <input type="text" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} />
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
                <label>Image</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                <input type="submit" value="Add Item" />
            </form>
        </div>
    )
}

