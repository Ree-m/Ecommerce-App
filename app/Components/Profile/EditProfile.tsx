"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserInterface } from "@/app/api/auth/register/route";

export default function EditProfile({ userId, userData }: { userId: string, userData: UserInterface }) {
    const [name, setName] = useState<string>(userData.name)
    const [address, setAddress] = useState<string>(userData.address)
    const [phone, setPhone] = useState<number>(userData.phone)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const router = useRouter()
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
       
        setIsEditing(false);
    };
    async function onSaveClick() {
        setIsEditing(true)
        try {
            console.log("edit  userId", userId);
            const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    address,
                    phone

                }),
                credentials: "include",
            });
            const responseData = await response.json()
            if (responseData === "User edited") {

                console.log("Profile edited");
                router.refresh()
                setIsEditing(false)
            }

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }

    return (
        <div>
            <button onClick={handleEditClick}>
                Edit Proflie
            </button>
            {isEditing && (

                <form>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}  />

                    <label>Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(+e.target.value)} />
                    <button onClick={onSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>

                </form>
            )}


        </div>
    )

}

