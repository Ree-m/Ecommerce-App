import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
    message: {
        type: String,

    },
    restaurant: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    rating:{
        type:Number,
        required:true
    }
}, {
    timestamps: true
}
);


const Review = models.Review || model("Review", ReviewSchema);

export default Review;
