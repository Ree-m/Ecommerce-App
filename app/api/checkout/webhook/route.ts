// // // server.js
// // //
// // // Use this sample code to handle webhook events in your integration.
// // //
// // // 1) Paste this code into a new file (server.js)
// // //
// // // 2) Install dependencies
// // //   npm install stripe
// // //   npm install express
// // //
// // // 3) Run the server on http://localhost:4242
// // //   node server.js

// import { NextRequest, NextResponse } from "next/server";
// require("dotenv").config();
// import { Order } from "@/models/Order";
// // // The library needs to be configured with your account's secret key.
// // // Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');


// // // If you are testing your webhook locally with the Stripe CLI, you can find the
// // // endpoint's secret by running `stripe listen`. Otherwise, find your
// // // endpoint's secret in your webhook settings in the Developer Dashboard
// // let endpointSecret: string;

// // endpointSecret = " whsec_d65b435566d1b51589270562bacfe6c0b0b5a8568e02ed4809ab7b879917cf46";
// // export async function POST(request: NextRequest, response: NextResponse) {
// //   const sig = request.headers['stripe-signature'];

// //   let data;
// //   let eventType;

// //   if (endpointSecret) {
// //     let event;


// //     try {
// //       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
// //       console.log("webhook verified")
// //     } catch (err: any) {
// //       console.log("webhook error", err)

// //       return NextResponse.json(`Webhook Error: ${err.message}`);
// //     }
// //     data = request.body.data.object;
// //     eventType = request.body.type;


// //   } else {
// //     data = request.body.data.object;
// //     eventType = request.body.type;
// //   }


// //   // handle the event
// //   if (eventType == "checkout.session.completed") {
// //     stripe.customers.retrieve(data.customer).then((customer:any)=>{
// //       console.log(customer)
// //       console.log("data",data)
// //     })
// //     .catch((error:any)=>console.log(error.message))
// //   }

// //   // Return a 200 response to acknowledge receipt of the event
// //   return NextResponse.json("OK")
// // };



// const createOrder = async (customer, data) => {
//   const Items = JSON.parse(customer.metadata.cart);

//   const products = Items.map((item) => {
//     return {
//       productId: item.id,
//       quantity: item.cartQuantity,
//     };
//   });

//   const newOrder = new Order({
//     userId: customer.metadata.userId,
//     // customerId: data.customer,
//     // paymentIntentId: data.payment_intent,
//     // products,
//     // subtotal: data.amount_subtotal,
//     // total: data.amount_total,
//     // shipping: data.customer_details,
//     // payment_status: data.payment_status,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log("Processed Order:", savedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Stripe webhoook

//   export async function POST (req, res){
//     let data;
//     let eventType;

//     // Check if webhook signing is configured.
//     let webhookSecret;
//     //webhookSecret = process.env.STRIPE_WEB_HOOK;

//     if (webhookSecret) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let event;
//       let signature = req.headers["stripe-signature"];

//       try {
//         event = stripe.webhooks.constructEvent(
//           req.body,
//           signature,
//           webhookSecret
//         );
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed:  ${err}`);
//         return res.sendStatus(400);
//       }
//       // Extract the object from the event.
//       data = event.data.object;
//       eventType = event.type;
//     } else {
//       // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//       // retrieve the event data directly from the request body.
//       data = req.body.data.object;
//       eventType = req.body.type;
//     }

//     // Handle the checkout.session.completed event
//     if (eventType === "checkout.session.completed") {
//       stripe.customers
//         .retrieve(data.customer)
//         .then(async (customer) => {
//           try {
//             // CREATE ORDER
//             createOrder(customer, data);
//           } catch (err) {
//             console.log(typeof createOrder);
//             console.log(err);
//           }
//         })
//         .catch((err) => console.log(err.message));
//     }

//     return NextResponse.json("Ok");
//   }


import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    
    if (event.type === "checkout.session.completed") {
      // if (!event.data.object.customer_details.email) {
      //   throw new Error(`missing user email, ${event.id}`);
      // }
      stripe.customers
        .retrieve(req.body.data.object.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            console.log('create order here',req.body.data.object.customer,"customer",customer)

          } catch (err) {
            console.log(err);
          }
        })
     
      console.log("heheheehehehehe")
    }
    
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
