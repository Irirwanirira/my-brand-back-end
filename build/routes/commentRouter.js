import express from "express";
import { addComment, deleteComment, } from "../controllers/comment/commentController.js";
import commentValidator from "../controllers/comment/commentValidator.js";
const router = express.Router();
router
    .post("/article/:id/comment", commentValidator, addComment)
    .delete("/:id/comment/:commentId", deleteComment);
export default router;
