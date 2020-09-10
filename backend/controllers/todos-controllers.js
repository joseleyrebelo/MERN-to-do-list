const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Todo = require("../models/todo");

// Get all todo entries
const getAllTodos = async (req, res, next) => {
  console.log("> getting all ");
  let todo;
  try {
    todo = await Todo.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any todos.",
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError("Could not find any todos.", 404);
    return next(error);
  }

  res.status(200).json(todo);
};

// Get todo entry by id
const getTodoById = async (req, res, next) => {
  const id = req.params.pid;
  console.log(`> getting [${id}]`);

  let todo;
  try {
    todo = await Todo.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the todo.",
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError(
      "Could not find the todo for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ todo: todo.toObject({ getters: true }) });
};

// Create new todo entry
// * Builds document to be created out of request body data
const createTodo = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("> creating new");

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { task, notes, done } = req.body;
  const createdTodo = new Todo({
    task,
    notes,
    done,
  });

  try {
    await createdTodo.save();
  } catch (err) {
    const error = new HttpError(
      "Creating the todo failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ todo: createdTodo });
};

// Update todo entry details
// * Builds document to be updated out of request body data
const updateTodo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { task, notes, done } = req.body;
  const id = req.params.pid;
  console.log(`> updating [${id}]`);

  let todo;
  try {
    todo = await Todo.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the todo.",
      500
    );
    return next(error);
  }

  todo.task = task;
  todo.notes = notes;
  todo.done = done;

  try {
    await todo.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update todo.",
      500
    );
    return next(error);
  }

  res.status(200).json({ todo: todo.toObject({ getters: true }) });
};

// Delete todo entry
const deleteTodo = async (req, res, next) => {
  const id = req.params.pid;
  console.log(`> deleting [${id}]`);

  let todo;
  try {
    todo = await Todo.findByIdAndDelete(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the todo.",
      500
    );
    return next(error);
  }

  if (!todo) {
    const error = new HttpError("Could not find the todo for this id.", 404);
    return next(error);
  }

  res.status(200).json({ message: "Deleted the todo." });
};

exports.getAllTodos = getAllTodos;
exports.getTodoById = getTodoById;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
