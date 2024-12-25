import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "@/controllers/comments-controller";

const router = Router();

// Get Comments
// http://localhost:5000/api/comments/:taskId
router.get("/api/comments/:taskId", getComments);

// Get Comment
// http://localhost:5000/api/comments/:id
router.get("/api/comments/:id", getComment);

// Create Comment
// http://localhost:5000/api/comments/
router.post("/api/comments/", createComment);

// Update Comment
// http://localhost:5000/api/comments/:id
router.patch("/api/comments/:id", updateComment);

// Delete Comment
// http://localhost:5000/api/comments/:id
router.delete("/api/comments/:id", deleteComment);

export default router;
