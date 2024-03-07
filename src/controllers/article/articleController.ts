import express, { Application, Request, Response, NextFunction } from "express";
import pkg from "http-status";
import Articles from "../../models/articleModel";
const { BAD_REQUEST, NOT_FOUND, OK, CREATED, NO_CONTENT, INTERNAL_SERVER_ERROR  } = pkg;


export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Articles.find().populate('comments').populate('author', 'name email');
    return res.status(OK).json({
      status: "success",
      data: { articles },
    });
  } catch (error) {
    return res
    .status(NOT_FOUND)
    .json({
      status: "fail",
      message: "Articles not found",
    });
  }
};

export const getUniqueArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const article = await Articles.findById(id).populate("author","name email").populate({
      path: "comments",
      populate: { 
        path: "author",
        select: "name email"
      },
    });
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
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "fail",
      message: "Unable to get article",
  });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, image, description } = req.body;
    const oldArticle = await Articles.findOne({ title, description });

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

    const newArticle = await Articles.create({
      title,
      image,
      description,
      author: req.body.userId,
      comments: [],
      likes: [],
    });

    await newArticle.save();
    
    return res.status(CREATED).json({
      status: "success",
      data: { article: newArticle },
    });
  } catch (error) {
    return res.send({
      status: "fail",
      message: "unable to create new article", error
    });
  }
};

export const softDeleteArticle = async (req: Request, res: Response) => {
  const id = req.params.articleId;
  try {
    const article = await Articles.findById(id);
    if (!article){
      return res.status(NOT_FOUND).json({
        status: "fail",
        message: `article with id: ${id} can not be found`,
      })
    }
    article.isDeleted = !article.isDeleted;
    article.deletedAt = new Date();
    await article.save();
    return res.status(OK).json({
      status: "success",
      message: `article with id: ${id} has been softly deleted`,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      status: "fail",
      message: "unable to delete article",
    });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const article = await Articles.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: "success",
      message: `article with id: ${id} has been deleted`,
    });
  } catch (error) {
    return res.status(NOT_FOUND).json({
      status: "fail",
      message: `article with id: ${id} can not be found`,
    });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const article = await Articles.findById({ _id: id });
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
  } catch (error) {
    return res.status(BAD_REQUEST).send({
      status: "fail",
      message: "unable to update article",
    });
  }
};
