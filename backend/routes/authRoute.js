import express from "express";
import {
  login,
  register,
  signout,
  getUsers,
  deleteUser,
  getDashboardStats,
} from "../controllers/authController.js";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "./../middlewares/isAdmin.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/signout", signout);
authRouter.get("/users", isLogin, isAdmin, getUsers);
authRouter.delete("/users/:id", isLogin, isAdmin, deleteUser);
authRouter.get("/dashboard-stats", isLogin, getDashboardStats);

export default authRouter;
