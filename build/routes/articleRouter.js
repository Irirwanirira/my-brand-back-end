"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/article/articleController");
const roles_1 = __importDefault(require("../utils/roles"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const articleValidator_1 = __importDefault(require("../controllers/article/articleValidator"));
const router = express_1.default.Router();
router
    .post("/", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), articleValidator_1.default, articleController_1.createArticle)
    .get("/", articleController_1.getArticles)
    .get("/:id", articleController_1.getUniqueArticle)
    .delete("/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), articleController_1.deleteArticle)
    .patch("/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), authorization_1.default, articleController_1.updateArticle);
exports.default = router;
