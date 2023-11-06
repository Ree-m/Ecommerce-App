import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/Order";
import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
connectMongo()

// add item to favourites
export async function POST(request: Request) {


    try {
        const { name, email,address, phone, status, totalPrice, deliveryTime, items } = await request.json();
        console.log("order values", name,email, address, phone, totalPrice, deliveryTime, items, status)
        const order = await Order.create({
            name,
            email,
            address,
            phone,
            status,
            totalPrice,
            deliveryTime,
            items

        });
        await order.save();
        console.log("Order made");
        return NextResponse.json({ message: "order made", order });
    } catch (error) {
        console.log("Order failed", error);
        return NextResponse.json(error);

    }
}

