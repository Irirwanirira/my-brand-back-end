import { Schema, model, Document } from "mongoose";

interface Message extends Document{
    name: string;
    email: string;
    message: string;
    date: string
}

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
    date:{
        type: Date,
        default: new Date(),
    },
    time:{
        type: String,
        default: new Date().toLocaleTimeString(),
    }
}, {timestamps: true}
)

const Messages= model<Message>("Message", MessageSchema)
export default Messages