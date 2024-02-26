"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swaggerDoc/swagger-output.json"));
const messageRouter_1 = __importDefault(require("./messageRouter"));
const articleRouter_1 = __importDefault(require("./articleRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
const router = express_1.default.Router();
router.use("/auth", authRouter_1.default);
router.use("/message", messageRouter_1.default);
router.use("/article", articleRouter_1.default);
router.use("/comment", commentRouter_1.default);
router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
exports.default = router;
