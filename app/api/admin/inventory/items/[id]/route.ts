import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Item from "@/models/Item";
import Category from "@/models/Category";

connectMongo()

export async function DELETE(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const userId = url?.split("/").pop();
        console.log("userId", userId)

        const item = await Item.deleteOne({ _id: userId });
        if (item === null) {
            return NextResponse.json({ message: "Item does not exist" });
        }

        return NextResponse.json({ message: "Item deleted", item });
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }
}

export async function PUT(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const itemId = url?.split("/").pop();
        console.log("itemId", itemId)
        const { name, parentCategory, position, price, image, status } = await request.json();
        console.log("name, category,etc", name, parentCategory, position, price, image, status)

        // Retrieve the existing item from the database
        const existingItem = await Item.findOne({ _id: itemId });

        // Check which fields are being updated and update them
        if (name) existingItem.name = name.toLowerCase();

        if (parentCategory !== null) {
            // Set parentCategory to a valid ObjectId, ensuring it exists in the 'Category' model
            const categoryExists = await Category.findOne({name:parentCategory});
            if (categoryExists) {
                existingItem.parentCategory = parentCategory._id;
            } else {
                return NextResponse.json("Error: Invalid parentCategory");
            }
        } else {
            existingItem.parentCategory = null;
        }

        if (position !== null) existingItem.position = position;
        if (price !== null) existingItem.price = price;
        if (image) existingItem.image = image;
        if (status) existingItem.status = status;

        // Save the updated item back to the database
        const updatedItem = await existingItem.save();


        // const updatedItem = await Item.updateOne({ _id: itemId }, { name, parentCategory, position, price, image, status });
        console.log("updatedItem", updatedItem)
        return NextResponse.json("Item edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}