import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json("test")
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }
}