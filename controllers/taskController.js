const Task = require('../models/task.model');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const boardId = req.params.boardId; // Get boardId from the route parameters
  const newTask = new Task({
    ...req.body, // Use the data from the request body
    boardId // Attach the boardId to the new task
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Return the saved task with a 201 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
