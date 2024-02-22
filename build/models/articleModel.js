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
        default: Date.now(),
    },
    comments: []
}, { timestamps: true });
const Articles = (0, mongoose_1.model)("Articles", ArticleSchema);
exports.default = Articles;
