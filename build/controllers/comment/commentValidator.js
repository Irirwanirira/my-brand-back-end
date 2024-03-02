"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validator = joi_1.default.object({
    content: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
});
const commentValidator = (req, res, next) => {
    const payload = { content: req.body.content, author: req.body.userId };
    const { error } = validator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: "fail",
            message: error.details[0].message,
        });
    }
    next();
};
exports.default = commentValidator;
