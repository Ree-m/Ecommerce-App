import { NextResponse } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
import { Types } from 'mongoose'
connectMongo()

// fetch all items of one category
export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const categoryName = url?.split("/").pop();
        console.log("name", categoryName)

        const category = await Category.findOne({ name: categoryName });
        console.log("category", category, category._id)

        if (category) {
            const items = await Item.aggregate([
                {
                    $match: {
                        parentCategory: category._id,
                    },
                },
            ])    
            console.log("items of a category response", items)
            return NextResponse.json(items);
        }

    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}