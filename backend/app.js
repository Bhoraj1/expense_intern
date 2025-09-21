import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { dbConnect } from "./config/dbConnect.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRON_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/health", (req, res) => {
  res.send("Server running!");
});

async function startServer() {
  await dbConnect();
  app.use("/api/v1/auth", authRouter);
  app.use(globalErrorHandler);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

startServer();
