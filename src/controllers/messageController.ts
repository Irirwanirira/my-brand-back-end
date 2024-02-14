import express, { Application, Request, Response, NextFunction } from 'express';

import messageModel from "../models/messageModel.js";


export const getMessages = async(req:Request , res: Response)=> {
    try {
        const messages = await messageModel.find()
        return res.status(200).json({
            messages
        })
    } catch (error) {
        return res.send({
            Message: "unable to get messages"
        })
    }
}

export const getUniqueMessage = async(req:Request , res: Response)=> {
    const id = req.params.id
    try {
        const message = await messageModel.findById({_id:id})
        return res.status(200).json({
            message
        })
    } catch (error) {   
        return res.send({
            Message: "unable to get message"
        })
    }
}

export const createMessage  = async(req:Request , res: Response)=> {
    try {
        const toDate = new Date();
        let day = toDate.toDateString()
        let time = toDate.toLocaleTimeString()
        const {name, email, message } = req.body
        const newMessage = await  messageModel.create({
            name: name,
            email,
            message,
            date: day,
            time,
        });
         return   res.status(201).json({
                newMessage
            })
        
    } catch (error) {
      return  res.send({
            Message: "unable to create new message"
        })
        
    }
}

export const deleteMessage = async(req:Request , res: Response)=> {
    const id = req.params.id
    try {
        const message = await messageModel.findByIdAndDelete({_id:id})
        return res.status(200).json({
            message
        })
    } catch (error) {
        return res.send({
            Message: "unable to delete message"
        })
    }
}



