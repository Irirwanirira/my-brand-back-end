"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validArticle = joi_1.default.object({
    title: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    author: joi_1.default.string().required()
});
const articleValidator = (req, res, next) => {
    const payload = { title: req.body.title, image: req.body.image, description: req.body.description, author: req.body.userId };
    const { error } = validArticle.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
exports.default = articleValidator;
