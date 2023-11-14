import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Item from "@/models/Item";
import Category from "@/models/Category";
import fs from "fs/promises";
import path from "path";

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

        // Retrieve the existing item from the database

        const existingItem = await Item.findOne({ _id: itemId });

        // const { name, parentCategory, position, price, image, status } = await request.json();
        // console.log("name, category,etc", name, parentCategory, position, price, image, status)

        const formData = await request.formData();
        const name = formData.get("name");
        const parentCategory = formData.get("parentCategory")
        const position = formData.get("position")
        const price = formData.get("price")
        const image = formData.get("image")
        const status = formData.get("status")

        console.log("name and all", name, parentCategory, position, price, image, status)


        // Check which fields are being updated and update them
        if (name) existingItem.name = name.toLowerCase();

        if (parentCategory !== null && parentCategory !== undefined) {
            // Set parentCategory to a valid ObjectId, ensuring it exists in the 'Category' model
            const categoryExists = await Category.findOne({ name: parentCategory });
            console.log("category exists", categoryExists);
            if (categoryExists) {
                existingItem.parentCategory = parentCategory._id;
            } else {
                return NextResponse.json("Error: Invalid parentCategory");
            }
        }

        
        if (position) existingItem.position = position;
        if (price) existingItem.price = price;
        if (status) existingItem.status = status;

        if (image) {
            console.log("1")
            const fileName = `${itemId}_${Date.now()}_${image.name}`;
            console.log("filename", fileName)

            // Move the uploaded file to the destination folder
            const destinationPath = path.join("public/uploads", fileName);
            console.log("destination path", destinationPath)

            // Get the file buffer and write it to the destination folder
            const fileBuffer = await image.arrayBuffer();
            await fs.writeFile(destinationPath, new Uint8Array(fileBuffer));

            existingItem.image = `${fileName}`;
        }

        // Save the updated item back to the database
        const updatedItem = await existingItem.save();


        console.log("updatedItem", updatedItem)
        return NextResponse.json("Item edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}

