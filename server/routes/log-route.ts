import { Router } from "express";
import {
  createLog,
  deleteLog,
  getLog,
  getLogs,
} from "@/controllers/logs-controller";

const router = Router();

// Get log files list (by day)
// http://localhost:5000/api/logs
router.get("/api/logs", getLogs);

// Get log file content by date (YYYY-MM-DD)
// http://localhost:5000/api/logs/:date
router.get("/api/logs/:date", getLog);

// Create log entry (append to today's file)
// http://localhost:5000/api/logs
router.post("/api/logs/", createLog);

// Delete log file by date (YYYY-MM-DD)
// http://localhost:5000/api/logs/:date
router.delete("/api/logs/:date", deleteLog);

export default router;
