import express from "express";
import { createArticle, getArticles, getUniqueArticle, updateArticle, deleteArticle, } from "../controllers/article/articleController.js";
import ROLE from "../utils/roles.js";
import auth from "../middlewares/authorization.js";
import permit from "../middlewares/adminPermission.js";
import articleValidator from "../controllers/article/articleValidator.js";
const router = express.Router();
router
    .post("/article", auth, permit(ROLE.USER, ROLE.ADMIN), articleValidator, createArticle)
    .get("/", getArticles)
    .get("/:id", getUniqueArticle)
    .delete("/:id", auth, permit(ROLE.USER, ROLE.ADMIN), deleteArticle)
    .patch("/:id", auth, permit(ROLE.USER), auth, updateArticle);
export default router;
