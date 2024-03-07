"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ArticleSchema = new mongoose_1.Schema({
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
    author: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: "Comments",
            required: true
        }],
    likes: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'User',
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
}, { timestamps: true });
const Articles = (0, mongoose_1.model)("Article", ArticleSchema);
exports.default = Articles;
