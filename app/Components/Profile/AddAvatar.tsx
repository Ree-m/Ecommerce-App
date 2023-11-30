"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserInterface } from "@/app/api/auth/register/route";
import Image from 'next/image'

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
            {/* <button onClick={handleEditClick}>Edit Avatar</button> */}
            <div className="relative">

                <button onClick={handleEditClick}>
                    <Image src={`/assests/btn_border_white.png.png`} alt={`Button image`} height={140} width={140} />
                    <p className="absolute top-6 left-14 pb-[10px] pl-[12px] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm hover:text-customYellow">Edit Avatar</p>
                </button>
            </div>
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
