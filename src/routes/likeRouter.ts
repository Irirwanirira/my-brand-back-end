import express from "express";
import {addLike, unlike} from "../controllers/like/likeController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";


const router = express.Router();

router
    .post("/:articleId", auth, permit(ROLE.ADMIN, ROLE.USER), addLike)
    .delete("/:articleId", auth, permit(ROLE.ADMIN, ROLE.USER), unlike);

export default router;
