import { model, Schema, Document } from "mongoose";

interface LikeType extends Document {
    user: {},
    article: {},
}

const LikeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    article: {type:Schema.Types.ObjectId, ref: "Articles"},
},
{   timestamps: true}
);
const Likes = model<LikeType>("Likes", LikeSchema);
export default Likes;
