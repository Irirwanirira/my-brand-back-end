import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUniqUser,
  deleteUser,
  updateUser,
  logout,
  googleAuth
} from "../controllers/user/userController";
import ROLE from "../utils/roles";
import auth from "../middlewares/authorization";
import permit from "../middlewares/adminPermission";
import {
  userValidator,
  loginValidator,
} from "../controllers/user/userValidator";

const router = express.Router();
router
  .post("/register", userValidator, registerUser)
  .post("/login", loginValidator, loginUser)
  .get("/logout", logout)
  .get("/google", googleAuth)
  .get("/users", auth, permit(ROLE.ADMIN), getUsers)
  .get("/user/:id", auth, permit(ROLE.USER, ROLE.ADMIN), getUniqUser)
  .delete("/delete/:id", auth, permit(ROLE.ADMIN), deleteUser)
  .patch("/update/:id", auth, permit(ROLE.USER, ROLE.ADMIN), updateUser);

export default router;
