import { NextRequest, NextResponse } from "next/server";
import { Favourite } from "@/models/Favourite";
import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
connectMongo()

// add item to favourites
export async function POST(request: Request) {
    const { url } = request;

    console.log("url", url);

    const userId: string | undefined = url?.split("/").pop();
    console.log("userId", userId);

    if (!userId) {
        return NextResponse.json("User ID not provided");
    }


    try {
        const { itemId, name, price, image } = await request.json();
        console.log("favourite values", name, price, image, itemId)
        const itemIdObectId = new mongoose.Types.ObjectId(itemId)
        const favouriteExists = await Favourite.findOne({ itemId: itemIdObectId });

        if (favouriteExists) {
            return NextResponse.json("Favourite already exists")
        }
        const favourite = await Favourite.create({
            name,
            price,
            itemId,
            userId,
            image
        });
        await favourite.save();
        console.log("Added to favourite");
        return NextResponse.json(favourite);
    } catch (error) {
        console.log("Adding to favourite failed", error);
        return NextResponse.json(error);

    }
}

export async function GET(request: Request) {

    const { url } = request
    const userId = url?.split("/").pop()
    const userIdObjectId = new mongoose.Types.ObjectId(userId)
    try {
        console.log("userId", userId, userIdObjectId)

        const favourite = await Favourite.aggregate([
            {
                $match: {
                    userId: userIdObjectId,
                },
            },
        ])

        return NextResponse.json(favourite)

    } catch (error) {
        console.log("Fetching favourite failed", error);
        return NextResponse.json(error);

    }

}



export async function DELETE(request: Request) {

    const { url } = request
    const userId = url?.split("/").pop()
    const userIdObjectId = new mongoose.Types.ObjectId(userId)
    const { itemId } = await request.json();

    try {
        console.log("userId", userId, userIdObjectId)
        const itemIdObjectId = new mongoose.Types.ObjectId(itemId)
        const favourite = await Favourite.deleteOne({ itemId: itemIdObjectId })

        if (!favourite) {
            return NextResponse.json("Favourite to delete not found")
        }

        return NextResponse.json("Deleted favourite")

    } catch (error) {
        console.log("Fetching favourite failed", error);
        return NextResponse.json(error);

    }

}

