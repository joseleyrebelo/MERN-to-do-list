const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  task: { type: String, required: true },
  notes: { type: String, required: false },
  done: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("ToDoList", userSchema);
