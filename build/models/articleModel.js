import { model, Schema } from "mongoose";
const ArticleSchema = new Schema({
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
}, { timestamps: true });
const Articles = model("Articles", ArticleSchema);
export default Articles;
