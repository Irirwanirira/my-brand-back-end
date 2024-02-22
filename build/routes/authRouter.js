"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/user/userController.js");
const roles_js_1 = __importDefault(require("../utils/roles.js"));
const authorization_js_1 = __importDefault(require("../middlewares/authorization.js"));
const adminPermission_js_1 = __importDefault(require("../middlewares/adminPermission.js"));
const userValidator_js_1 = require("../controllers/user/userValidator.js");
const router = express_1.default.Router();
router
    .post("/register", userValidator_js_1.userValidator, userController_js_1.registerUser)
    .post("/login", userValidator_js_1.loginValidator, userController_js_1.loginUser)
    .get("/logout", userController_js_1.logout)
    .get("/users", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.ADMIN), userController_js_1.getUsers)
    .get("/user/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.USER, roles_js_1.default.ADMIN), userController_js_1.getUniqUser)
    .delete("/delete/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.ADMIN), userController_js_1.deleteUser)
    .patch("/update/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.USER, roles_js_1.default.ADMIN), userController_js_1.updateUser);
exports.default = router;
