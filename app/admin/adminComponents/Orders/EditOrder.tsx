"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditOrder({ objectId, status }: { objectId: string, status: string }) {
    const router = useRouter()
    const [editedStatus, setEditedStatus] = useState<string>("")
    const [isEditing, setIsEditing] = useState<boolean>(false)

    async function handleEdit() {
        setIsEditing(true)
    }


    async function handleCancel() {

        setIsEditing(false)

    }


    async function handleSave() {
        try {
            console.log("status", status, editedStatus)
            const response = await fetch(`http://localhost:3000/api/admin/orders/${objectId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: editedStatus
                }),
                credentials: "include",
            });
            const responseData = await response.json()
            console.log(responseData)
            if (responseData.message=="Order edited") {
                console.log("edited");
                setIsEditing(false)
                router.refresh()
            } else {
                console.log(`Error: try editing order later`)
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }

    }

    return (
        <div>
            {isEditing ? (
                <div>
                    <input type="text" value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>

                </div>

            ) : (
                <div>
                    <p>{status}</p>
                    <button onClick={handleEdit}>Edit</button>

                </div>
            )}



        </div>
    )
}

