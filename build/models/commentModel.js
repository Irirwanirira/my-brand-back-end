import { model, Schema } from "mongoose";
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Comment = model("Comments", CommentSchema);
export default Comment;
