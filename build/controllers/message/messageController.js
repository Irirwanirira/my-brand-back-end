"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.createMessage = exports.getUniqueMessage = exports.getMessages = void 0;
const http_status_1 = __importDefault(require("http-status"));
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = http_status_1.default;
const messageModel_1 = __importDefault(require("../../models/messageModel"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel_1.default.find();
        return res.status(OK).json({
            status: "success",
            data: { messages },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).send({
            status: "fail",
            message: "unable to get messages",
        });
    }
});
exports.getMessages = getMessages;
const getUniqueMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel_1.default.findById({ _id: id });
        return res.status(OK).json({
            status: "success",
            data: { message },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: "unable to get message",
        });
    }
});
exports.getUniqueMessage = getUniqueMessage;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDate = new Date();
        let day = toDate.toDateString();
        let time = toDate.toLocaleTimeString();
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res
                .status(BAD_REQUEST)
                .json({ status: "fail", message: "all fields are required" });
        }
        const newMessage = yield messageModel_1.default.create({
            name,
            email,
            message,
            date: day,
            time,
        });
        return res
            .status(CREATED)
            .json({ status: "success", data: { message: newMessage } });
    }
    catch (error) {
        return res
            .status(NOT_FOUND)
            .send({ status: "fail", message: "unable to create new message" });
    }
});
exports.createMessage = createMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel_1.default.findByIdAndDelete({ _id: id });
        if (!message) {
            return res.status(NOT_FOUND).json({
                status: "error",
                message: `message with ${id} is not found`,
            });
        }
        return res.status(200).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).send({
            status: "fail",
            message: `message with ${id} as id is not found`,
        });
    }
});
exports.deleteMessage = deleteMessage;
