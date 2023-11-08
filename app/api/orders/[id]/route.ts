import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/Order";
import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
import { OrderInterface } from "../../admin/orders/route";
connectMongo()

// fetch all orders of a user

export async function GET(request: Request) {
    const { url } = request;
    console.log("url", url);

    const userId: string | undefined = url?.split("/").pop();
    console.log("userId", userId);

    const userIdObjectId = new mongoose.Types.ObjectId(userId)
    try {
        const orders:OrderInterface[] = await Order.find({ userId: userIdObjectId })
        return NextResponse.json(orders)

    } catch (error) {
        return NextResponse.json(`Error order:${error}`)
    }

}