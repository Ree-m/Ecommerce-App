import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true

    },
    totalPrice: {
        type: Number,
        // required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    message: {
        type: String

    },

},{
    timestamps: true
});



export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
