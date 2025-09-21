import express from "express";
import { login, register, signout } from "../controllers/authController.js";
import { isLogin } from "../middlewares/isLogin.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/signout", signout);

export default authRouter;
