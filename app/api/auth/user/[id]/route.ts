import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";
import fs from "fs";
import multer from "multer";

const upload = multer({ dest: "public/uploads" }); 


connectMongo()


// delete a user
export async function DELETE(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const itemId = url?.split("/").pop();
        console.log("itemId", itemId)

        const item = await User.deleteOne({ _id: itemId });
        if (item === null) {
            return NextResponse.json({ message: "User does not exist" });
        }

        return NextResponse.json({ message: "User deleted", item });
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }
}

// edit a profile
export async function PUT(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const userId = url?.split("/").pop();
        console.log("userId", userId)
        const { name, email, address, phone } = await request.json();
        console.log("1")
        console.log(name, email, address, phone)
        console.log("2")
        

        // Retrieve the existing item from the database
        const existingUser = await User.findOne({ _id: userId });
        console.log("existsinguser",existingUser)

        // Check which fields are being updated and update them
        if (name) existingUser.name = name;
        if (email) existingUser.email = email;
        if (address) existingUser.address = address;
        if (phone) existingUser.phone = phone;


        // Save the updated item back to the database
        const updatedUser = await existingUser.save();

        console.log("updatedUser", updatedUser)
        return NextResponse.json("User edited");
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}

// fetch one user

export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const userId = url?.split("/").pop();
        console.log("userId", userId)

        const user = await User.find({ _id: userId }).select('-password')
        console.log(user)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}