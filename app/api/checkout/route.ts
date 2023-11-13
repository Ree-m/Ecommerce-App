import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Cart } from "@/models/Cart";
import stripe from "@/config/stripe";
import mongoose from "mongoose";
import { CartItemInterface } from "../cart/[id]/route";
import { CartInterface } from "../cart/[id]/route";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function POST(req: NextRequest, res: NextResponse) {
    const headersList = headers();
    const { userId, message, email, address, deliveryTime, phone, totalPrice } = await req.json();

    const userIdObjectId: object = new mongoose.Types.ObjectId(userId)
    console.log("userId", userId, userIdObjectId)
    const cart: CartInterface = await Cart.aggregate([
        {
            $match: {
                userId: userIdObjectId,
            },
        },
    ])
    console.log("line items", cart[0].items,)
    const customer = await stripe.customers.create({
        metadata: {
            userId,
            cart: JSON.stringify(cart[0].items),
            message,
            address,
            phone,
            email,
            deliveryTime,
            totalPrice

        }
    })
    console.log("customer", customer)
    const lineItems = cart[0].items.map((item: CartItemInterface) => {
        console.log("line item details", item.name, item.quantity, item.price)

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/checkout/success/${userId}`,
            cancel_url: `http://localhost:3000/cart/${userId}`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Error creating checkout session" });
    }
}


// // generate pdf


// async function generateReceipt(orderDetails) {
//     // Create a new PDF document
//     const pdfDoc = await PDFDocument.create();
//     // Embed the Times Roman font
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

//     // Add a new page
//     const page = pdfDoc.addPage([400, 400]);

//     // Draw the receipt content
//     const { width, height } = page.getSize();
//     const fontsize = 30;
//     page.drawText(orderDetails, {
//         x: 50,
//         y: height - 4 * fontsize,
//         size: fontsize,
//         font: timesRomanFont,
//         color: rgb(0, 0.53, 0.71),
//     });

//     // Serialize the PDF to bytes
//     const pdfBytes = await pdfDoc.save();

//     return pdfBytes;
// }

// // fetch pdf receipt
// export async function GET(req: NextRequest, res: NextResponse) {
//     try {
//         const { message, email, items, address, deliveryTime, phone, totalPrice } = await req.json();

//         if (!message || !email || !items || !address || !deliveryTime || !phone || !totalPrice) {
//             return new NextResponse('Invalid request data', { status: 400 });
//         }


//         const orderDetails = { message, email, items, address, deliveryTime, phone, totalPrice }
//         console.log("orderDetails", orderDetails)
//         const pdfBytes = await generateReceipt(orderDetails);
//         console.log("pdfBytes", pdfBytes)
//         try{
//         return new NextResponse(pdfBytes, {
//             headers: {
//                 'Content-Type': 'application/pdf',
//                 'Content-Disposition': 'attachment; filename="receipt.pdf"',
//             },
//         });

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json('Internal server error', { status: 500 })
//     }
// }