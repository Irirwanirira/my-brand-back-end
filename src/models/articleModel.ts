import { model, Schema, Document } from "mongoose";

export interface ArticleType extends Document {
  title: string;
  image: string;
  description: string;
  date: string;
  author: string
  comments: [];
  likes: []
  isDeleted: boolean;
  deletedAt: Date;
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
      default: new Date(),
    },
    author:{
      type: Schema.Types.ObjectId, ref: "User",
      required: true
    },

    comments: [{
      type: Schema.Types.ObjectId, ref: "Comments",
      required: true
    }],

    likes: [{
      type: Schema.Types.ObjectId, ref: 'User',
      required: true
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },

  },
  { timestamps: true }
);
const Articles = model<ArticleType>("Article", ArticleSchema);
export default Articles;
