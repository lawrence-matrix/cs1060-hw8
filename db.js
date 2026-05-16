const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with schema
function init() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
}

// Get all tasks
function getAllTasks(callback) {
  db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
    callback(err, rows || []);
  });
}

// Get tasks by status
function getTasksByStatus(status, callback) {
  let query = 'SELECT * FROM tasks ORDER BY created_at DESC';
  
  if (status === 'completed') {
    query = 'SELECT * FROM tasks WHERE completed = 1 ORDER BY created_at DESC';
  } else if (status === 'incomplete') {
    query = 'SELECT * FROM tasks WHERE completed = 0 ORDER BY created_at DESC';
  }
  
  db.all(query, (err, rows) => {
    callback(err, rows || []);
  });
}

// Create new task
function createTask(title, description, callback) {
  const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
  stmt.run(title, description, function(err) {
    if (err) {
      callback(err);
    } else {
      callback(null, this.lastID);
    }
  });
  stmt.finalize();
}

// Update task
function updateTask(id, title, description, completed, callback) {
  const stmt = db.prepare('UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  stmt.run(title || '', description || '', completed ? 1 : 0, id, function(err) {
    callback(err);
  });
  stmt.finalize();
}

// Delete task
function deleteTask(id, callback) {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(id, function(err) {
    callback(err);
  });
  stmt.finalize();
}

module.exports = {
  init,
  getAllTasks,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
  db
};
