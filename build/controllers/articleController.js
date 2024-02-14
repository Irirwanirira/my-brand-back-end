var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Articles from "../models/article/articleModel.js";
export const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Articles.find();
        return res.status(200).json({
            articles
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to get articles"
        });
    }
});
export const getUniqueArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findById({ _id: id });
        return res.status(200).json({
            article
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to get article"
        });
    }
});
export const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image, description, date } = req.body;
        const oldArticle = yield Articles.findOne({ title, description });
        if (oldArticle) {
            return res.status(400).json({
                Message: "Article already exist"
            });
        }
        if (!title || !image || !description) {
            return res.status(400).json({
                Message: "All fields are required"
            });
        }
        let toDate = new Date();
        let day = toDate.toDateString();
        const newArticle = yield Articles.create({
            title,
            image,
            description,
            date: day
        });
        return res.status(201).json({
            newArticle
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to create new article"
        });
    }
});
export const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            article
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to delete article"
        });
    }
});
export const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const article = yield Articles.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        return res.status(200).json({
            article
        });
    }
    catch (error) {
        return res.send({
            Message: "unable to update article"
        });
    }
});
