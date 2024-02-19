import express from "express";
const router = express.Router();
import {
  createMessage,
  getMessages,
  getUniqueMessage,
  deleteMessage,
} from "../controllers/message/messageController.js";
import {
  createArticle,
  getArticles,
  getUniqueArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article/articleController.js";
import {
  registerUser,
  loginUser,
  getUsers,
  getUniqUser,
  deleteUser,
  updateUser,
  logout,
} from "../controllers/user/userController.js";
import {
  addComment,
  deleteComment,
} from "../controllers/comment/commentController.js";

import ROLE from "../utils/roles.js";
import auth from "../middlewares/authorization.js";
import permit from "../middlewares/adminPermission.js";

import {
  userValidator,
  loginValidator,
} from "../controllers/user/userValidator.js";
import articleValidator from "../controllers/article/articleValidator.js";
import messageValidator from "../controllers/message/messageValidator.js";
import commentValidator from "../controllers/comment/commentValidator.js";

router
  .post("/message", messageValidator, createMessage)
  .get("/message", auth, permit(ROLE.ADMIN), getMessages)
  .get("/message/:id", auth, permit(ROLE.ADMIN), getUniqueMessage)
  .delete("/message/:id", auth, permit(ROLE.ADMIN), deleteMessage)

  .post(
    "/article",
    auth,
    permit(ROLE.USER, ROLE.ADMIN),
    articleValidator,
    createArticle
  )
  .get("/article", getArticles)
  .get("/article/:id", auth, getUniqueArticle)
  .delete("/article/:id", auth, permit(ROLE.USER, ROLE.ADMIN), deleteArticle)
  .patch("/article/:id", auth, permit(ROLE.USER), auth, updateArticle)

  .post("/article/:id/comment", commentValidator, addComment)
  .delete("/comment/:id", auth, permit(ROLE.USER, ROLE.ADMIN), deleteComment)

  .post("/auth/register", userValidator, registerUser)
  .post("/auth/login", loginValidator, loginUser)
  .get("auth/logout", logout)
  .get("/auth/users", auth, permit(ROLE.ADMIN), getUsers)
  .get("/auth/user/:id", auth, permit(ROLE.USER, ROLE.ADMIN), getUniqUser)
  .delete("/auth/delete/:id", auth, permit(ROLE.ADMIN), deleteUser)
  .patch("/auth/update/:id", auth, permit(ROLE.USER, ROLE.ADMIN), updateUser);

export default router;
