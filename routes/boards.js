const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// Define the board routes
router.post('/', boardController.createBoard); // Create a new board
router.get('/:boardId', boardController.getBoard); // Get a board by ID

module.exports = router;
