import { model, Schema, Document } from "mongoose";
// import Comment from "./commentModel.js";

interface ArticleType extends Document {
  title: string;
  image: string;
  description: string;
  date: string;
  comments: [];
}

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    post_date: {
      type: Date,
      default: Date.now(),
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
        required: true,
      }
    ]
  },
  { timestamps: true }
);
const Articles = model<ArticleType>("Articles", ArticleSchema);
export default Articles;
