"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: String,
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Article" },
}, { timestamps: true });
const Comments = (0, mongoose_1.model)("Comments", CommentSchema);
exports.default = Comments;
