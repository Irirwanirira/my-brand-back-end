import express, { Application, Request, Response, NextFunction } from "express";
import pkg from "http-status";
import Articles from "../../models/articleModel.js";
import Comment from "../../models/commentModel.js";

const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = pkg;

export const addComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { comment, author } = req.body;

    const article: any = await Articles.findById(id).populate("comments");
    if (!article) {
      return res.status(NOT_FOUND).json({
        status: "fail",
        message: "article not found",
      });
    }
    const newComment = { comment, author}
    article.comments.push(newComment);
    await article.save();
    return res.status(CREATED).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: "unable to add comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: `comment with id: ${id} can not be found`,
    });
  }
};
