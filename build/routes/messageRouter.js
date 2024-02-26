"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/message/messageController");
const roles_1 = __importDefault(require("../utils/roles"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const adminPermission_1 = __importDefault(require("../middlewares/adminPermission"));
const messageValidator_1 = __importDefault(require("../controllers/message/messageValidator"));
const router = express_1.default.Router();
router
    .post("/", messageValidator_1.default, messageController_1.createMessage)
    .get("/", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), messageController_1.getMessages)
    .get("/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), messageController_1.getUniqueMessage)
    .delete("/:id", authorization_1.default, (0, adminPermission_1.default)(roles_1.default.ADMIN), messageController_1.deleteMessage);
exports.default = router;
