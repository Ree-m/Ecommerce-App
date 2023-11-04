"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export default function Header() {
    const { data, status } = useSession();
    const username = data?.user?.name;
    const userId=data?.user?.id;
    const router = useRouter();
    const { cart, setCart } = useContext(CartContext)

    console.log("header,cart",cart)
    
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

