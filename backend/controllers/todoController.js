import TodoModel from "../models/todoModel.js";

const getTodoList = (req, res) => {
  TodoModel.find({})
    .then((todoList) => res.json(todoList))
    .catch((err) => res.json(err));
};
const addTodoList = (req, res) => {
  TodoModel.create(req.body)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
};

const updateTodoList = (req, res) => {
  const id = req.params.id;
  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  TodoModel.findByIdAndUpdate(id, updateData)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
};

const deleteTodoList = (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
};

export { getTodoList, addTodoList, updateTodoList, deleteTodoList };
