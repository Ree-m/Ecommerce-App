import mongoose, { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },
    },
  ],
});


// const Cart = models.Category || model("Cart", CartSchema);

// export default Cart;
export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
