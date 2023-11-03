import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
    message:{
        type:String,
        
    }
},{
    timestamps:true
}
);


const Review= models.User || model("Review", ReviewSchema);

export default Review;
