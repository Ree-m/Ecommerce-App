import { NextResponse } from "next/server";
import connectMongo from '@/utils/connectMongo'

export async function GET() {
    try {
        connectMongo()
        return NextResponse.json("test")
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}