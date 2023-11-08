"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
export default function Header() {
    const { data, status } = useSession();
    const username = data?.user?.name;
    const userId = data?.user?.id;
    const router = useRouter();
    const { cart, setCart } = useContext(CartContext)
    const { cartLength } = useContext(CartContext)
    const { userData, setUserData } = useContext(UserContext)

    // useEffect(() => {
        async function fetchUserData(userId: string) {
            const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`,
                {
                    cache: 'no-cache',
                }
            )
            const data = await response.json()
            setUserData(data)
    
        }
        // fetchUserData(userId)
    // },[userId])
   

    console.log("header,cart userData", cart, cartLength, userData)
    // let cartItemsLength:number=cart[0]?.items?.length || 0

    if (status === 'authenticated' && username) {
        return (
            <div>
                <Link href={`/`}>BarBak</Link>
                <p>Hi, {username}</p>
                <button onClick={() => signOut()}>signOut</button>
                <Link href={`/cart/${userId}`}>Cart</Link>

            </div>
        )
    }

    return (
        <div>
            <Link href={`/`}>BarBak</Link>
            {!username && <Link href="/auth/login">Login</Link>}

        </div>
    )

}

