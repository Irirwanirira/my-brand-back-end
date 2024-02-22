"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_js_1 = require("../controllers/message/messageController.js");
const roles_js_1 = __importDefault(require("../utils/roles.js"));
const authorization_js_1 = __importDefault(require("../middlewares/authorization.js"));
const adminPermission_js_1 = __importDefault(require("../middlewares/adminPermission.js"));
const messageValidator_js_1 = __importDefault(require("../controllers/message/messageValidator.js"));
const router = express_1.default.Router();
router
    .post("/", messageValidator_js_1.default, messageController_js_1.createMessage)
    .get("/", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.ADMIN), messageController_js_1.getMessages)
    .get("/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.ADMIN), messageController_js_1.getUniqueMessage)
    .delete("/:id", authorization_js_1.default, (0, adminPermission_js_1.default)(roles_js_1.default.ADMIN), messageController_js_1.deleteMessage);
exports.default = router;
