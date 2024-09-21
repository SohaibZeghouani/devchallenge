const Board = require('../models/board.model');
const mongoose = require('mongoose');
exports.createBoard = async (req, res) => {
  try {
    const boardId = new mongoose.Types.ObjectId().toString(); // Generate a new board ID
    const newBoard = new Board({ boardId });
    await newBoard.save();
    res.json({ boardId }); // Return the new board ID
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ boardId: req.params.boardId }).populate('tasks');
    if (!board) return res.status(404).send('Board not found');
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
