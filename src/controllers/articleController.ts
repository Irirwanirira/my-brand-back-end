import express, { Application, Request, Response, NextFunction } from 'express';

import  Articles from "../models/article/articleModel.js";

export const getArticles = async(req:Request , res: Response)=> {
    try {
        const articles = await Articles.find()
        return res.status(200).json({
            articles
        })
    } catch (error) {
        return res.send({
            Message: "unable to get articles"
        })
    }
}

export const getUniqueArticle = async(req:Request , res: Response)=> {
    const id = req.params.id
    try {
        const article = await Articles.findById({_id:id})
        return res.status(200).json({
            article
        })
    } catch (error) {   
        return res.send({
            Message: "unable to get article"
        })
    }
}

export const createArticle  = async(req:Request , res: Response)=> {

    try {
        const {title, image, description, date } = req.body
        const oldArticle = await Articles.findOne({title, description})

        if(oldArticle){
            return res.status(400).json({
                Message: "Article already exist"
            })
        }

        if(!title || !image || !description){
            return res.status(400).json({
                Message: "All fields are required"
            })
        }

        let toDate = new Date()
        let day = toDate.toDateString()
        const newArticle = await  Articles.create({
            title,
            image,
            description,
            date: day
        });
         return   res.status(201).json({
                newArticle
            })
        
    } catch (error) {
      return  res.send({
            Message: "unable to create new article"
        })
        
    }
}

export const deleteArticle = async(req:Request , res: Response)=> {
    const id = req.params.id
    try {
        const article = await Articles.findByIdAndDelete({_id:id})
        return res.status(200).json({
            article
        })
    } catch (error) {
        return res.send({
            Message: "unable to delete article"
        })
    }
}

export const updateArticle = async(req:Request , res: Response)=> {
    const id = req.params.id
    try {
        const article = await Articles.findByIdAndUpdate({_id:id}, req.body, {new: true})
        return res.status(200).json({
            article
        })
    } catch (error) {
        return res.send({
            Message: "unable to update article"
        })
    }
    
};