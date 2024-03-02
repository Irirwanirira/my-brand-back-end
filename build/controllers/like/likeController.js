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
exports.unlike = exports.addLike = void 0;
const http_status_1 = __importDefault(require("http-status"));
const likeModels_1 = __importDefault(require("../../models/likeModels"));
const articleModel_1 = __importDefault(require("../../models/articleModel"));
const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = http_status_1.default;
const addLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articleId = req.params.articleId;
    const userId = req.body.userId;
    try {
        const article = yield articleModel_1.default.findById(articleId);
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        if (article.likes.includes(userId)) {
            return res.status(BAD_REQUEST).json({
                status: "fail",
                message: "You have already liked this article",
            });
        }
        const like = new likeModels_1.default({
            user: userId,
            article: articleId,
        });
        article.likes.push(userId);
        yield article.save();
        return res.status(CREATED).json({
            status: "success",
            message: "Your like counts",
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to like article"
        });
    }
});
exports.addLike = addLike;
const unlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articleId = req.params.articleId;
    const userId = req.body.userId;
    try {
        const article = yield articleModel_1.default.findById(articleId);
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        if (!article.likes.includes(userId)) {
            return res.status(BAD_REQUEST).json({
                status: "fail",
                message: "You have not liked this article",
            });
        }
        article.likes = article.likes.filter((like) => like != userId);
        yield article.save();
        return res.status(OK).json({
            status: "success",
            message: "You have unliked this article",
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to unlike article"
        });
    }
});
exports.unlike = unlike;
