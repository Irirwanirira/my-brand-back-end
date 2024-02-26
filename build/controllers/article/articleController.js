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
exports.updateArticle = exports.deleteArticle = exports.createArticle = exports.getUniqueArticle = exports.getArticles = void 0;
const http_status_1 = __importDefault(require("http-status"));
const articleModel_1 = __importDefault(require("../../models/articleModel"));
const { BAD_REQUEST, NOT_FOUND, OK, CREATED, NO_CONTENT, INTERNAL_SERVER_ERROR } = http_status_1.default;
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield articleModel_1.default.find();
        return res.status(OK).json({
            status: "success",
            data: { articles },
        });
    }
    catch (error) {
        return res
            .status(NOT_FOUND)
            .json({
            status: "fail",
            message: "Articles not found",
        });
    }
});
exports.getArticles = getArticles;
const getUniqueArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield articleModel_1.default.findById(id).populate("comments");
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "Article not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: { article },
        });
    }
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Unable to get article",
        });
    }
});
exports.getUniqueArticle = getUniqueArticle;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image, description } = req.body;
        const oldArticle = yield articleModel_1.default.findOne({ title, description });
        if (oldArticle) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "Article already exist",
            });
        }
        if (!title || !image || !description) {
            return res.status(NO_CONTENT).json({
                status: "fail",
                message: "All fields are required",
            });
        }
        let toDate = new Date();
        let day = toDate.toDateString();
        const newArticle = yield articleModel_1.default.create({
            title,
            image,
            description,
            date: day,
            comments: [],
        });
        yield newArticle.save();
        return res.status(CREATED).json({
            status: "success",
            data: { article: newArticle },
        });
    }
    catch (error) {
        return res.send({
            status: "fail",
            message: "unable to create new article",
        });
    }
});
exports.createArticle = createArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield articleModel_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: `article with id: ${id} can not be found`,
        });
    }
});
exports.deleteArticle = deleteArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield articleModel_1.default.findById({ _id: id });
        const { title, image, description } = req.body;
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: `article with id: ${id} can not be found`,
            });
        }
        if (title) {
            article.title = title;
        }
        if (image) {
            article.image = image;
        }
        if (description) {
            article.description = description;
        }
        return res.status(OK).json({
            status: "success",
            data: { article },
        });
    }
    catch (error) {
        return res.status(BAD_REQUEST).send({
            status: "fail",
            message: "unable to update article",
        });
    }
});
exports.updateArticle = updateArticle;
