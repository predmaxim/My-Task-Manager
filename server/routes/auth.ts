import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth';
// import { authCheck } from '../utils/authCheck';

const router = Router();

// Register
// http://localhost:5000/api/auth/register
router.post('/api/auth/register', register);

// Login
// http://localhost:5000/api/auth/login
router.post('/api/auth/login', login);

// Get Me
// http://localhost:5000/api/auth/me
router.get('/api/auth/me', getMe);

export default router;