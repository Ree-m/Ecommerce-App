import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Item from "@/models/Item";

connectMongo()

export async function DELETE(request:Request) {
    try {
        const { url } =  request;
        console.log("url", url)

        const itemId = url?.split("/").pop();
        console.log("itemId", itemId)

        const item = await Item.deleteOne({ _id: itemId });
        if (item === null) {
            return NextResponse.json({ message: "Item does not exist" });
        }

        return NextResponse.json({ message: "Item deleted", item });
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }
}

export async function PUT(request:Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const itemId = url?.split("/").pop();
        console.log("itemId", itemId)
        const {  name, parentCategory, position, price, image, status } = await request.json();
        console.log( "name, category,etc",name, parentCategory, position, price, image, status)

        const updatedItem = await Item.updateOne({ _id: itemId }, { name, parentCategory, position, price, image, status });
        console.log("updatedItem",updatedItem)
        return NextResponse.json("Item edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}