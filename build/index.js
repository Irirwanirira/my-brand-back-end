"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_js_1 = __importDefault(require("./server.js"));
const routes_js_1 = __importDefault(require("./routes/routes.js"));
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    const app = (0, server_js_1.default)();
    app.use((0, cors_1.default)({
        origin: ["*"],
        credentials: true,
    }));
    app.use((0, helmet_1.default)());
    app.use("/api", routes_js_1.default);
})
    .catch((err) => { console.log(err, `unable to connect database`, process.env.MONGODB_URL); });
exports.default = server_js_1.default;
