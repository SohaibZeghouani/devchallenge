const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define the task routes
router.get('/boards/:boardId/tasks', taskController.getTasks); // Get tasks for a specific board
router.post('/boards/:boardId/tasks', taskController.createTask); // Create a new task for a specific board
router.put('/boards/:boardId/tasks/:taskId', taskController.updateTask); // Update a specific task
router.delete('/boards/:boardId/tasks/:taskId', taskController.deleteTask); // Delete a specific task

module.exports = router;
