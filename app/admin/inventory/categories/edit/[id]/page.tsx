"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {

    const [name, setName] = useState<string>("")
    const [parentCategory, setParentCategory] = useState<string | null>(null)
    const [position, setPosition] = useState<number | undefined>(undefined)
    const [status, setStatus] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter()
    const itemId = params.id
    console.log("itemId", params, itemId)

    async function onEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append("name", name || "");
            formData.append("status", status || "");

            if (parentCategory !== null && parentCategory !== undefined) {
                formData.append("parentCategory", parentCategory);
            }

            if (position !== undefined) {
                formData.append("position", position.toString());
            }
            if (file) {
                formData.append("icon", file);
            }


            const response = await fetch(`http://localhost:3000/api/admin/inventory/categories/${itemId}`, {
                method: 'PUT',
                // headers: {
                //     "Content-Type": "application/json"
                // },
                // body: JSON.stringify({
                //     name,
                //     parentCategory,
                //     position,
                //     icon,
                //     status
                // }),
                body: formData,
                credentials: "include",
            });
            const responseData = await response.json()
            console.log("resposnedata", responseData)
            if (responseData === 'Category edited') {
                console.log("edited");
                router.refresh()
                router.push(`/admin/inventory/categories`)

            } else {
                console.log(`Error: try editing later`)
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log("seleceted file", selectedFile)
        setFile(selectedFile);
    };

    return (
        <div>
            <h1>Edit Category</h1>
            <form onSubmit={onEdit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Parent Category</label>
                <input type="text" value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} />
                <label>Position</label>
                <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} />
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                <label>Icon</label>
                <input type="file" onChange={handleFileChange} />

                <input type="submit" value="Update Category" />
            </form>
        </div>
    )
}

