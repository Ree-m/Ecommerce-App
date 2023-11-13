"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
    const [name, setName] = useState<string | null>(null)
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const [position, setPosition] = useState<number | null>(null)
    const [price, setPrice] = useState<number | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const router = useRouter()
    const itemId = params.id

    async function onEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/admin/inventory/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    parentCategory,
                    position,
                    price,
                    image,
                    status
                }),
                credentials: "include",
            });
            const responseData = await response.json()
            console.log("response data", responseData)
            if (responseData === 'Item edited') {
                console.log("edited");
                router.refresh()
                router.push(`/admin/inventory/items`)

            } else {
                console.log(`Error: try editing later`)
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }

    }
    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={onEdit}>
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
                <input type="submit" value="Update Item" />
            </form>
        </div>
    )
}

