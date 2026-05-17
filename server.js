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

// GET tasks sorted by priority
app.get('/api/tasks/priority/sorted', (req, res) => {
  db.getTasksByPriority((err, tasks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tasks);
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority = 'medium', dueDate = null } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }
  
  db.createTask(title, description || '', priority, dueDate, (err, taskId) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      id: taskId, 
      title, 
      description: description || '', 
      priority,
      dueDate,
      completed: false 
    });
  });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const { title, description, completed, priority = 'medium', dueDate = null } = req.body;
  const taskId = parseInt(req.params.id);
  
  if (!taskId) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  
  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }
  
  db.updateTask(taskId, title, description, completed, priority, dueDate, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: taskId, title, description, completed, priority, dueDate });
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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task Manager app running on port ${PORT}`);
  });
}

module.exports = app;
