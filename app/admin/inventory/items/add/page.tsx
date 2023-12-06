"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
export default function AddItemPage() {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string>("")
    const [position, setPosition] = useState<number | undefined>(undefined)
    const [price, setPrice] = useState<number | undefined>(undefined)
    const [image, setImage] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter()



    async function addItem(e: React.FormEvent<HTMLFormElement>
    ) {
        try {
            e.preventDefault();
            console.log("start adding item")
            console.log("State values: name", name, "parentCategory", parentCategory, "position", position, "price", price, "image", image, "status", status);
            let formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("parentCategory", parentCategory)
            formData.append("position", position)
            formData.append("price", price)
            formData.append("image", file)
            formData.append("status", status)

            console.log("formdata", formData)

            const response = await fetch(`http://localhost:3000/api/admin/inventory/items`, {
                method: 'POST',

                body: formData,

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log("seleceted file", selectedFile)
        setFile(selectedFile);
    };

    return (
        <div>
            <h1>Add Item</h1>
            <form onSubmit={addItem}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Parent Category</label>
                <input type="text" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} />
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                <label>Image</label>
                <input type="file" onChange={handleFileChange} required />

                <input type="submit" value="Add Item" />
            </form>
        </div>
    )
}

