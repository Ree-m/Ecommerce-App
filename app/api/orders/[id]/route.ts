import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/Order";
import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
import { OrderInterface } from "../../admin/orders/route";

connectMongo();

// Fetch the latest order of a user

export async function GET(request: Request) {
  const { url } = request;
  console.log("url", url);

  const userId: string | undefined = url?.split("/").pop();
  console.log("userId", userId);

  const userIdObjectId = new mongoose.Types.ObjectId(userId);

  try {
    const latestOrder: OrderInterface[] = await Order.find({ userId: userIdObjectId }).limit(1).sort({$natural:-1}) 

    if (latestOrder) {
      return NextResponse.json(latestOrder);
    } else {
      return NextResponse.json({ message: "No orders found for the user" });
    }
  } catch (error) {
    return NextResponse.json(`Error order: ${error}`);
  }
}


// a user cancels their order then order status gets edited to canceled 
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

