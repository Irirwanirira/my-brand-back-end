import express from 'express';
const router = express.Router();
import {createMessage, getMessages, getUniqueMessage, deleteMessage} from "../controllers/messageController.js"
import {createArticle, getArticles, getUniqueArticle, updateArticle} from "../controllers/articleController.js";


router
    .post("/message", createMessage)
    .get("/message", getMessages)
    .get("/message/:id", getUniqueMessage)
    .delete("/message/:id", deleteMessage)

    .post("/article", createArticle)
    .get("/article", getArticles)
    .get("/article/:id", getUniqueArticle)
    .patch("/article/:id", updateArticle)

export default router

