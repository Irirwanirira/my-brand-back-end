"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_js_1 = require("../controllers/comment/commentController.js");
const commentValidator_js_1 = __importDefault(require("../controllers/comment/commentValidator.js"));
const router = express_1.default.Router();
router
    .post("/article/:id/comment", commentValidator_js_1.default, commentController_js_1.addComment)
    .delete("/:id/comment/:commentId", commentController_js_1.deleteComment);
exports.default = router;
