var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import messageModel from "../models/messageModel.js";
export const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel.find();
        return res.status(200).json({
            messages
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to get messages"
        });
    }
});
export const getUniqueMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel.findById({ _id: id });
        return res.status(200).json({
            message
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to get message"
        });
    }
});
export const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        let day = date.toDateString();
        let time = date.toLocaleTimeString();
        const { name, email, message } = req.body;
        const newMessage = yield messageModel.create({
            name: name,
            email,
            message,
            date: day,
            time,
        });
        res.status(201).json({
            newMessage
        });
    }
    catch (error) {
        res.send({
            Message: "unable to create new message"
        });
    }
});
export const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const message = yield messageModel.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            message
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to delete message"
        });
    }
});
