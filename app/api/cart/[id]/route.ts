import mongoose, { ObjectId } from "mongoose";
import { NextResponse } from "next/server";
import connectMongo from "@/utils/connectMongo";
import { Cart } from "@/models/Cart";
import User from "@/models/User";
import { UserInterface } from "../../auth/register/route";
connectMongo()

export interface Cart {
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
        // const cartItems: CartItemInterface[] = await Cart.find({ userId: userIdObjectId })
        console.log("heereererererererer")
        const cartItems = await Cart.aggregate([
            {
                $match: {
                    userId: userIdObjectId,
                },
            },
        ])

        console.log(cartItems)
        return NextResponse.json(cartItems)
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
        console.log('itemid here',name,itemId,price,quantity,image)
        const itemIdObjectId: object = new mongoose.Types.ObjectId(itemId);


        const userIdObjectId: object = new mongoose.Types.ObjectId(userId);

        const user: UserInterface | null = await User.findOne({ _id: userIdObjectId });
        console.log("user here", user);

        if (!user) {
            return NextResponse.json("User not found");
        }
        console.log("userIdObjectId", userIdObjectId, userId)
        // Find the user's cart or create one if it doesn't exist
        let cart: Cart | null = await Cart.findOne({ userId: userIdObjectId });
        console.log("cart here", cart)

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = await Cart.create({ userId:userIdObjectId, items: [] });

        }

        // Check if the product is already in the cart
        const existingItem = cart.items.find((item: CartItemInterface) => {
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

        return NextResponse.json("Cart Item added");
    } catch (error) {
        console.log(error);
        return NextResponse.json(`Error: ${error}`);
    }
}


// delete item from cart

export async function DELETE(request: Request) {
    try {

        const { url } = request;
        console.log("url", url)

        const userId: string | undefined = url?.split("/").pop();
        console.log("userId delete", userId)
        const { itemId } = await request.json();
        console.log("itemId delete",itemId)


        // find cart of current user
        const userIdObjectId: object = new mongoose.Types.ObjectId(userId);

        console.log(userId,userIdObjectId ,"checking for delete cart", itemId);

        let cart: Cart |null = await Cart.findOne({ userId: userIdObjectId });


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
