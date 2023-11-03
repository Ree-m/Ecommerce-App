import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
   
    name: {
        type: String,
        // required: true,
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default:'null'
    },

    icon: {
        type: String,
        // required: true
    },
    position:{
        type:Number,
        // required:true,
        unique:true
    },
    status: {
        type: String,
        // required: true
    }
}, {
    timestamps: true
}
);


const Category = models.Category || model("Category", CategorySchema);

export default Category;
