import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth';
import { getTasks } from '../controllers/tasks';

const router = Router();

// get Tasks
// http://localhost:5000/api/tasks/:id
router.get('/', checkAuth, getTasks);

export default router;