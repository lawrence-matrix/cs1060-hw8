// App state
let currentFilter = 'all';
let tasks = [];

// DOM Elements
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const taskDueDate = document.getElementById('taskDueDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskTitle.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addTask();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// API Functions
async function fetchTasks() {
  try {
    const endpoint = currentFilter === 'all' 
      ? '/api/tasks'
      : `/api/tasks/status/${currentFilter}`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    taskList.innerHTML = '<p class="empty-state"><p>Error loading tasks</p></p>';
  }
}

async function addTask() {
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDueDate.value;

  if (!title) {
    alert('Please enter a task title');
    return;
  }

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, dueDate })
    });

    if (!response.ok) throw new Error('Failed to add task');

    taskTitle.value = '';
    taskDescription.value = '';
    taskPriority.value = 'medium';
    taskDueDate.value = '';
    taskTitle.focus();
    
    fetchTasks();
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Failed to add task');
  }
}

async function toggleTask(id, completed) {
  try {
    const task = tasks.find(t => t.id === id);
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.due_date,
        completed: !completed
      })
    });

    if (!response.ok) throw new Error('Failed to update task');
    
    fetchTasks();
  } catch (error) {
    console.error('Error updating task:', error);
    alert('Failed to update task');
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete task');
    
    fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Failed to delete task');
  }
}

// Render Functions
function renderTasks() {
  if (tasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state"><p>No tasks yet. Add one to get started! ✨</p></div>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-priority="${task.priority || 'medium'}">
      <input 
        type="checkbox" 
        class="task-checkbox"
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id}, ${task.completed})"
        aria-label="Mark task complete"
      >
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta-info">
          <span class="priority-badge ${task.priority || 'medium'}">${(task.priority || 'medium').toUpperCase()}</span>
          ${task.due_date ? `<span class="due-date">📅 ${formatDate(task.due_date)}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete task">
          Delete
        </button>
      </div>
    </div>
  `).join('');
}

// Utility Functions
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
  // Refresh tasks every 5 seconds for demo
  setInterval(fetchTasks, 5000);
});
