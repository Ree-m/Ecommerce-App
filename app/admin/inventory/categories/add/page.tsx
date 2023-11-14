"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
export default function AddCategoryPage() {
    const [name, setName] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const [position, setPosition] = useState<number | null>(null)
    const [status, setStatus] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter()


    async function addCategory(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            let formData = new FormData();
            formData.append("name", name);
            formData.append("position", position)
            formData.append("parentCategory", parentCategory)
            formData.append("icon", file)
            formData.append("status", status)

            console.log("formdata", formData)

            console.log("start adding category")
            console.log("status values:", name, position, parentCategory, status)
            const response = await fetch(`http://localhost:3000/api/admin/inventory/categories`, {
                method: 'POST',
                // body: JSON.stringify({
                //     name,
                //     parentCategory,
                //     position,
                //     status
                // }),
                body: formData,
                // headers: {
                //     "Content-Type": "application/json",
                // },
                // credentials: "include",

            })
            const responseData = await response.json()
            console.log(responseData)
            if (responseData === "Category added") {
                console.log("Category added")
                router.refresh()
                router.push(`/admin/inventory/categories`)

            } else {
                console.log("Error: try adding category later")
            }

        } catch (error) {
            console.log(`Error:${error}`)

        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log("seleceted file", selectedFile)
        setFile(selectedFile);
    };


    return (

        <div>

            <h1>Add Category</h1>
            <form onSubmit={addCategory}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Parent Category</label>
                <input type="text" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} required />
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />

                <label>Icon</label>
                <input type="file" onChange={handleFileChange} />


                <input type="submit" value="Add Category" />
            </form>
        </div>
    )
}

