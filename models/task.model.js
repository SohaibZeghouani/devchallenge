const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  status: String,
  boardId: { type: String, required: true } // Reference to the board ID
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
