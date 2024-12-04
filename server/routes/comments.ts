import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth';
import { createComment } from '../controllers/comments';

const router = Router();

// Create Comment
// http://localhost:5000/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;