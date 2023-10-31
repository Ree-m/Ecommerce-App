import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({

    serialNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: String,
    },
    position: {
        type: Number,
        required: true,
        unique:true

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
    }
}, {
    timestamps: true
}
);


const Item = models.Item || model("Item", ItemSchema);

export default Item;
