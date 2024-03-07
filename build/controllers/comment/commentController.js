"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteComment = exports.getComments = exports.addComment = void 0;
const http_status_1 = __importStar(require("http-status"));
const articleModel_1 = __importDefault(require("../../models/articleModel"));
const commentModel_1 = __importDefault(require("../../models/commentModel"));
const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = http_status_1.default;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const postId = req.params.articleId;
    try {
        const article = yield articleModel_1.default.findById(postId).populate({
            path: "comments",
            populate: {
                path: "author"
            },
        });
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        const comment = yield commentModel_1.default.create({
            content,
            author: req.body.userId,
            post: postId
        });
        article.comments.push(comment._id);
        yield article.save();
        return res.status(CREATED).json({
            status: "success",
            data: { comment },
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
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.articleId;
    try {
        const article = yield articleModel_1.default.findById(id).populate({
            path: "comments",
            populate: {
                path: "author",
                select: "name email"
            },
        });
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        return res.status(OK).json({
            status: "success",
            data: { comments: article.comments },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: "comments not found",
        });
    }
});
exports.getComments = getComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    try {
        const comment = yield commentModel_1.default.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "comment not found",
            });
        }
        return res.status(http_status_1.NO_CONTENT).json({
            status: "success",
            message: `comment with id: ${commentId} has been deleted`,
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to delete comment",
        });
    }
});
exports.deleteComment = deleteComment;
