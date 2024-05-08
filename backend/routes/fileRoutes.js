import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import File from "../models/filesModel.js";
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

// Router.get("/download/:id", async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     res.set({
//       "Content-Type": file.file_mimetype,
//     });
//     res.sendFile(path.join(__dirname, "..", file.file_path));
//   } catch (error) {
//     res.status(400).send("Error while downloading file. Try again later.");
//   }
// });

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found"); // Ensures the file is found
    }

    const filePath = path.join(__dirname, "..", file.file_path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File does not exist on server"); // Check if file really exists on disk
    }

    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(filePath);
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    // Find the file in the database
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send({ message: "File not found" });
    }

    // Construct the file path
    const filePath = path.join(__dirname, "..", file.file_path);
    // Check if the file exists and delete it
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete the file on server: ", err);
        return res
          .status(500)
          .send({ message: "Failed to delete the file on server" });
      }

      // File deleted from the server, now remove the reference from the database
      file.remove((err) => {
        if (err) {
          console.error("Failed to delete the file record: ", err);
          return res
            .status(500)
            .send({ message: "Failed to delete the file record" });
        }
        res.send({ message: "File successfully deleted" });
      });
    });
  } catch (error) {
    console.error("Server error: ", error);
    res
      .status(500)
      .send({ message: "Error while deleting the file. Try again later." });
  }
});

export default Router;
