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
import Comment from "../../models/commentModel.js";
const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = pkg;
export const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { comment, author } = req.body;
        const article = yield Articles.findById(id).populate("comments");
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        const newComment = { comment, author };
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
export const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const comment = yield Comment.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        return res.status(NOT_FOUND).json({
            status: "fail",
            message: `comment with id: ${id} can not be found`,
        });
    }
});
