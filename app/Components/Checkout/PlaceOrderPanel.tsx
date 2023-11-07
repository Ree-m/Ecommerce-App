"use client"
// import { useState, useContext } from 'react';
// import { useRouter } from 'next/navigation'
// import Link from 'next/link';
// import { UserInterface } from '@/app/api/auth/register/route';
// import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
// import { UserContext } from '@/app/context/UserContext';
// import { CartItemInterface } from '@/app/api/cart/[id]/route';

// export default function PlaceOrderPanel({ totalPrice, cartItems }: { totalPrice: number, cartItems: CartItemInterface }) {
// const { message, setMessage } = useContext(CheckoutDataContext)
// const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
// const discount = (totalPrice * 10) / 100;
//     const { userData } = useContext(UserContext)
//     console.log("", message, deliveryTime, userData, userData)


//     async function addOrder(e) {

//         try {
//             e.preventDefault();
//             console.log("start order")
//             console.log("State values order:");

//             const response = await fetch(`http://localhost:3000/api/order`, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     name: userData[0].name,
//                     address: userData[0].address,
//                     email: userData[0].phone,
//                     phone: userData[0].phone,
//                     status: "pending",
//                     deliveryTime: deliveryTime,
//                     totalPrice: totalPrice,
//                     items: cartItems,
//                     message:message
//                 }),
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//             })
//             const responseData = await response.json()
//             console.log("responseData order", responseData)
//         } catch (error) {
//             console.log("Error order", error)
//         }
//     }

//     if (userData && userData[0]) {
//         return (
//             <div>

//                 {userData && userData[0] && (
//                     <div>

//                         <p>{userData[0].name}</p>
//                         <p>{userData[0].address}</p>
//                         <p>{userData[0].phone}</p>
//                         <p>{deliveryTime}</p>

//                     </div>
//                 )}

//                 <div>{totalPrice}</div>

//                 <button onClick={addOrder}>Place Order</button>



//             </div>
//         );
//     }
// }


import { loadStripe } from "@stripe/stripe-js";
import { UserContext } from '@/app/context/UserContext';
import { UserInterface } from '@/app/api/auth/register/route';
import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
import { CartItemInterface } from '@/app/api/cart/[id]/route';

import { useContext } from "react";
export default function PlaceOrderPanel({ totalPrice, cartItems }: { totalPrice: number, cartItems: CartItemInterface }) {

    const { message, setMessage } = useContext(CheckoutDataContext)
    const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
    const discount = (totalPrice * 10) / 100;
    const { userData } = useContext(UserContext)
    const { name, address, email, phone } = userData;
    console.log("panel order", message, deliveryTime, userData, userData[0], totalPrice)



    const redirectToCheckout = async () => {
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userData[0]._id }),
            });

            const { sessionId } = await checkoutResponse.json();
            const stripeError = await stripe.redirectToCheckout({ sessionId });

            if (stripeError) {
                console.error("Stripe erorr", stripeError);
            }
            else{
                console.log("Order data:", {
                   
                });


            // const response = await fetch(`http://localhost:3000/api/order`, {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         name,
            //         address,
            //         email,
            //         phone,
            //         status: "pending",
            //         deliveryTime: deliveryTime,
            //         totalPrice: totalPrice - discount,
            //         items: cartItems,
            //         message: message
            //     }),
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include",
            // })
            // const responseData = await response.json()
            // console.log("responseData order", responseData)
            // console.log("order added")
        }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button
                onClick={() => redirectToCheckout()}
                // disabled={cartCount === 0}
                className="rounded-md border border-transparent bg-sky-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 mr-2 disabled:bg-gray-600">
                Place order
            </button>
            <p>Message:{message}</p>
            <p>{deliveryTime}</p>
        </div>

    );
}