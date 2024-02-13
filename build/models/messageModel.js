import { Schema, model } from "mongoose";
const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    time: String
});
const Messages = model("Message", MessageSchema);
export default Messages;
