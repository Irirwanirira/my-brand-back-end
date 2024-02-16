import express, { Application, Request, Response, NextFunction } from "express";
import pkg from "http-status";
import Articles from "../models/article/articleModel.js";
const { BAD_REQUEST, NOT_FOUND, OK, CREATED, NO_CONTENT } = pkg;

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Articles.find();
    return res.status(OK).json({
      status: "success",
      data: { articles },
    });
  } catch (error) {
    return res.status(NOT_FOUND).send({
      status: "fail",
      message: "Articles not found",
    });
  }
};

export const getUniqueArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const article = await Articles.findById({ _id: id });
    return res.status(200).json({
      status: "success",
      data: { article },
    });
  } catch (error) {
    return res.status(NOT_FOUND).send({
      status: "fail",
      message: "unable to get article",
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

    let toDate = new Date();
    let day = toDate.toDateString();
    const newArticle = await Articles.create({
      title,
      image,
      description,
      date: day,
    });
    return res.status(CREATED).json({
      status: "success",
      data: { article: newArticle },
    });
  } catch (error) {
    return res.send({
      status: "fail",
      message: "unable to create new article",
    });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const article = await Articles.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: "success",
      data: null,
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
