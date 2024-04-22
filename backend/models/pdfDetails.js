import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);

const Files = mongoose.model("PdfDetails", PdfDetailsSchema);

export default Files;
