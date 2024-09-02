const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require("../controller/Todo");

router.param("todoId", (req, res, next, todoId) => {});

router.get("/todo/todos", getTodos);

router.post("/todo/create", createTodo);

router.post("/todo/delete/", deleteTodo);

router.put("/todo/update/", updateTodo);

module.exports = router;
