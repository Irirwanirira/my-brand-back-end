import express from "express";
import { createMessage, getMessages, getUniqueMessage, deleteMessage, } from "../controllers/message/messageController.js";
const router = express.Router();
router.use("/message", createMessage);
router.use("/message", getMessages);
router.use("/message/:id", getUniqueMessage);
router.use("/message/:id", deleteMessage);
export default router;
