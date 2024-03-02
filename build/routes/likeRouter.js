"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/like/likeController");
const roles_1 = __importDefault(require("../utils/roles"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const router = express_1.default.Router();
router
    .post("/:articleId", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN, roles_1.default.USER), likeController_1.addLike)
    .delete("/:articleId", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN, roles_1.default.USER), likeController_1.unlike);
exports.default = router;
