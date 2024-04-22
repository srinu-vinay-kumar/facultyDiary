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
import "./models/pdfDetails.js";

connectDB();

const app = express();

// multer-------------------------------------------------------------

const PdfSchema = mongoose.model("PdfDetails");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "Ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "Ok", data: data });
    });
  } catch (error) {}
});
// -------------------------------------------------

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/files", express.static("files"));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => res.send(`server is ready`));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port number:${port}`));
