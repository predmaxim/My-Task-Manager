import { Router } from 'express';
import { authCheck } from '../utils/authCheck';
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} from '../controllers/tasks';

const router = Router();

// get Tasks
// http://localhost:5000/api/tasks
router.get('/api/tasks/', getTasks);

// Get Task
// http://localhost:5000/api/tasks/:id
router.get('/api/tasks/:id', getTask);

// Create Task
// http://localhost:5000/api/tasks
router.post('/api/tasks/', createTask);

// Update Task
// http://localhost:5000/api/tasks/:id
router.patch('/api/tasks/:id', updateTask);

// Delete Task
// http://localhost:5000/api/tasks/:id
router.delete('/api/tasks/:id', deleteTask);

export default router;