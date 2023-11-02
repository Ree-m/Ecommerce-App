import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/User";

connectMongo();


export async function GET() {
    try {
        const users = await User.find()
        console.log(users)
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}