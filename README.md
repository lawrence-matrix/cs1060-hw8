# Task Manager - CS 1060 HW8

A full-stack task management application built with Node.js, Express, SQLite, and Vanilla JavaScript.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status (All, Active, Completed)
- ✅ Task priorities (Low, Medium, High)
- ✅ Optional task descriptions
- ✅ Due date support
- ✅ Responsive UI design
- ✅ RESTful API endpoints
- ✅ Comprehensive test suite

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Testing:** Jest, Supertest

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/status/:status` - Get tasks by status (all, completed, incomplete)
- `GET /api/tasks/priority/sorted` - Get tasks sorted by priority
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2026-05-20"
}
```

**Update Task:**
```json
PUT /api/tasks/1
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese",
  "completed": false,
  "priority": "medium",
  "dueDate": "2026-05-20"
}
```

## Project Structure

```
├── server.js          # Express server and API routes
├── db.js             # SQLite database functions
├── package.json      # Dependencies and scripts
├── test.js           # Jest test suite
├── public/
│   ├── index.html    # Main HTML template
│   ├── app.js        # Frontend logic
│   └── style.css     # Styling
├── PROJECT_INDEX.md  # Project planning and retrospectives
└── README.md         # This file
```

## Testing

The application includes comprehensive tests covering:

- API endpoint functionality
- Input validation
- Error handling
- Task CRUD operations
- Status filtering

Run tests with coverage:
```bash
npm test
```

## Development Notes

### Database Schema

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
  due_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## HW8 Implementation Details

**Feature:** Task Management System with Priority Support  
**Branch:** lawrence-matrix-hw8  
**Estimated Hours:** 5 hours  
**Linear Tickets:** TASK-1 through TASK-4 (HW8 label)

### What's Included

1. ✅ Full backend API with Express.js
2. ✅ SQLite database with task schema including priorities
3. ✅ Frontend UI with filtering capabilities
4. ✅ Responsive design with gradient styling
5. ✅ Comprehensive Jest/Supertest suite
6. ✅ Error handling and validation
7. ✅ Documentation and comments

### Known Limitations

- Single-user application (no authentication)
- Tasks stored locally in SQLite (not synced across sessions)
- Basic error handling (could be enhanced)

## Future Improvements

- User authentication
- Cloud sync
- Due date reminders
- Task categories/tags
- Subtasks
- Recurring tasks
- Export/import functionality

## Author

lawrence-matrix (Individual submission for CS 1060 HW8)

https://faleproxy.vercel.app/

## License

MIT
