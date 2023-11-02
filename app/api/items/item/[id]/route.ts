import { NextResponse } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
import { Types } from 'mongoose'
connectMongo()

// fetch one item by id
export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const itemId = url?.split("/").pop();
        console.log("itemId", itemId)
        const item = await Item.findById(itemId );
        return NextResponse.json(item);


    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}