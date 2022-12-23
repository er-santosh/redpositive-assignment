import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import { errorHandler } from "./utils/errorHandler";
const morgan = require("morgan");
require("dotenv").config();
/* create express app */
const app = express();

/* database connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB Connection", err);
  });

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* routes */

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "WELCOME TO DEMO API",
  });
});

app.use("/api", userRouter);

/* error handling middleware */
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
