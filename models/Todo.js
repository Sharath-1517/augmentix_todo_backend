const mongoose = require("mongoose");

const Todo_Schema = new mongoose.Schema({
  todo_title: { type: String, required: true },
  todo_status: { type: Boolean, default: false },
  created_at: { type: String },
  completed_at: { type: String },
});

const Todo = mongoose.model("Todo", Todo_Schema);

module.exports = { Todo };
