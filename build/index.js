"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const database_js_1 = __importDefault(require("./database.js"));
const routes_js_1 = __importDefault(require("./routes/routes.js"));
(0, database_js_1.default)();
app_js_1.default.use("/api", routes_js_1.default);
const PORT = process.env.PORT || 3300;
app_js_1.default.listen(process.env.PORT, () => {
    console.log("Wakanda forever on Atlas port ", PORT);
});
