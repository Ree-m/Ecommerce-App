"use client";
import React from 'react';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { PiBag } from "react-icons/pi";
import { BsPersonCircle } from "react-icons/bs";

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
            <div className="bg-greyBackground">
                <div className="flex">
                    <img className="" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 3.png`} alt={``} />
                    <img className="" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 1.png`} alt={``} />
                </div>
                <nav>
                    <ul>
                        <li><Link href={``}>Menu</Link></li>
                        <li><Link href={``}>About</Link></li>
                        <li><Link href={``}>Service</Link></li>
                        <li><Link href={``}>Contact</Link></li>

                    </ul>
                </nav>

                <div>
                    <i><Link href={``}><BsPersonCircle /></Link></i>
                    <i><Link href={``}><PiBag /></Link></i>

                </div>

                <p>Hi, {username}</p>
                <button onClick={() => signOut()}>signOut</button>

            </div>
        )
    }

    return (
        <div className="bg-greyBackground bg-contain  text-white flex justify-around items-center">
            <div className="flex">
                <img className="" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 3.png`} alt={``} />
                <img className="" src={`/assests/BarBak_Primary_PMS_page-0001-removebg-preview 1.png`} alt={``} />
            </div>
            <nav className="uppercase">
                <ul className='flex items-center gap-3'>
                    <li><Link href={``}>Menu</Link></li>
                    <li><Link href={``}>About</Link></li>
                    <li><Link href={``}>Service</Link></li>
                    <li><Link href={``}>Contact</Link></li>

                </ul>
            </nav>

            <div className='flex items-center  gap-3 text-2xl'>
                <i><Link href={``}><BsPersonCircle /></Link></i>
                <i><Link href={``}><PiBag /></Link></i>

            </div>
            {/* {!username && <Link href="/auth/login">Login</Link>} */}

        </div>
    )

}

