import express, { Application, Request, Response, NextFunction } from "express";
import pkg, { NO_CONTENT } from "http-status";
import Articles from "../../models/articleModel";
import Comments from "../../models/commentModel";

const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = pkg;

export const addComment = async (req: Request, res: Response) => {
  const {content} = req.body;
  const postId = req.params.articleId;
  try {
    const article: any = await Articles.findById(postId).populate({
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
    const comment = await Comments.create({
      content,
      author: req.body.userId,
      post: postId
    })
    article.comments.push(comment._id);
    await article.save();
    return res.status(CREATED).json({
      status: "success",
      data: { comment },
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: "unable to add comment",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const id = req.params.articleId;
  try {
    const article: any = await Articles.findById(id).populate({
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
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: "comments not found",
    });
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  try {
    const comment: any = await Comments.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(NOT_FOUND).json({
        status: "fail",
        message: "comment not found",
      });
    }
    return res.status(NO_CONTENT).json({
      status: "success",
      message: `comment with id: ${commentId} has been deleted`,
    });
 
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: "unable to delete comment",
    });
  }
};
