import { NextResponse } from "next/server";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";

connectMongo();

export async function POST(request) {

    try {
        const {  name, parentCategory,icon, position, status } = await request.json();

        const categoryDoc = await Category.create({
             name, parentCategory,icon, position, status
        })
        console.log(categoryDoc)

        categoryDoc.save()
        console.log("Category added")
        return NextResponse.json(categoryDoc)
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