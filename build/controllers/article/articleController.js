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
import Articles from "../../models/articleModel.js";
const { BAD_REQUEST, NOT_FOUND, OK, CREATED, NO_CONTENT, INTERNAL_SERVER_ERROR } = pkg;
// /**
// * @swagger
// * components:
// *   schemas:
// *     Article:
// *       type: object
// *       required:
// *         - title
// *         - image
// *         - description
// *  
// *       properties:
// *         id:
// *           type: string
// *           description: The auto-generated id of the Post
// *         title:
// *           type: string
// *           description: The title of your Post
// *         image:
// *           type: string
// *           description: The content author
// *          description:
// *           type: string
// *           description: The content author
// *         date:   
// *           type: string
// *           description: The date of the article
// *         comments:
// *           type: array
// *           items:
// *             type: string
// *           description: The comments of the article
// *         example:
// *           id: d5fE_asz
// *           title: The New Turing Omnibus
// *           image: https://images-na.ssl-images-amazon.com/images/I/51J9Wc6YJjL._SX331_BO1,204,203,200_.jpg
// *           description: post 1
// *           date: 2022-09-01
// *           comments: ["comment1", "comment2"]
// * 
// */
export const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Articles.find();
        return res.status(OK).json({
            status: "success",
            data: { articles },
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).send({
            status: "fail",
            message: "Articles not found",
        });
    }
});
export const getUniqueArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findById(id).populate("comments");
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
export const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image, description } = req.body;
        const oldArticle = yield Articles.findOne({ title, description });
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
        const newArticle = yield Articles.create({
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
export const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findByIdAndDelete({ _id: id });
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
export const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findById({ _id: id });
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
