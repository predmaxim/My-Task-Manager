import { Router } from "express";
import {
  createTaskStatus,
  deleteTaskStatus,
  getTaskStatus,
  getTaskStatuses,
  updateTaskStatus,
  updateTaskStatuses,
} from "@/controllers/task-statuses-controller";

const router = Router();

// Get Task Statuses
// http://localhost:5000/api/task-statuses/:projectId
router.get("/api/task-statuses/:projectId", getTaskStatuses);

// Get Task Status
// http://localhost:5000/api/task-statuses/:id
router.get("/api/task-statuses/:id", getTaskStatus);

// Create Task Status
// http://localhost:5000/api/task-statuses
router.post("/api/task-statuses", createTaskStatus);

// Update Task Status
// http://localhost:5000/api/task-statuses/:id
router.patch("/api/task-statuses/:id", updateTaskStatus);

// Update Task Statuses
// http://localhost:5000/api/task-statuses/
router.put("/api/task-statuses/", updateTaskStatuses);

// Delete Task Status
// http://localhost:5000/api/task-statuses/:id
router.get("/api/task-statuses/:id", deleteTaskStatus);

export default router;
