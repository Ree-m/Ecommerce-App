


import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";
import fs from "fs/promises"; // Use fs.promises for async file operations
import multer from "multer";
import path from "path";

const upload = multer({ dest: "public/uploads" });

connectMongo();

// Edit the avatar for a user
export async function PUT(request: Request) {
    try {
        const { url } = request;
        console.log("url", url);

        const userId = url?.split("/").pop();
        console.log("userId", userId);
        const formData = await request.formData();
        const image = formData.get("image");
        console.log("image", image);

        if (image) {
            console.log("1")
            const fileName = `${userId}_${Date.now()}_${image.name}`;
            console.log("filename", fileName)

            // Move the uploaded file to the destination folder
            const destinationPath = path.join("public/uploads", fileName);
            console.log("destination path", destinationPath)

            // Get the file buffer and write it to the destination folder
            const fileBuffer = await image.arrayBuffer();
            await fs.writeFile(destinationPath, new Uint8Array(fileBuffer));


            // Update the user's profile with the file path
            const existingUser = await User.findOne({ _id: userId });
            console.log("existing user", existingUser)
            if (existingUser) {
                existingUser.image = `${fileName}`; // Assuming the path you want to store in the database
                await existingUser.save();
            }

            return NextResponse.json({ message: "User edited", image });
        } else {
            // Handle the case when no image is uploaded
            return NextResponse.json({ message: "No image uploaded" });
        }
    } catch (error) {
        return NextResponse.json(`Error:${error}`);
    }
}
