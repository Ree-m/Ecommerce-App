"use client"

import { useState, useEffect } from "react"

export default function AddCategoryPage() {
    const [name, setName] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string|null>(null)
    const [position, setPosition] = useState<number|null>(null)
    const [icon, setIcon] = useState<string>("")
    const [status, setStatus] = useState<string>("")



    async function addCategory(e:React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            console.log("start adding category")
            console.log("status values:",name,icon,position,parentCategory,status)
            const response = await fetch(`http://localhost:3000/api/admin/inventory/categories`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    parentCategory,
                    position,
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

    return (
        
        <div>

            <h1>Add Category</h1>
            <form onSubmit={addCategory}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

                <label>Parent Category</label>
                <input type="text" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} required/>
                <label>Icon</label>
                <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} required/>
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
                <input type="submit" value="Add Category" />
            </form>
        </div>
    )
}

