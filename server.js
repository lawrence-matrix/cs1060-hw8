const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
db.init();

// Routes

// GET all tasks
app.get('/api/tasks', (req, res) => {
  db.getAllTasks((err, tasks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tasks);
  });
});

// GET tasks by status
app.get('/api/tasks/status/:status', (req, res) => {
  const status = req.params.status;
  if (!['all', 'completed', 'incomplete'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  db.getTasksByStatus(status, (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tasks);
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  db.createTask(title, description || '', (err, taskId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: taskId, title, description: description || '', completed: false });
  });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const taskId = parseInt(req.params.id);
  
  if (!taskId) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  db.updateTask(taskId, title, description, completed, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: taskId, title, description, completed });
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  
  if (!taskId) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  db.deleteTask(taskId, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task Manager app running on port ${PORT}`);
});

module.exports = app;
