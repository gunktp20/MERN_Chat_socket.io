import express from "express";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//import connect database module that we created
import connectDB from "./db/connect.mjs";
//import router for handler request
import authRouter from "./routes/auth.route.mjs";
import chatRouter from "./routes/chat.route.mjs";
import messageRoute from "./routes/message.route.mjs";
//import error handler middleware for manage error
import notFoundMiddleware from "./middlewares/not-found.mjs";
import errorHandlerMiddleware from "./middlewares/error-handler.mjs";
//import authenticate middleware
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log("------------------------");
  next();
});

app.get("/api/v1", (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Welcome to our carental API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat",chatRouter)
app.use("/api/v1/message",messageRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
