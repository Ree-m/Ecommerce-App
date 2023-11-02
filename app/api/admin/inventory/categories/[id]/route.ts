import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Category from "@/models/Category";

connectMongo()

export async function DELETE(request:Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const categoryId = url?.split("/").pop();
        console.log("itemId", categoryId)

        const category = await Category.findOne({ _id: categoryId });

        if (category === null) {
            return NextResponse.json({ message: "Category does not exist" });
        } else {
            const deletedCategory = await Category.deleteOne({ _id: categoryId });

            return NextResponse.json({ message: "Category deleted", deletedCategory });

        }
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }
}

export async function PUT(request:Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const categoryId = url?.split("/").pop();
        console.log("categoryId", categoryId)
        const { name, parentCategory, icon, position, status } = await request.json();

        // const updatedCategory = await Category.updateOne({ _id: categoryId }, { name, parentCategory, icon, position, status });
        
        // Retrieve the existing item from the database
        const existingItem = await Category.findOne({ _id: categoryId });

        // Check which fields are being updated and update them
        if (name) existingItem.name = name;

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
        if (icon) existingItem.image = icon;
        if (status) existingItem.status = status;

        // Save the updated item back to the database
        const updatedItem = await existingItem.save();
        console.log(updatedItem)

        return NextResponse.json("Category edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}