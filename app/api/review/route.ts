import { NextResponse, NextRequest } from "next/server";
import Review from "@/models/Review";
import connectMongo from "@/utils/connectMongo";
export interface ReviewInterface {
    save(): unknown,
    name: string,
    phone: number,
    message: number,
    restaurant: string
}
connectMongo();

export async function POST(request: Request) {

    try {
        const { message, name, phone, restaurant,rating } = await request.json();

        const reviewArr: ReviewInterface[] = await Review.create({
            name,
            phone,
            message,
            restaurant,
            rating
        })

       await reviewArr.save()
        console.log("Review added")
        return NextResponse.json({ message: "Review added", review })
    } catch (error) {
        console.log("error", error)
        return NextResponse.json(`Error:${error}`)
    }
}

export async function GET() {
    try {
        const reviews: ReviewInterface[] = await Review.find()
        console.log(reviews)
        return NextResponse.json(reviews)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}