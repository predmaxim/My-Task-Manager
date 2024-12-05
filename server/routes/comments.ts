import { Router } from 'express';
// import { authCheck } from '../utils/authCheck';
import { createComment } from '../controllers/comments';

const router = Router();

// Get Comments
// http://localhost:5000/api/comments
// router.get('/api/comments', authCheck, createComment);
router.get('/api/comments', createComment);

// Get Comment
// http://localhost:5000/api/comments/:id
router.get('/api/comments/:id', createComment);

// Create Comment
// http://localhost:5000/api/comments
router.post('/api/comments', createComment);

// Update Comment
// http://localhost:5000/api/comments/:id
router.patch('/api/comments/:id', createComment);

// Delete Comment
// http://localhost:5000/api/comments/:id
router.delete('/api/comments/:id', createComment);

export default router;