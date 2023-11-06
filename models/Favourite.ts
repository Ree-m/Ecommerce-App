import mongoose, { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
        required: true

    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    itemId:{
        type: mongoose.Types.ObjectId,
        ref:'Item'
    }
}, {
    timestamps: true
}
);

export const Favourite = mongoose.models.Favourite || mongoose.model('Favourite', FavouriteSchema);
