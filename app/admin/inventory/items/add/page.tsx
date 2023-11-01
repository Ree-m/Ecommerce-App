"use client"

import { useState, useEffect } from "react"

export default function AddItemPage() {
    const [name, setName] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string>("")
    const [positon, setPosition] = useState<number>()
    const [price, setPrice] = useState<number>()
    const [image, setImage] = useState<string>("")
    const [status, setStatus] = useState<string>("")



    async function addItem(e) {
        try {
            e.preventDefault();
            console.log("start adding item")
            const response = await fetch(`http://localhost:3000/api/admin/inventory/items`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    parentCategory,
                    positon,
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
            if (responseData !== "Item added") {
                console.log("Check if category exists")
            } else if (responseData === "Item added") {
                console.log("Item added")
            } else {
                console.log("Error: try adding item later")
            }


        } catch (error) {
            console.log(`Error:${error}`)

        }

    }

    console.log("name", name)

    return (
        <div>
            <h1>Add Item</h1>
            <form onSubmit={addItem}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />

                <label>Parent Category</label>
                <input type="text" onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" onChange={(e) => setPosition(Number(e.target.value))} />
                <label>Price</label>
                <input type="number" onChange={(e) => setPrice(Number(e.target.value))} />
                <label>Image</label>
                <input type="text" onChange={(e) => setImage(e.target.value)} />
                <label>Status</label>
                <input type="text" onChange={(e) => setStatus(e.target.value)} />
                <input type="submit" value="Add Item" />
            </form>
        </div>
    )
}

