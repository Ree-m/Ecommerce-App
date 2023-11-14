import { NextResponse, NextRequest } from "next/server";
import Item from "@/models/Item";
import Category from "@/models/Category";
import connectMongo from "@/utils/connectMongo";
import fs from "fs/promises";
import multer from "multer";
import path from "path";

connectMongo();

export async function POST(request: Request) {

    try {
        const formData = await request.formData();
        const name = formData.get("name");
        const parentCategory = formData.get("parentCategory")
        const position = formData.get("position")
        const price = formData.get("price")
        const image = formData.get("image")
        const status = formData.get("status")

        console.log("name and all", name, parentCategory, position, price, image, status)
        const category = await Category.findOne({ name: parentCategory });


        const fileName = `${Date.now()}_${image?.name}`;
        console.log("filename", fileName)

        // Move the uploaded file to the destination folder
        const destinationPath = path.join("public/uploads", fileName);
        console.log("destination path", destinationPath)

        // Get the file buffer and write it to the destination folder
        const fileBuffer = await image?.arrayBuffer();
        await fs.writeFile(destinationPath, new Uint8Array(fileBuffer));


        const itemDoc = await Item.create({
            name: name?.toLowerCase(),
            parentCategory: category ? category._id : null,
            position,
            price,
            image: fileName,
            status
        })
        console.log(itemDoc)

        itemDoc.save()
        console.log("Item added")

        return NextResponse.json("Item added")

        // const { name, parentCategory, position, price, image, status } = await request.json();

        // console.log("name, parentCategory, position, price, image, status", name, parentCategory, position, price, image, status)
        // const category = await Category.findOne({ name: parentCategory });

        // const itemDoc = await Item.create({
        //     name:name.toLowerCase(),
        //     parentCategory: category ? category._id : null,
        //     position,
        //     price,
        //     image,
        //     status
        // })
        // console.log(itemDoc)

        // itemDoc.save()
        // console.log("Item added")
        // return NextResponse.json("Item added")
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