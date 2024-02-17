import { model, Schema, Document } from "mongoose";

interface CommentType extends Document {
  comment: string;
  author: string;
}

const CommentSchema = new Schema(
  {
    comment: {
        type: String,
        required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Comment = model<CommentType>("Comments", CommentSchema);
export default Comment;
