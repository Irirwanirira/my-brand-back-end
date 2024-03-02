"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const { UNAUTHORIZED, FORBIDDEN } = http_status_1.default;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization === undefined || req.headers.authorization === null) {
        return res.status(UNAUTHORIZED).json({
            status: 'fail',
            message: 'Unauthorized'
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === undefined || token === null) {
        return res.status(UNAUTHORIZED).json({
            status: 'fail',
            message: 'Unauthorized'
        });
    }
    else {
        jsonwebtoken_1.default.verify(token.substring(1, token.length - 1), process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(FORBIDDEN).json({ status: 'fail',
                    message: err.message + ", " + err.name
                });
            }
            else if (decoded) {
                req.body.userId = decoded.userId;
                req.body.email = decoded.userEmail;
                req.body.role = decoded.roles;
                next();
            }
            else {
                res.status(UNAUTHORIZED).json({
                    status: 'fail',
                    message: "Token might be either expired or invalid, please login again to get a new token"
                });
            }
        });
    }
});
exports.default = auth;
