"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LikeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    article: { type: mongoose_1.Schema.Types.ObjectId, ref: "Articles" },
}, { timestamps: true });
const Likes = (0, mongoose_1.model)("Likes", LikeSchema);
exports.default = Likes;
