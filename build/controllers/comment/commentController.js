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
exports.deleteComment = exports.addComment = void 0;
const http_status_1 = __importDefault(require("http-status"));
const articleModel_js_1 = __importDefault(require("../../models/articleModel.js"));
// import Comment from "../../models/commentModel.js";
const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = http_status_1.default;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { comment, author } = req.body;
        const article = yield articleModel_js_1.default.findById(id).populate("comments");
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        const newComment = {
            id: Date.now().toString(),
            comment, author
        };
        article.comments.push(newComment);
        yield article.save();
        return res.status(CREATED).json({
            status: "success",
            data: { article },
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to add comment",
        });
    }
});
exports.addComment = addComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    try {
        const article = yield articleModel_js_1.default.findById(id);
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        let comments = article.comments.filter((comment) => comment.id !== req.params.commentId);
        article.comments = comments;
        yield article.save();
        return res.status(OK).json({
            status: "success",
            message: "comment deleted successfully",
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: `comment with id: ${id} can not be found`,
        });
    }
});
exports.deleteComment = deleteComment;
