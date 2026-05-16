const request = require('supertest');
const app = require('./server');
const db = require('./db');

// Setup and teardown
beforeAll(() => {
  db.init();
});

afterEach((done) => {
  // Clear tasks table between tests
  db.db.run('DELETE FROM tasks', done);
});

describe('Task Manager API', () => {
  
  describe('GET /api/health', () => {
    it('should return ok status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'This is a test'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Test Task');
      expect(res.body.description).toBe('This is a test');
      expect(res.body.completed).toBe(false);
    });

    it('should return 400 for empty title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: '',
          description: 'No title'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeTruthy();
    });

    it('should create task with no description', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task without description'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.description).toBe('');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('should return all created tasks', async () => {
      // Create tasks
      await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 1' });
      
      await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 2' });
      
      const res = await request(app).get('/api/tasks');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/tasks/status/:status', () => {
    beforeEach(async () => {
      // Create test tasks
      await request(app).post('/api/tasks').send({ title: 'Active Task' });
      await request(app).post('/api/tasks').send({ title: 'Active Task 2' });
      
      // Get all tasks and mark one as complete
      const tasksRes = await request(app).get('/api/tasks');
      const task = tasksRes.body[0];
      
      await request(app)
        .put(`/api/tasks/${task.id}`)
        .send({
          title: task.title,
          description: task.description,
          completed: true
        });
    });

    it('should filter incomplete tasks', async () => {
      const res = await request(app).get('/api/tasks/status/incomplete');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].completed).toBe(false);
    });

    it('should filter completed tasks', async () => {
      const res = await request(app).get('/api/tasks/status/completed');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].completed).toBe(1);
    });

    it('should return all tasks for "all" status', async () => {
      const res = await request(app).get('/api/tasks/status/all');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('should return 400 for invalid status', async () => {
      const res = await request(app).get('/api/tasks/status/invalid');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task properties', async () => {
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Original', description: 'Original desc' });
      
      const taskId = createRes.body.id;
      
      const updateRes = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({
          title: 'Updated',
          description: 'Updated desc',
          completed: true
        });
      
      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.title).toBe('Updated');
      expect(updateRes.body.completed).toBe(true);
    });

    it('should return 400 for invalid task ID', async () => {
      const res = await request(app)
        .put('/api/tasks/invalid')
        .send({ title: 'Update' });
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to delete' });
      
      const taskId = createRes.body.id;
      
      const deleteRes = await request(app).delete(`/api/tasks/${taskId}`);
      expect(deleteRes.statusCode).toBe(204);
      
      const getRes = await request(app).get('/api/tasks');
      expect(getRes.body.length).toBe(0);
    });

    it('should return 400 for invalid task ID', async () => {
      const res = await request(app).delete('/api/tasks/invalid');
      expect(res.statusCode).toBe(400);
    });
  });
});
