import { NextResponse } from "next/server";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";

connectMongo();

export async function POST(request: Request) {

    try {
        const { name, parentCategory, icon, position, status } = await request.json();

        console.log("server, position", position, name)
        const category = await Category.findOne({ name: parentCategory });

        const categoryDoc = await Category.create({
            name:name.toLowerCase(),
            parentCategory: category ? category._id : null,
            icon,
            position,
            status
        })
        console.log(categoryDoc)

        categoryDoc.save()
        console.log("Category added")
        return NextResponse.json("Category added")
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}

export async function GET() {
    try {
        const categories = await Category.find()
        console.log(categories)
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}