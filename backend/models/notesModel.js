import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
