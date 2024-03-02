import express, { Application, Request, Response, NextFunction } from "express";

import pkg from "http-status";
import Likes from "../../models/likeModels";
import Articles, { ArticleType } from "../../models/articleModel";
const { NOT_FOUND, BAD_REQUEST, OK, CREATED } = pkg;

export const addLike = async (req: Request, res: Response) => {
    const articleId = req.params.articleId;
    const userId = req.body.userId;
    try {
        const article: ArticleType | any = await Articles.findById(articleId)
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        if(article.likes.includes(userId)){
            return res.status(BAD_REQUEST).json({
                status: "fail",
                message: "You have already liked this article",
            });
        }

        const like = new Likes({
            user: userId,
            article: articleId,
        });

        article.likes.push(userId);
        await article.save();
        return res.status(CREATED).json({
            status: "success",
            message: "Your like counts",
        });
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to like article"
        });
        
    }
}

export const unlike = async (req: Request, res: Response) => {
    const articleId = req.params.articleId;
    const userId = req.body.userId;
    try {
        const article: ArticleType | any = await Articles.findById(articleId)
        if (!article) {
            return res.status(NOT_FOUND).json({
                status: "fail",
                message: "article not found",
            });
        }
        if(!article.likes.includes(userId)){
            return res.status(BAD_REQUEST).json({
                status: "fail",
                message: "You have not liked this article",
            });
        }

        article.likes = article.likes.filter((like: any) => like != userId);
        await article.save();
        return res.status(OK).json({
            status: "success",
            message: "You have unliked this article",
        });
    } catch (error) {
        return res.status(BAD_REQUEST).json({
            status: "fail",
            message: "unable to unlike article"
        });
        
    }
}