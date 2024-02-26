import express from "express";

import {
  createMessage,
  getMessages,
  getUniqueMessage,
  deleteMessage,
} from "../controllers/message/messageController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";
import messageValidator from "../controllers/message/messageValidator";

const router = express.Router();

router
  .post("/", messageValidator, createMessage)
  .get("/", auth, permit(ROLE.ADMIN), getMessages)
  .get("/:id", auth, permit(ROLE.ADMIN), getUniqueMessage)
  .delete("/:id", auth, permit(ROLE.ADMIN), deleteMessage);

export default router;
