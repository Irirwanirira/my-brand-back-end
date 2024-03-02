import express from "express";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/comment/commentController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";

import commentValidator from "../controllers/comment/commentValidator";

const router = express.Router();

router
    .post("/:articleId", auth, permit(ROLE.ADMIN, ROLE.USER), commentValidator, addComment)
    .get("/:articleId", auth, permit(ROLE.ADMIN), getComments)
    .delete("/:commentId", auth, permit(ROLE.ADMIN), deleteComment)

export default router;
