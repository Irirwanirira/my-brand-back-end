import express, { Application, Request, Response, NextFunction } from 'express';
const router = express.Router();
import {createMessage, getMessages, getUniqueMessage, deleteMessage} from "../controllers/messageController.js"

router
    .post("/message", createMessage)
    .get("/message", getMessages)
    .get("/message/:id", getUniqueMessage)
    .delete("/message/:id", deleteMessage)

    



export default router

