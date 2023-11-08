import { Order } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { OrderInterface } from "../route";

// fetch pending orders
export async function GET() {
    try {
        const orders: OrderInterface[] = await Order.find({status:'Pending'})
        console.log("here here",orders)
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}



