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
import { protect } from "./middleware/authMiddleware.js";
import Notes from "./models/notesModel.js";
import passwordResetRoutes from "./routes/passwordReset.js";

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
app.use("/api/password-reset", passwordResetRoutes);

app.get("/", (req, res) => res.send(`server is ready`));

// app.post("/api/add-note", protect, async (req, res) => {
//   const { title, content } = req.body;
//   const { user } = req.user;

//   if (!title) {
//     return res.status(400).json({ error: true, message: `Title is required` });
//   }

//   if (!content) {
//     return res
//       .status(400)
//       .json({ error: true, message: `Content is required` });
//   }
//   try {
//     const note = new Notes({
//       title,
//       content,
//     });

//     await note.save();
//     return res.json({
//       error: false,
//       note,
//       message: `Note added successfully`,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: true,
//       message: `Internal server error`,
//     });
//   }
// });

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is successfully running on port number:${port}`)
);
