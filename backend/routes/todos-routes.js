const express = require("express");
const { check } = require("express-validator");
const Todo = require("../models/todo");
const todosControllers = require("../controllers/todos-controllers");

// Quick Abstractions
//
const router = express.Router();
const paramNotEmpty = (key) => check(key).not().isEmpty();

//
// (Todolist) API Routings
//

// * Get all
router.get("/", todosControllers.getAllTodos);

// * Get by id
router.get("/:pid", todosControllers.getTodoById);

// * Create new entry
router.post(
  "/",
  [paramNotEmpty("task"), paramNotEmpty("done")],
  todosControllers.createTodo
);

// * Update entry
router.patch(
  "/:pid",
  [paramNotEmpty("task"), paramNotEmpty("done")],
  todosControllers.updateTodo
);

// * Delete entry
router.delete("/:pid", todosControllers.deleteTodo);

module.exports = router;
