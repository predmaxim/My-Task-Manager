import {Router} from 'express';
import {createTask, deleteTask, getTask, getTasks, updateTask} from '@/controllers/tasks';

const router = Router();
// Get Tasks
// http://localhost:5000/api/tasks
router.get('/api/tasks/:projectId', getTasks);

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
