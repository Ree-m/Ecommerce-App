import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Category from "@/models/Category";
import fs from "fs/promises";
import path from "path";

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

        const existingCategory = await Category.findOne({ _id: categoryId });

        const formData = await request.formData();
        const name = formData.get("name");
        const parentCategory = formData.get("parentCategory")
        const position = formData.get("position")
        const icon = formData.get("icon")
        const status = formData.get("status")

        console.log("name and all", name, parentCategory, position, icon, status)


        // Check which fields are being updated and update them
        if (name) existingCategory.name = name.toLowerCase();

        if (parentCategory !== null && parentCategory !== undefined) {
            // Set parentCategory to a valid ObjectId, ensuring it exists in the 'Category' model
            const categoryExists = await Category.findOne({ name: parentCategory });
            console.log("category exists", categoryExists);
            if (categoryExists) {
                existingCategory.parentCategory = parentCategory._id;
            } else {
                return NextResponse.json("Error: Invalid parentCategory");
            }
        }

        
        if (position) existingCategory.position = position;
        if (status) existingCategory.status = status;

        if (icon) {
            console.log("1")
            const fileName = `${categoryId}_${Date.now()}_${icon.name}`;
            console.log("filename", fileName)

            // Move the uploaded file to the destination folder
            const destinationPath = path.join("public/uploads", fileName);
            console.log("destination path", destinationPath)

            // Get the file buffer and write it to the destination folder
            const fileBuffer = await icon.arrayBuffer();
            await fs.writeFile(destinationPath, new Uint8Array(fileBuffer));

            existingCategory.icon = `${fileName}`;
        }

        // Save the updated item back to the database
        const updatedCategory = await existingCategory.save();


        console.log("updatedCategory", updatedCategory)
        return NextResponse.json("Category edited");


        // if (name) existingItem.name = name.toLowerCase();

        // if (parentCategory !== null) {
        //     const categoryExists = await Category.findOne({name:parentCategory});
        //     if (categoryExists) {
        //         existingItem.parentCategory = parentCategory._id;
        //     } else {
        //         return NextResponse.json("Error: Invalid parentCategory");
        //     }
        // } else {
        //     existingItem.parentCategory = null;
        // }

        // if (position !== null) existingItem.position = position;
        // if (icon) existingItem.image = icon;
        // if (status) existingItem.status = status;

        // // Save the updated item back to the database
        // const updatedItem = await existingItem.save();
        // console.log(updatedItem)

        // return NextResponse.json("Category edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}