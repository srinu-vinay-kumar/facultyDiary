//todoList.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

export default TodoModel;
