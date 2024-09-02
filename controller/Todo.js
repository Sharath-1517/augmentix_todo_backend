const { Todo } = require("../models/Todo");

/**
 * @param {Response} res
 * @param {Request} req
 */
const createTodo = async (req, res) => {
  try {
    const todo = req.body;

    const date = new Date().toLocaleString("en-IN");

    await Todo.create({
      ...todo,
      created_at: date,
      completed_at: null,
      todo_status: false,
    });

    res.status(200).json({
      success: true,
      message: "Created",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @param {Response} res
 * @param {Request} req
 */
const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;

    const deleteQuery = { _id: todoId };
    const data = await Todo.deleteOne(deleteQuery);
    if (data.deletedCount == 0) {
      res.status(400).json({
        success: false,
        message: "Task not deleted",
      });
    }

    res.status(201).json({
      success: true,
      message: "Deleted Task",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete task",
    });
  }
};

/**
 * @param {Response} res
 * @param {Request} req
 */
const getTodos = async (_, res) => {
  try {
    const data = (await Todo.find()).map((datum) => ({
      id: datum._id,
      todo_title: datum.todo_title,
      todo_status: datum.todo_status,
      created_at: datum.created_at,
      completed_at: datum.completed_at,
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @param {Response} res
 * @param {Request} req
 */
const updateTodo = async (req, res) => {
  try {
    const body = req.body;

    const _id = body._id;

    let updateObject = {};
    let message = "";

    if ("todo_title" in body) {
      updateObject["todo_title"] = body.todo_title;
      message = "Updated Todo";
    }

    if ("todo_status" in body) {
      updateObject["todo_status"] = body.todo_status;
      updateObject["completed_at"] = new Date().toLocaleString("en-In");
      message = body.todo_status ? "Completed task" : "Unchecked task";
    }

    const data = await Todo.updateOne({ _id }, { ...updateObject });
    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Unable to mark task as completed",
    });
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
};
