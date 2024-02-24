"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3300;
const myServer = (app = (0, express_1.default)()) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
        res.status(200).json({ Message: "Welcome to my brand new API, I hope you enjoy it." });
    });
    app.listen(process.env.PORT, () => {
        console.log("Wakanda forever on Atlas port ", PORT);
    });
    return app;
};
exports.default = myServer;
