"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString(),
    }
}, { timestamps: true });
const Messages = (0, mongoose_1.model)("Message", MessageSchema);
exports.default = Messages;
