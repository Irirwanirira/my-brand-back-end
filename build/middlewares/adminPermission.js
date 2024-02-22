"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const { UNAUTHORIZED } = http_status_1.default;
function permit(...allowed) {
    const isAllowed = (role) => allowed.indexOf(role) > -1;
    return (req, res, next) => {
        if (req.body) {
            if (req.body.role === "admin") {
                return next();
            }
            if (isAllowed(req.body.role)) {
                return next();
            }
        }
        return res.status(UNAUTHORIZED).json({
            status: "fail",
            message: "Only admin can access this route",
        });
    };
}
exports.default = permit;
