import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import { Cart } from "@/models/Cart";
import User from "@/models/User";
import { UserInterface } from "../../auth/register/route";
connectMongo()

export interface CartInterface {
    save(): unknown;
    userId: object,
    items: CartItemInterface[]

}
export interface CartItemInterface {
    itemId: object,
    quantity: number,
    name: string,
    price: number,
    image: string,
}

interface CartRequest {
    name: string;
    itemId: string;
    price: number;
    quantity: number;
    image: string;
}
// fetch all cart items of user
export async function GET(request: Request) {
    try {
        const { url } = request;
        console.log("url", url)

        const userId: string | undefined = url?.split("/").pop();
        const userIdObjectId: object = new mongoose.Types.ObjectId(userId)
        console.log("userId", userId, userIdObjectId)
        const cart:CartInterface[] = await Cart.aggregate([
            {
                $match: {
                    userId: userIdObjectId,
                },
            },
        ])

        console.log(cart)
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json(`Error:${error}`)
    }

}
// add cart item 

export async function POST(request: Request) {
    try {
        const { url } = request;
        console.log("url", url);

        const userId: string | undefined = url?.split("/").pop();
        console.log("userId", userId);

        if (!userId) {
            return NextResponse.json("User ID not provided");
        }

        const { name, itemId, price, quantity, image }: CartRequest = await request.json();
        console.log('itemid here', name, itemId, price, quantity, image)
        const itemIdObjectId: object = new mongoose.Types.ObjectId(itemId);


        const userIdObjectId: object = new mongoose.Types.ObjectId(userId);

        const user: UserInterface | null = await User.findOne({ _id: userIdObjectId });
        console.log("user here", user);

        if (!user) {
            return NextResponse.json("User not found");
        }
        console.log("userIdObjectId", userIdObjectId, userId)
        // Find the user's cart or create one if it doesn't exist
        let cart: CartInterface | null = await Cart.findOne({ userId: userIdObjectId });
        console.log("cart here", cart)

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = await Cart.create({ userId: userIdObjectId, items: [] });

        }

        // Check if the product is already in the cart
        const existingItem = cart && cart.items.find((item: CartItemInterface) => {
            console.log("itemId", item.itemId, "and itemIdObjectId", itemIdObjectId);
            return item.itemId.toString() === itemId;
        });
        console.log("existing item first ", existingItem);
        // const isTrue = new mongoose.Types.ObjectId("654327ff6361af49be61754e") === new mongoose.Types.ObjectId("654327ff6361af49be61754e") //this is false,which is why the objectId needs to be converted to string 
        // If the product is already in the cart, update its quantity
        if (existingItem) {
            console.log("existing item", existingItem);
            existingItem.quantity += quantity;
        } else {
            // Otherwise, add a new product to the cart
            const newCartItem: CartItemInterface = {
                itemId: itemIdObjectId,
                name,
                price,
                quantity,
                image
            };
            console.log("new cart item", newCartItem);

            cart.items.push(newCartItem);
        }

        // Save the cart to the database
        await cart.save();

        return NextResponse.json({ cart });
    } catch (error) {
        console.log(error);
        return NextResponse.json(`Error: ${error}`);
    }
}



// update quantites of cart item
export async function PUT(request: Request) {
    try {

        const { url } = request;
        console.log("url", url)

        const userId: string | undefined = url?.split("/").pop();
        console.log("userId delete", userId)
        const { itemId, quantity }: { itemId: string, quantity: number } = await request.json();
        console.log("itemId and newQuantity", itemId, quantity)


        // find cart of current user
        const userIdObjectId: object = new mongoose.Types.ObjectId(userId);
        const itemIdObjectId: object = new mongoose.Types.ObjectId(itemId);

        console.log(userId, userIdObjectId, "checking for delete cart", itemId, itemIdObjectId);


        // Fetch a users cart 
        const cart: CartInterface | null = await Cart.findOne(
            { userId: userIdObjectId, "items.itemId": itemIdObjectId }
        );

        console.log("updated cart", cart)

        if (cart) {
            // Check if the current quantity is 1 before updating
            const currentQuantity = cart.items.find((item: CartItemInterface) =>
                (item.itemId.toString() === itemId)
            )?.quantity;
            console.log("currentQunaitty", currentQuantity)

            if (currentQuantity === 1&& quantity===-1) {
                console.log("Quantity is already 1, no decrease needed.");
                return NextResponse.json("Cart quantity is 1, no decrease needed")

            } else {
                // Update the cart item quantity
                await Cart.findOneAndUpdate(
                    { userId: userIdObjectId, "items.itemId": itemIdObjectId },
                    { $inc: { "items.$.quantity": quantity } }
                );
                console.log("Cart item updated");
                return NextResponse.json("Cart item updated")

            }
        } else {
            console.log("Cart item not found for the given user and item.");
            return NextResponse.json("Cart item not found for the given user and item.")

        }



    } catch (error) {
        console.log(`Update error:${error}`)
        return NextResponse.json(`Error:${error}`)
    }

}

// // update quantities of cart item
// export async function PUT(request: Request) {
//     try {
//         const { url } = request;
//         console.log("url", url);

//         const userId: string | undefined = url?.split("/").pop();
//         console.log("userId delete", userId);
//         const { itemId, quantity }: { itemId: string, quantity: number } = await request.json();
//         console.log("itemId and newQuantity", itemId, quantity);

//         // find cart of the current user
//         const userIdObjectId: object = new mongoose.Types.ObjectId(userId);
//         const itemIdObjectId: object = new mongoose.Types.ObjectId(itemId);

//         console.log(userId, userIdObjectId, "checking for delete cart", itemId, itemIdObjectId);

//         // Fetch the current cart item
//         const cartItem: Cart | null = await Cart.findOne(
//             { userId: userIdObjectId, "items.itemId": itemIdObjectId }
//         );

//         if (cartItem) {
//             // Check if the current quantity is 1 before updating
//             const currentQuantity = cartItem.items.find((item) =>
//                 (item.itemId as mongoose.Types.ObjectId).equals(itemIdObjectId)
//             )?.quantity;


//             if (currentQuantity === 1) {
//                 console.log("Quantity is already 1, no decrease needed.");
//             } else {
//                 // Update the cart item quantity
//                 await Cart.findOneAndUpdate(
//                     { userId: userIdObjectId, "items.itemId": itemIdObjectId },
//                     { $inc: { "items.$.quantity": quantity } }
//                 );
//                 console.log("Cart item updated");
//             }
//         } else {
//             console.log("Cart item not found for the given user and item.");
//         }

//         return NextResponse.json("Cart item updated");
//     } catch (error) {
//         console.log(`Update error: ${error}`);
//         return NextResponse.json(`Error: ${error}`);
//     }
// }


// delete item from cart

export async function DELETE(request: Request) {
    try {

        const { url } = request;
        console.log("url", url)

        const userId: string | undefined = url?.split("/").pop();
        console.log("userId delete", userId)
        const { itemId } = await request.json();
        console.log("itemId delete", itemId)


        // find cart of current user
        const userIdObjectId: object = new mongoose.Types.ObjectId(userId);

        console.log(userId, userIdObjectId, "checking for delete cart", itemId);

        let cart: CartInterface | null = await Cart.findOne({ userId: userIdObjectId });


        if (!cart) {
            return NextResponse.json("Cart not found");
        }
        // find the product to be deleted
        const itemIndex = cart.items.findIndex(
            (item: CartItemInterface) => item.itemId.toString() === itemId
        );

        if (itemIndex === -1) {
            return NextResponse.json("Item not found in cart");
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return NextResponse.json("Item removed from cart");
    } catch (error) {
        console.log(`Delete error:${error}`)
        return NextResponse.json(`Error:${error}`)
    }
}
