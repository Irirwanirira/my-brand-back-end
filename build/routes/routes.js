import express from 'express';
const router = express.Router();
import { createMessage, getMessages, getUniqueMessage, deleteMessage } from "../controllers/messageController.js";
import { createArticle, getArticles, getUniqueArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { registerUser, loginUser, getUsers, getUniqUser, deleteUser, updateUser, logout } from "../controllers/userController.js";
import { addComment, deleteComment } from '../controllers/commentController.js';
import verifyJWT from "../middlewares/verifyJWT.js";
router
    .post("/message", createMessage)
    .get("/message", verifyJWT, getMessages)
    .get("/message/:id", verifyJWT, getUniqueMessage)
    .delete("/message/:id", verifyJWT, deleteMessage)
    .post("/article", createArticle)
    .get("/article", getArticles)
    .get("/article/:id", getUniqueArticle)
    .delete("/article/:id", deleteArticle)
    .patch("/article/:id", updateArticle)
    .post("/article/:id/comment", addComment)
    .delete("/comment/:id", deleteComment)
    .post("/auth/register", registerUser)
    .post("/auth/login", loginUser)
    .get("auth/logout", logout)
    .get("/auth/users", getUsers)
    .get("/auth/user/:id", getUniqUser)
    .delete("/auth/delete/:id", deleteUser)
    .patch("/auth/update/:id", updateUser);
export default router;
