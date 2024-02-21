import express from "express";

import {
  createMessage,
  getMessages,
  getUniqueMessage,
  deleteMessage,
} from "../controllers/message/messageController.js";
import ROLE from "../utils/roles.js";
import auth from "../middlewares/authorization.js";
import permit from "../middlewares/adminPermission.js";
import messageValidator from "../controllers/message/messageValidator.js";

const router = express.Router();

router
  .post("/", messageValidator, createMessage)
  .get("/", auth, permit(ROLE.ADMIN), getMessages)
  .get("/:id", auth, permit(ROLE.ADMIN), getUniqueMessage)
  .delete("/:id", auth, permit(ROLE.ADMIN), deleteMessage);

export default router;
