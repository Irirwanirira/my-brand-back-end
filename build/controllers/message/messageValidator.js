"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validator = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi_1.default.string().email().trim(true).required(),
    message: joi_1.default.string().required(),
});
const messageValidator = (req, res, next) => {
    const payload = { name: req.body.name, email: req.body.email, message: req.body.message };
    const { error } = validator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
exports.default = messageValidator;
