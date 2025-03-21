import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jobRouter from "./routers/jobRouter.js";
import userRouter from "./routers/userRouter.js";
import connectDB from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import authRouter from "./routers/authRouter.js";

//Other Middlewares
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Dummy route
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "testing route" });
});

//routers
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
//GENERIC ROUTE
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
const start = async () => {
  try {
    //connect to DB
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB...");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
