var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from "http-status";
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = pkg;
import messageModel from "../models/messageModel.js";
export const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel.find();
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
export const getUniqueMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel.findById({ _id: id });
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
export const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newMessage = yield messageModel.create({
            name: name,
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
export const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel.findByIdAndDelete({ _id: id });
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
