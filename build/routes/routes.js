"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swaggerDoc/swagger-output.json"));
const messageRouter_js_1 = __importDefault(require("./messageRouter.js"));
const articleRouter_js_1 = __importDefault(require("./articleRouter.js"));
const authRouter_js_1 = __importDefault(require("./authRouter.js"));
const commentRouter_js_1 = __importDefault(require("./commentRouter.js"));
const router = express_1.default.Router();
router.use("/auth", authRouter_js_1.default);
router.use("/message", messageRouter_js_1.default);
router.use("/article", articleRouter_js_1.default);
router.use("/comment", commentRouter_js_1.default);
router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
exports.default = router;
