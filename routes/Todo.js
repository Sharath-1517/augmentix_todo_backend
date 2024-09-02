const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require("../controller/Todo");

router.get("/todos/", getTodos);

router.post("/create/", createTodo);

router.post("/delete/", deleteTodo);

router.put("/update/", updateTodo);

module.exports = router;
