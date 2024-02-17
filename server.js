import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import { connectToDb } from "./db/connectToDb.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

cloudinary.config({
  cloud_name: "fullstack-mern-developer",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middlewares
import errorHandler from "./errors/errorHandlers.js";

// routes
import userRoutes from "./routes/userRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// pre middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
// routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/category", categoryRoutes);

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
