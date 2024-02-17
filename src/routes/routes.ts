import express from 'express';
const router = express.Router();
import {createMessage, getMessages, getUniqueMessage, deleteMessage} from "../controllers/message/messageController.js"
import {createArticle, getArticles, getUniqueArticle, updateArticle,deleteArticle} from "../controllers/article/articleController.js";
import { registerUser, loginUser, getUsers,getUniqUser, deleteUser, updateUser, logout} from "../controllers/user/userController.js"
import { addComment, deleteComment } from '../controllers/comment/commentController.js';

import verifyJWT from "../middlewares/verifyJWT.js"
import {userValidator, loginValidator} from '../controllers/user/userValidator.js';
import articleValidator from '../controllers/article/articleValidator.js';
import messageValidator from '../controllers/message/messageValidator.js';
import commentValidator from '../controllers/comment/commentValidator.js';

router
    .post("/message",messageValidator, createMessage)
    .get("/message", verifyJWT, getMessages)
    .get("/message/:id", verifyJWT, getUniqueMessage)
    .delete("/message/:id", verifyJWT, deleteMessage)

    .post("/article",articleValidator, createArticle)
    .get("/article", getArticles)
    .get("/article/:id", getUniqueArticle)
    .delete("/article/:id", deleteArticle)
    .patch("/article/:id", updateArticle)

    .post("/article/:id/comment",commentValidator,addComment)
    .delete("/comment/:id", deleteComment)

    .post("/auth/register", userValidator , registerUser)
    .post("/auth/login", loginValidator, loginUser)
    .get("auth/logout", logout)
    .get("/auth/users", getUsers)
    .get("/auth/user/:id", getUniqUser)
    .delete("/auth/delete/:id", deleteUser)
    .patch("/auth/update/:id", updateUser)

export default router

