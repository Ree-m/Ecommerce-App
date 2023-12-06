import { NextResponse } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
connectMongo()

// fetch a category by id
export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)
        const categoryId: string | undefined = url?.split("/").pop();
        const categoryIdObjectId: object = new mongoose.Types.ObjectId(categoryId)

        
        const category = await Category.findOne({ _id: categoryIdObjectId });

        return NextResponse.json(category);

    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}