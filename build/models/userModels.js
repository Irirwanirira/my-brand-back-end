import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePhoto: {
        type: String,
    },
}, { timestamps: true });
const Users = model("User", UserSchema);
export default Users;
