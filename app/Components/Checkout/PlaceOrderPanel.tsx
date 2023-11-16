"use client"

import { loadStripe } from "@stripe/stripe-js";
import { UserContext } from '@/app/context/UserContext';
import { UserInterface } from '@/app/api/auth/register/route';
import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
import { CartItemInterface } from '@/app/api/cart/[id]/route';

import { useContext } from "react";
import mongoose from "mongoose";
export default function PlaceOrderPanel({ totalPrice, cartItems }: { totalPrice: number, cartItems: CartItemInterface }) {

    const { message, setMessage } = useContext(CheckoutDataContext)
    const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
    const discount = (totalPrice * 10) / 100;
    const { userData } = useContext(UserContext)
    const { name, address, email, phone } = userData;
    console.log("panel order", message, deliveryTime, userData, userData[0], totalPrice)

    const userId = userData[0]?._id

    const redirectToCheckout = async () => {
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    name,
                    address,
                    email,
                    phone,
                    status: "pending",
                    deliveryTime,
                    totalPrice: totalPrice - discount,
                    message
                }),
            });

            const { sessionId } = await checkoutResponse.json();
            const stripeError = await stripe.redirectToCheckout({ sessionId });

            if (stripeError) {
                console.error("Stripe erorr", stripeError);
            }
            else {
                console.log("Order data:", {

                });
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