import { NextResponse } from "next/server";
import Item from "@/models/Item";
import connectMongo from "@/utils/connectMongo";

connectMongo();

export async function POST(req) {

    try {
        const { serialNumber, name, parentCategory, position, price, image, status } = await req.json();
        console.log("req.json()", await req)

        const itemDoc = await Item.create({
            serialNumber, name, parentCategory, position, price, image, status
        })
        console.log(itemDoc)

        itemDoc.save()
        console.log("Item added")
        return NextResponse.json(itemDoc)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}

export async function GET(req, res) {
    try {
        const items = await Item.find()
        console.log(items)
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}