import express from "express";
import {
  createArticle,
  getArticles,
  getUniqueArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article/articleController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";
import articleValidator from "../controllers/article/articleValidator";

const router = express.Router();

router
  .post(
    "/",
    auth,
    permit(ROLE.ADMIN),
    articleValidator,
    createArticle
  )
  .get("/", getArticles)
  .get("/:id", getUniqueArticle)
  .delete("/:id", auth, permit(ROLE.ADMIN), deleteArticle)
  .patch("/:id", auth, permit(ROLE.ADMIN), auth, updateArticle);

export default router;
