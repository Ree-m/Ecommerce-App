import { NextResponse } from "next/server";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
import fs from "fs/promises";
import path from "path";

connectMongo();

export async function POST(request: Request) {

    try {

        const formData = await request.formData();
        const name = formData.get("name");
        const parentCategory = formData.get("parentCategory")
        const position = formData.get("position")
        const icon = formData.get("icon")
        const status = formData.get("status")

        console.log("name and all", name, parentCategory, position, icon, status)
        const category = await Category.findOne({ name: parentCategory });


        const fileName = `${Date.now()}_${icon?.name}`;
        console.log("filename", fileName)

        // Move the uploaded file to the destination folder
        const destinationPath = path.join("public/uploads", fileName);
        console.log("destination path", destinationPath)

        // Get the file buffer and write it to the destination folder
        const fileBuffer = await icon?.arrayBuffer();
        await fs.writeFile(destinationPath, new Uint8Array(fileBuffer));


        const categoryDoc = await Category.create({
            name: name?.toLowerCase(),
            parentCategory: category ? category._id : null,
            position,
            icon: fileName,
            status
        })
        console.log(categoryDoc)

        categoryDoc.save()
        console.log("Category added")
        return NextResponse.json("Category added")

        // const { name, parentCategory, icon, position, status } = await request.json();

        // console.log("server, position", position, name)
        // const category = await Category.findOne({ name: parentCategory });

        // const categoryDoc = await Category.create({
        //     name:name.toLowerCase(),
        //     parentCategory: category ? category._id : null,
        //     icon,
        //     position,
        //     status
        // })
        // console.log(categoryDoc)

        // categoryDoc.save()
        // console.log("Category added")
        // return NextResponse.json("Category added")
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