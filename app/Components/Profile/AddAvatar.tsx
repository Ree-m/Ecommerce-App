"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserInterface } from "@/app/api/auth/register/route";

export default function AddAvatar({ userId, userData }: { userId: string, userData: UserInterface }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log("seleceted file", selectedFile)
        setFile(selectedFile);
    };

    async function onSaveClick(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setIsEditing(true);

        try {
            if (!file) {
                console.error("No file selected.");
                return;
            }
            console.log("before formdata", file)
            let formData = new FormData();
            formData.append("image", file);
            console.log(formData.has("image"))

            console.log("formdata", formData)
            for (const value of formData.values()) {
                console.log("value",value);
              }
              

            const response = await fetch(`http://localhost:3000/api/auth/user/avatar/${userId}`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            });
            console.log("formdata", formData)

            const responseData = await response.json();
            console.log("responseData", responseData)
            if (responseData.message === "User edited") {
                console.log("Avatar added");
                router.refresh(); 
                setIsEditing(false);
            }
            console.log("avatar not edited")
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <div>
            <button onClick={handleEditClick}>Edit Avatar</button>
            {isEditing && (
                <form>
                    <input type="file" onChange={handleFileChange} required />
                    <button onClick={onSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </form>
            )}
        </div>
    );
}
