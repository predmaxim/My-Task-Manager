import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth';
import { getProjects } from '../controllers/projects';

const router = Router();

// Create Projects
// http://localhost:5000/api/projects/:id
router.get('/', checkAuth, getProjects);

export default router;