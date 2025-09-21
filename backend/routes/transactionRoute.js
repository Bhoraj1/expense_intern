import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionController.js";
import { isLogin } from "../middlewares/isLogin.js";

const transactionRouter = express.Router();
transactionRouter.post("/", isLogin, addTransaction);
transactionRouter.get("/", isLogin, getTransactions);
transactionRouter.delete("/:id", isLogin, deleteTransaction);
transactionRouter.patch("/:id", isLogin, updateTransaction);

export default transactionRouter;
