import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Cart } from "@/models/Cart";
import stripe from "@/config/stripe";
import mongoose from "mongoose";
import { CartItemInterface } from "../cart/[id]/route";
import { CartInterface } from "../cart/[id]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { userId, message, email, address,deliveryTime,phone,totalPrice} = await req.json();

    const userIdObjectId: object = new mongoose.Types.ObjectId(userId)
    console.log("userId", userId, userIdObjectId)
    const cart: CartInterface = await Cart.aggregate([
        {
            $match: {
                userId: userIdObjectId,
            },
        },
    ])
    console.log("line items", cart[0].items,)
    const customer = await stripe.customers.create({
        metadata: {
            userId,
            cart: JSON.stringify(cart[0].items),
            message,
            address,
            phone,
            email,
            deliveryTime,
            totalPrice

        }
    })
    console.log("customer", customer)
    const lineItems = cart[0].items.map((item: CartItemInterface) => {
        console.log("line item details", item.name, item.quantity, item.price)

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100,
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000`,
            cancel_url: `http://localhost:3000/cart/${userId}`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Error creating checkout session" });
    }
}