"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidator = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi_1.default.string().email().trim(true).required(),
    password: joi_1.default.string().min(7).trim(true).required(),
});
const login = joi_1.default.object({
    email: joi_1.default.string().email().trim(true).required(),
    password: joi_1.default.string().min(7).trim(true).required(),
});
const userValidator = (req, res, next) => {
    const payload = req.body;
    const { error } = registerValidator.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
exports.userValidator = userValidator;
const loginValidator = (req, res, next) => {
    const payload = req.body;
    const { error } = login.validate(payload);
    if (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.details[0].message,
        });
    }
    next();
};
exports.loginValidator = loginValidator;
