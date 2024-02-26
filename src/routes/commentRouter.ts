import express from "express";
import {
  addComment,
  deleteComment,
} from "../controllers/comment/commentController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";

import commentValidator from "../controllers/comment/commentValidator";

const router = express.Router();

router
    .post("/article/:id/comment", auth, permit(ROLE.ADMIN, ROLE.USER), commentValidator, addComment)
    .delete("/:id/comment/:commentId", auth, permit(ROLE.ADMIN), deleteComment)

export default router;
