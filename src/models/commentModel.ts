import { model, Schema, Document } from "mongoose";

interface CommentType extends Document {
    content: string,
    author: {}
    post: {}
}

const CommentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: "Users"},
    post: {type:Schema.Types.ObjectId, ref: "Articles"},
},
{   timestamps: true}
);
const Comments = model<CommentType>("Comments", CommentSchema);

export default Comments;
