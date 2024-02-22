"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_js_1 = require("../controllers/article/articleController.js");
const roles_js_1 = __importDefault(require("../utils/roles.js"));
const authorization_js_1 = __importDefault(require("../middlewares/authorization.js"));
const adminPermission_js_1 = __importDefault(require("../middlewares/adminPermission.js"));
const articleValidator_js_1 = __importDefault(require("../controllers/article/articleValidator.js"));
const router = express_1.default.Router();
router
    .post("/", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.USER, roles_js_1.default.ADMIN), articleValidator_js_1.default, articleController_js_1.createArticle)
    .get("/", articleController_js_1.getArticles)
    .get("/:id", articleController_js_1.getUniqueArticle)
    .delete("/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.USER, roles_js_1.default.ADMIN), articleController_js_1.deleteArticle)
    .patch("/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.USER), authorization_js_1.default, articleController_js_1.updateArticle);
exports.default = router;
