import express from "express";
import { registerUser, loginUser, getUsers, getUniqUser, deleteUser, updateUser, logout, } from "../controllers/user/userController.js";
import ROLE from "../utils/roles.js";
import auth from "../middlewares/authorization.js";
import permit from "../middlewares/adminPermission.js";
import { userValidator, loginValidator, } from "../controllers/user/userValidator.js";
const router = express.Router();
router
    .post("/register", userValidator, registerUser)
    .post("/login", loginValidator, loginUser)
    .get("/logout", logout)
    .get("/users", auth, permit(ROLE.ADMIN), getUsers)
    .get("/user/:id", auth, permit(ROLE.USER, ROLE.ADMIN), getUniqUser)
    .delete("/delete/:id", auth, permit(ROLE.ADMIN), deleteUser)
    .patch("/update/:id", auth, permit(ROLE.USER, ROLE.ADMIN), updateUser);
export default router;
