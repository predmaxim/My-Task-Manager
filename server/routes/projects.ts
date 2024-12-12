import { Router } from 'express';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projects';

const router = Router();

// Get Projects
// http://localhost:5000/api/projects
router.get('/api/projects/', getProjects);

// Get Project
// http://localhost:5000/api/projects/:name
router.get('/api/projects/:name', getProject);

// Create Project
// http://localhost:5000/api/projects
router.post('/api/projects/', createProject);

// Update Project
// http://localhost:5000/api/projects/:name
router.patch('/api/projects/:name', updateProject);

// Delete Project
// http://localhost:5000/api/projects/:name
router.delete('/api/projects/:name', deleteProject);

export default router;
