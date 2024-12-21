import {Router} from 'express';
import {createComment, getComments} from '@/controllers/comments';

const router = Router();

// Get Comments
// http://localhost:5000/api/comments
router.get('/api/comments', getComments);

// Get Comment
// http://localhost:5000/api/comments/:id
// router.get('/api/comments/:id', getComment);

// Create Comment
// http://localhost:5000/api/comments
router.post('/api/comments', createComment);

// Update Comment
// http://localhost:5000/api/comments/:id
// router.patch('/api/comments/:id', updateComment);

// Delete Comment
// http://localhost:5000/api/comments/:id
// router.delete('/api/comments/:id', deleteComment);

export default router;
