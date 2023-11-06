"use client"
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { UserInterface } from '@/app/api/auth/register/route';
import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
import { UserContext } from '@/app/context/UserContext';
export default function OrderSummaryPanel({ totalPrice, totalItems }: { totalPrice: number, totalItems: number }) {
    const { message, setMessage } = useContext(CheckoutDataContext)
    const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
    const discount = (totalPrice * 10) / 100;
    const { userData } = useContext(UserContext)
    console.log("message order summary", message, deliveryTime, userData, userData)

    if(userData && userData[0]){
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

            <div>
                <h3>Price Details</h3>
                <p>{`Price (${totalItems} items):${totalPrice}`}</p>
                <p>Discount(10%):-{discount} </p>

            </div>
            <p>Total price:{totalPrice - discount}</p>
            <Link href={`/checkout/place-order/${userData[0]._id}`}>Continue</Link>

        </div>
    );
}
}
