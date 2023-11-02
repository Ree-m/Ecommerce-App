import { NextResponse } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
connectMongo()

// fetch all categories
export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const categories = await Category.find();

        return NextResponse.json(categories);

    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}