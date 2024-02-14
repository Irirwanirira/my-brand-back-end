import { Schema } from "mongoose";
class MyArticle {
    constructor(title, image, description, date) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.date = date;
    }
}
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
