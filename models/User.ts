import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:8,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:'user',
        required:true
    }
},{
    timestamps:true
}
);


const User= models.User || model("User", UserSchema);

export default User;
