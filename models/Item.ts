import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref:'Category',
        // default:'null'
    },

    position: {
        type: Number,
        required: true,
        // unique:true

    },
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
        required: true

    }, status: {
        type: String,
        required: true
    },
    description:{
        type: String,
    }
}, {
    timestamps: true
}
);


const Item = models.Item || model("Item", ItemSchema);

export default Item;
