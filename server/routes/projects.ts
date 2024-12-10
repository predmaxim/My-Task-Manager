import { Router } from 'express';
import { authCheck } from '../utils/authCheck';
import {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  updateProject
} from '../controllers/projects';

const router = Router();

// Get Projects
// http://localhost:5000/api/projects
router.get('/api/projects/', getProjects);

// Get Project
// http://localhost:5000/api/projects/:id
router.get('/api/projects/:name', getProject);

// Create Project
// http://localhost:5000/api/projects
router.post('/api/projects/', createProject);

// Update Project
// http://localhost:5000/api/projects/:id
router.patch('/api/projects/:name', updateProject);

// Delete Project
// http://localhost:5000/api/projects/:id
router.delete('/api/projects/:name', deleteProject);

export default router;