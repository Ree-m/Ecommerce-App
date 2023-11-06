"use client"
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { UserInterface } from '@/app/api/auth/register/route';
import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
import { UserContext } from '@/app/context/UserContext';
import { CartItemInterface } from '@/app/api/cart/[id]/route';

export default function PlaceOrderPanel({ totalPrice, cartItems }: { totalPrice: number, cartItems: CartItemInterface }) {
    const { message, setMessage } = useContext(CheckoutDataContext)
    const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
    const discount = (totalPrice * 10) / 100;
    const { userData } = useContext(UserContext)
    console.log("", message, deliveryTime, userData, userData)


    async function addOrder(e) {

        try {
            e.preventDefault();
            console.log("start order")
            console.log("State values order:");

            const response = await fetch(`http://localhost:3000/api/order`, {
                method: 'POST',
                body: JSON.stringify({
                    name: userData[0].name,
                    address: userData[0].address,
                    email: userData[0].phone,
                    phone: userData[0].phone,
                    status: "pending",
                    deliveryTime: deliveryTime,
                    totalPrice: totalPrice,
                    items: cartItems,
                    message:message
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            const responseData = await response.json()
            console.log("responseData order", responseData)
        } catch (error) {
            console.log("Error order", error)
        }
    }

    if (userData && userData[0]) {
        return (
            <div>

                {userData && userData[0] && (
                    <div>

                        <p>{userData[0].name}</p>
                        <p>{userData[0].address}</p>
                        <p>{userData[0].phone}</p>
                        <p>{deliveryTime}</p>

                    </div>
                )}

                <div>{totalPrice}</div>

                <button onClick={addOrder}>Place Order</button>



            </div>
        );
    }
}
