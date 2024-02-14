import express from 'express';
const router = express.Router();
import { createMessage, getMessages, getUniqueMessage, deleteMessage } from "../controllers/messageController.js";
import { createArticle, getArticles, getUniqueArticle, updateArticle } from "../controllers/articleController.js";
import { registerUser, loginUser, getUsers, getUniqUser, deleteUser, updateUser, logout } from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
router
    .post("/message", createMessage)
    .get("/message", verifyJWT, getMessages)
    .get("/message/:id", verifyJWT, getUniqueMessage)
    .delete("/message/:id", verifyJWT, deleteMessage)
    .post("/article", createArticle)
    .get("/article", getArticles)
    .get("/article/:id", getUniqueArticle)
    .patch("/article/:id", updateArticle)
    .post("/auth/register", registerUser)
    .post("/auth/login", loginUser)
    .get("auth/logout", logout)
    .get("/auth/users", getUsers)
    .get("/auth/user/:id", getUniqUser)
    .delete("/auth/delete/:id", deleteUser)
    .patch("/auth/update/:id", updateUser);
export default router;
