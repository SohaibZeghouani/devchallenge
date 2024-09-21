const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  boardId: { type: String, unique: true, required: true }, // Unique board ID
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Reference to tasks
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
