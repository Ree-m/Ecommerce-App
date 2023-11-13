"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState<number>(0);
    const [address, setAddress] = useState("");
    const userId = params.id
    const router = useRouter()

    async function onEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    phone

                }),
                credentials: "include",
            });
            const responseData = await response.json()
            console.log("response data", responseData)
            if (responseData === 'User edited') {
                console.log("edited");
                router.refresh()
                router.push(`/admin/users`)

            } else {
                console.log(`Error: try editing later`)
            }
        } catch (error) {
            console.error('Error editing users:', error);
        }

    }
    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={onEdit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <label>Phone</label>
                <input type="number" value={phone} onChange={(e) => setPhone(+e.target.value)} />
                <input type="submit" value="Update Item" />
            </form>
        </div>
    )
}

