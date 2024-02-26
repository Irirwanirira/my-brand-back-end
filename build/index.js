"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes/routes"));
(0, database_1.default)();
app_1.default.use("/brand/api/v1", routes_1.default);
const PORT = process.env.PORT || 3300;
const server = app_1.default.listen(process.env.PORT, () => {
    console.log("Wakanda forever on Atlas port ", PORT);
});
exports.default = server;
