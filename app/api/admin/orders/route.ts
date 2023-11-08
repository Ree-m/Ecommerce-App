import { Order } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { CartItemInterface } from "../../cart/[id]/route";

export interface OrderInterface {
    _id:string,
    save(): unknown,
    name: string,
    address: string,
    email: string,
    totalPrice: number,
    message: string,
    status: string,
    items: CartItemInterface[]

}
// fetch all orders
export async function GET() {
    try {
        const orders: OrderInterface[] = await Order.find()
        console.log(orders)
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}



