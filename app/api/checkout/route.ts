import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Cart } from "@/models/Cart";
import stripe from "@/config/stripe";
import mongoose from "mongoose";
import { CartItemInterface } from "../cart/[id]/route";
import { CartInterface } from "../cart/[id]/route";
import { UserInterface } from "../auth/register/route";
import User from "@/models/User";

// calculates the new order total after using loyalty points
const redeemLoyaltyPoints = async (userArr: UserInterface[], loyaltyPointsToRedeem: number, orderTotal: number) => {
    const user = userArr[0];
    console.log("starting redeemLoyaltyPoints fucntion")
    // Check if user has enough loyalty points to redeem and order total is above $1000
    if (user.loyaltyPoints >= loyaltyPointsToRedeem && orderTotal >= 1000) {
        // Check if user has accumulated a minimum of 500 loyalty points
        if (user.loyaltyPoints >= 500) {
            // Calculate the redemption value in dollars
            const redemptionValue = loyaltyPointsToRedeem * 0.25;
            console.log("redeemLoyaltyPoints fucntion redemptionValue", redemptionValue)

            // Adjust the order total after applying the redemption
            const adjustedOrderTotal = orderTotal - redemptionValue;
            console.log("redeemLoyaltyPoints fucntion adjustedOrderTotal", adjustedOrderTotal)

            // Update user's loyalty points
            user.loyaltyPoints -= loyaltyPointsToRedeem;
            await user.save()

            return {
                success: true,
                adjustedOrderTotal,
                redemptionValue,
            };
        } else {
            return { success: false, message: 'Minimum 500 loyalty points required to redeem.' };
        }
    } else {
        return { success: false, message: 'Unable to redeem loyalty points on orders below $1000.' };
    }
};



export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const headersList = headers();
        const { userId, message, email, address, deliveryTime, phone } = await req.json();

        const userIdObjectId: object = new mongoose.Types.ObjectId(userId)

        console.log("userId", userId, userIdObjectId)
        const user: UserInterface[] = await User.find({ _id: userIdObjectId })

        const cart: CartInterface[] = await Cart.aggregate([
            {
                $match: {

                    userId: userIdObjectId,
                },
            },
        ])
        console.log("line items", cart[0].items,)

        const loyaltyPointsToRedeem = 500
        const totalPrice = cart[0].items.reduce((acc: number, item: CartItemInterface) => acc + item.price * item.quantity, 0);
        console.log("here totalPrice,loyaltyPointsToRedeem", totalPrice, loyaltyPointsToRedeem)
        const redemptionResult = await redeemLoyaltyPoints(user, loyaltyPointsToRedeem, totalPrice);
        console.log("redemption result", redemptionResult)
        const adjustedOrderTotal = redemptionResult.adjustedOrderTotal;
        console.log("adjusted order total", adjustedOrderTotal)
        console.log("before coupon", redemptionResult.redemptionValue)
        const coupon = await stripe.coupons.create({
            amount_off: redemptionResult.redemptionValue * 100, //in cents
            currency: 'usd',
            duration: 'once',
            name: 'Loyalty Points Redemption',
        });


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

            },
            coupon: coupon.id,
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
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            };
        });
        console.log("line items", lineItems)

        // try {


        //     // if (redemptionResult.success) {
        //     //     const coupon = await stripe.coupons.create({
        //     //         amount_off:redemptionResult.redemptionValue,
        //     //         duration: 'once', 
        //     //         name: 'Loyalty Points Redemption',
        //     //     });

        //     //     // Update line items with redemption information
        //     //     // lineItems.push({
        //     //     //     price_data: {
        //     //     //         currency: "usd",
        //     //     //         product_data: {
        //     //     //             name: "Loyalty Points Redemption",
        //     //     //         },
        //     //     //         unit_amount: redemptionResult.redemptionValue * 100,

        //     //     //     },
        //     //     //     quantity: 1,
        //     //     // });
        //     // }


        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/checkout/success/${userId}`,
            cancel_url: `http://localhost:3000/cart/${userId}`,
        });

        return NextResponse.json({ sessionId: session.id, adjustedOrderTotal });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Error creating checkout session" });
    }
}

