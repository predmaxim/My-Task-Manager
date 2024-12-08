import { Router } from "express";
import { getMe, login, refresh, register } from "@/controllers/auth-controller";

const router = Router();

// Register
// http://localhost:5000/api/auth/register
router.post("/api/auth/register", register);

// Login
// http://localhost:5000/api/auth/login
router.post("/api/auth/login", login);

// Get Me
// http://localhost:5000/api/auth/me
router.get("/api/auth/me", getMe);

// Refresh token
// http://localhost:5000/api/auth/refresh
router.get("/api/auth/refresh", refresh);

export default router;
