import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth';
import { checkAuth } from '../utils/checkAuth';

const router = Router();

// Register
// http://localhost:5000/api/auth/register
router.post('/register', register);

// Login
// http://localhost:5000/api/auth/login
router.post('/login', login);

// Get Me
// http://localhost:5000/api/auth/me
router.get('/me', checkAuth, getMe);

export default router;