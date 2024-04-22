import express from "express";
const router = express.Router();
import {
  addTodoList,
  getTodoList,
  updateTodoList,
  deleteTodoList,
} from "../controllers/todoController.js";

router.get("/getTodoList", getTodoList);
router.post("/addTodoList", addTodoList);
router.put("/updateTodoList/:id", updateTodoList);
router.delete("/deleteTodoList/:id", deleteTodoList);

export default router;
