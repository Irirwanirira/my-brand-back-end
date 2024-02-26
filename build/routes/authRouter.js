"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/user/userController");
const roles_1 = __importDefault(require("../utils/roles"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const userValidator_1 = require("../controllers/user/userValidator");
const router = express_1.default.Router();
router
    .post("/register", userValidator_1.userValidator, userController_1.registerUser)
    .post("/login", userValidator_1.loginValidator, userController_1.loginUser)
    .get("/logout", userController_1.logout)
    .get("/google", userController_1.googleAuth)
    .get("/users", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), userController_1.getUsers)
    .get("/user/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.USER, roles_1.default.ADMIN), userController_1.getUniqUser)
    .delete("/delete/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), userController_1.deleteUser)
    .patch("/update/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.USER, roles_1.default.ADMIN), userController_1.updateUser);
exports.default = router;
