import { Order } from "@/models/Order";
import User from "@/models/User";
import Cors from "micro-cors";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {

      console.log("heheheehehehehe")

      const customerId = event.data.object.customer;
      console.log("in webhook id", customerId)
      const customer = await stripe.customers.retrieve(customerId);
      const userId = customer.metadata.userId
      const userIdObjectId = new mongoose.Types.ObjectId(userId)
      console.log("userId in hook", userId)

      // using userId, fetch user data from database
      console.log("userId", userId, userIdObjectId)
      const user = await User.find({ _id: userIdObjectId })


      console.log("1")
      console.log("ihook user", user,  userId)
      console.log("2")
      // Access the customer ID from the webhook payload
      console.log("cutomer", customer)
      const cartItems = JSON.parse(customer.metadata.cart)
      console.log("in webhook cartItems", cartItems,customer.metadata.userId)
      const order = await Order.create({
        userId: userIdObjectId,
        items: cartItems,
        message: customer.metadata.message,
        deliveryTime: customer.metadata.deliveryTime,
        name: user[0].name,
        address: user[0].address,
        phone: user[0].phone,
        email: user[0].email,

      })
      await order.save()
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {

    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
