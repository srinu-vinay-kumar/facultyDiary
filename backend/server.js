// packages import
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

// components import
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import fileRoute from "./routes/fileRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(fileRoute);

app.use(cookieParser());

app.use("/files", express.static("files"));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send(`server is ready`));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port number:${port}`));
