import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required:true
    },
    role: {
        type: String,
        default: 'user',
        // required:true
    },
    phone: {
        type: Number,
        // required:true
    },
    userStatus: {
        types: String,

    },
    image: {
        type: String,
        default: "default-image.png"
    },
    address: {
        type: String,

    }
}, {
    timestamps: true
}
);


const User = models.User || model("User", UserSchema);

export default User;
