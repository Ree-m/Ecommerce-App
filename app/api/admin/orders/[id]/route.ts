import { Order } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { OrderInterface } from "../route";

// edit order status: pending, canceled, deleted,delivered
export async function PUT(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const orderId: string | undefined = url?.split("/").pop();
        console.log("orderId", orderId)
        const { status } = await request.json();
        const orderIdObjectId: object = new mongoose.Types.ObjectId(orderId)

        // find order to edit
        const orderArr: OrderInterface[] = await Order.find({ _id: orderIdObjectId })
        console.log("order to edit", orderArr)
        const order: OrderInterface = orderArr[0]

        // edit status
        if (status) {
            order.status = status.toLowerCase()
        }
        await order.save()

        return NextResponse.json({ message: "Order edited", order });
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}