"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/comment/commentController");
const roles_1 = __importDefault(require("../utils/roles"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const commentValidator_1 = __importDefault(require("../controllers/comment/commentValidator"));
const router = express_1.default.Router();
router
    .post("/article/:id/comment", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN, roles_1.default.USER), commentValidator_1.default, commentController_1.addComment)
    .delete("/:id/comment/:commentId", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), commentController_1.deleteComment);
exports.default = router;
