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
        required:true
    },
    role:{
        type:String,
        default:'user',
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    userStatus:{
        types:String,

    },
    profileImage:{
        type:String,
    },
    address:{
    type:String,
    required:true
    }
},{
    timestamps:true
}
);


const User= models.User || model("User", UserSchema);

export default User;
