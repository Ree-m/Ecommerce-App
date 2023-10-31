import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Category from "@/models/Category";

connectMongo()

export async function DELETE(request) {
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

export async function PUT(request) {
    try {
        const { url } = request;
        console.log("url", url)

        const categoryId = url?.split("/").pop();
        console.log("categoryId", categoryId)
        const { name, parentCategory, icon, position, status } = await request.json();

        const updatedCategory = await Category.updateOne({ _id: categoryId }, { name, parentCategory, icon, position, status });
        return NextResponse.json({ message: "Category updated", updatedCategory });
    } catch (error) {
        return NextResponse.json(`Error:${error}`)

    }

}