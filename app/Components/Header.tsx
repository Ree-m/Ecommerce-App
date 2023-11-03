"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
    const { data, status } = useSession();
    const username = data?.user?.name;
    const userId=data?.user?.id;
    const router = useRouter();
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

