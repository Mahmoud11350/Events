import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import { connectToDb } from "./db/connectToDb.js";
import cookieParser from "cookie-parser";

// middlewares
import errorHandler from "./errors/errorHandlers.js";

// routes
import userRoutes from "./routes/userRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

const app = express();

// pre middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventsRoutes);

// post middlewares

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, console.log("server is runing on port " + PORT));
  } catch (error) {
    console.log("internal server error ");
  }
};

startServer();
