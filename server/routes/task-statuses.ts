import { Router } from "express";
import {
  createTaskStatus,
  deleteTaskStatus,
  getTaskStatus,
  getTaskStatuses,
  updateTaskStatus,
} from "@/controllers/task-statuses";

const router = Router();

// Get Task Statuses
// http://localhost:5000/api/task-statuses
router.post("/api/task-statuses", getTaskStatuses);

// Get Task Status
// http://localhost:5000/api/task-statuses/:id
router.get("/api/task-statuses/:id", getTaskStatus);

// Create Task Status
// http://localhost:5000/api/task-statuses
router.post("/api/task-statuses", createTaskStatus);

// Update Task Status
// http://localhost:5000/api/task-statuses/:id
router.patch("/api/task-statuses/:id", updateTaskStatus);

// Delete Task Status
// http://localhost:5000/api/task-statuses/:id
router.get("/api/task-statuses:id", deleteTaskStatus);

export default router;
