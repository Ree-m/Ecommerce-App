"use client"

import { useState, useEffect } from "react"

export default function AddCategoryPage() {
    const [name, setName] = useState<string|null>(null)
    const [parentCategory, setParentCategory] = useState<string|null>(null)
    const [positon, setPosition] = useState<number|null>(null)
    const [icon, setIcon] = useState<string|null>(null)
    const [status, setStatus] = useState<string|null>(null)



    async function addCategory(e) {
        try {
            e.preventDefault();
            console.log("start adding category")
            const response = await fetch(`http://localhost:3000/api/admin/inventory/categories`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    parentCategory,
                    positon,
                    icon,
                    status
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

            })
            const responseData = await response.json()
            console.log(responseData)
             if (responseData === "Category added") {
                console.log("Item added")
            } else {
                console.log("Error: try adding category later")
            }


        } catch (error) {
            console.log(`Error:${error}`)

        }

    }

    console.log("name", name,"position",positon+1)

    return (
        <div>

            <h1>Add Category</h1>
            <form onSubmit={addCategory}>
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />

                <label>Parent Category</label>
                <input type="text" onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" onChange={(e) => setPosition(Number(e.target.value))} />
                <label>Icon</label>
                <input type="text" onChange={(e) => setIcon(e.target.value)} />
                <label>Status</label>
                <input type="text" onChange={(e) => setStatus(e.target.value)} />
                <input type="submit" value="Add Category" />
            </form>
        </div>
    )
}

