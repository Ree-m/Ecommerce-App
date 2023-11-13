import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { NextRequest, NextResponse } from "next/server";
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { OrderInterface } from '../../admin/orders/route';
// generate pdf
async function generateReceipt(orderDetails:any) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a new page
    const page = pdfDoc.addPage([800, 800]);

    // Draw the receipt content
    const { width, height } = page.getSize();
    const fontsize = 30;
    const orderDetailsText = JSON.stringify(orderDetails, null, 2); 
    page.drawText(orderDetailsText, {
        x: 50,
        y: height - 4 * fontsize,
        size: fontsize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}

// fetch pdf receipt
export async function GET(request: NextRequest) {


    const { url } = request;
    console.log("url", url);

    const orderId: string | undefined = url?.split("/").pop();
    console.log("orderId", orderId);
    const orderIdObjectId = new mongoose.Types.ObjectId(orderId)
    const orderDetails:OrderInterface[] = await Order.find({ _id: orderIdObjectId })

    console.log("orderDetails", orderDetails)
    const pdfBytes = await generateReceipt(orderDetails);
    console.log("pdfBytes", pdfBytes)
    try {
        return new NextResponse(pdfBytes,{
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="receipt.pdf"',
            }},
        );

    } catch (error) {
        console.error("Pdf errror",error);
        return NextResponse.json('Internal server error')
    }
}