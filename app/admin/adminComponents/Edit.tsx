"use client"

import { revalidateTag } from "next/cache";

export default function Edit(endpoint: { endpoint: string }) {

    async function onEdit() {
        try {
            console.log(endpoint.endpoint);
            const response = await fetch(`${endpoint.endpoint}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                }),
                credentials: "include",
            });
            if (response.ok) {
                console.log("edited");
                revalidateTag('collection')


            } else {
                console.log(`Error: try editing later`)
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }

    }

    return (
        <button onClick={onEdit}>
            edit
        </button>
    )
}

