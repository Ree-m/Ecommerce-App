import { NextResponse, NextRequest } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";

connectMongo();

export async function POST(request: Request) {

    try {
        const { name, parentCategory, position, price, image, status } = await request.json();
        console.log("name, parentCategory, position, price, image, status", name, parentCategory, position, price, image, status)
        const category = await Category.findOne({ name: parentCategory });

        const itemDoc = await Item.create({
            name,
            parentCategory: category ? category._id : null,
            position,
            price,
            image,
            status
        })
        console.log(itemDoc)

        itemDoc.save()
        console.log("Item added")
        return NextResponse.json("Item added")
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}

export async function GET() {
    try {
        const items = await Item.find()
        console.log(items)
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}