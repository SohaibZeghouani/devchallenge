const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const boardRoutes = require('./routes/boards');
const taskRoutes = require('./routes/tasks');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/task-manager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/boards', boardRoutes); // Use board routes
app.use('/api', taskRoutes); // Use task routes

// Listen on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
