"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_js_1 = __importDefault(require("./routes/routes.js"));
const server_js_1 = __importDefault(require("./server.js"));
const PORT = process.env.PORT || 3300;
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    const app = (0, server_js_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/api", routes_js_1.default);
    app.listen(process.env.PORT, () => {
        console.log("Wakanda forever on Atlas port " + PORT);
    });
})
    .catch((err) => { console.log(err, `unable to connect database`, process.env.MONGODB_URL); });
